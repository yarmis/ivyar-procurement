"use client";

import { useState } from "react";
import {
  Search,
  Package,
  Users,
  Send,
  TrendingUp,
  FileSpreadsheet,
  BarChart3,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Menu,
  Bell,
  Mail,
  Star,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Layers,
  Shield,
  Truck,
  X,
} from "lucide-react";

// ============================================
// SAMPLE DATA
// ============================================
const SAMPLE_PARTS = [
  {
    id: "1",
    nsn: "2530-01-574-3580",
    partNumber: "12460178",
    cageCode: "19207",
    description: "Brake Shoe Set, Rear Axle",
    platforms: ["FMTV"],
    fsc: "2530",
    category: "Brakes",
    prices: [
      { vendor: "Memphis Equipment", vendorId: "memphis", price: 245, availability: "IN_STOCK", leadTime: 3, score: 4.8, flag: "🇺🇸" },
      { vendor: "Midwest Military", vendorId: "midwest", price: 268, availability: "IN_STOCK", leadTime: 5, score: 4.5, flag: "🇺🇸" },
      { vendor: "Oshkosh Defense", vendorId: "oshkosh", price: 255, availability: "LIMITED", leadTime: 7, score: 4.9, flag: "🇺🇸" },
    ],
  },
  {
    id: "2",
    nsn: "2610-01-562-6518",
    partNumber: "47750-84",
    cageCode: "81349",
    description: "Tire, Pneumatic 395/85R20 XZL",
    platforms: ["FMTV", "HEMTT"],
    fsc: "2610",
    category: "Tires",
    prices: [
      { vendor: "Oshkosh Defense", vendorId: "oshkosh", price: 580, availability: "IN_STOCK", leadTime: 7, score: 4.9, flag: "🇺🇸" },
      { vendor: "Memphis Equipment", vendorId: "memphis", price: 595, availability: "LIMITED", leadTime: 10, score: 4.8, flag: "🇺🇸" },
    ],
  },
  {
    id: "3",
    nsn: "2920-01-507-5765",
    partNumber: "10939039",
    cageCode: "19207",
    description: "Starter Motor, Engine 24V Heavy Duty",
    platforms: ["HMMWV"],
    fsc: "2920",
    category: "Electrical",
    prices: [
      { vendor: "AM General", vendorId: "amgeneral", price: 890, availability: "IN_STOCK", leadTime: 5, score: 4.7, flag: "🇺🇸" },
      { vendor: "Midwest Military", vendorId: "midwest", price: 925, availability: "LEAD_TIME", leadTime: 21, score: 4.5, flag: "🇺🇸" },
    ],
  },
  {
    id: "4",
    nsn: "2940-01-585-0894",
    partNumber: "12557067",
    cageCode: "19207",
    description: "Oil Filter Element, Full Flow",
    platforms: ["FMTV", "MRAP"],
    fsc: "2940",
    category: "Filters",
    prices: [
      { vendor: "GovPlanet", vendorId: "govplanet", price: 38, availability: "IN_STOCK", leadTime: 7, score: 4.2, flag: "🇺🇸" },
      { vendor: "Memphis Equipment", vendorId: "memphis", price: 45, availability: "IN_STOCK", leadTime: 2, score: 4.8, flag: "🇺🇸" },
    ],
  },
  {
    id: "5",
    nsn: "2930-01-518-9454",
    partNumber: "4952631",
    cageCode: "99193",
    description: "Radiator Assembly, Engine Cooling System",
    platforms: ["FMTV"],
    fsc: "2930",
    category: "Cooling",
    prices: [
      { vendor: "Oshkosh Defense", vendorId: "oshkosh", price: 1250, availability: "LEAD_TIME", leadTime: 14, score: 4.9, flag: "🇺🇸" },
      { vendor: "AM General", vendorId: "amgeneral", price: 1180, availability: "LIMITED", leadTime: 10, score: 4.7, flag: "🇺🇸" },
    ],
  },
];

const VENDORS = [
  { id: "memphis", name: "Memphis Equipment", cage: "1MEC1", score: 4.8, orders: 47, flag: "🇺🇸", verified: true },
  { id: "oshkosh", name: "Oshkosh Defense", cage: "19207", score: 4.9, orders: 32, flag: "🇺🇸", verified: true },
  { id: "midwest", name: "Midwest Military", cage: "3MMS1", score: 4.5, orders: 28, flag: "🇺🇸", verified: true },
  { id: "amgeneral", name: "AM General", cage: "99193", score: 4.7, orders: 21, flag: "🇺🇸", verified: true },
  { id: "govplanet", name: "GovPlanet", cage: "5GPT1", score: 4.2, orders: 15, flag: "🇺🇸", verified: false },
];

const PLATFORMS = ["All", "FMTV", "HMMWV", "MRAP", "HEMTT", "M939", "Stryker"];

// ============================================
// MAIN COMPONENT
// ============================================
export default function Home() {
  const [activeTab, setActiveTab] = useState("search");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SAMPLE_PARTS>(SAMPLE_PARTS);
  const [cart, setCart] = useState<{ part: typeof SAMPLE_PARTS[0]; qty: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPart, setSelectedPart] = useState<typeof SAMPLE_PARTS[0] | null>(null);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 800));
    const q = searchQuery.toLowerCase();
    let results = SAMPLE_PARTS.filter(
      (p) =>
        p.nsn.includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    if (selectedPlatform !== "All") {
      results = results.filter((p) => p.platforms.includes(selectedPlatform));
    }
    setSearchResults(results.length > 0 ? results : SAMPLE_PARTS);
    setIsSearching(false);
  };

  const addToCart = (part: typeof SAMPLE_PARTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.part.id === part.id);
      if (existing) {
        return prev.map((i) => (i.part.id === part.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { part, qty: 1 }];
    });
  };

  const removeFromCart = (partId: string) => {
    setCart((prev) => prev.filter((i) => i.part.id !== partId));
  };

  const updateQty = (partId: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => (i.part.id === partId ? { ...i, qty } : i)));
  };

  const cartTotal = cart.reduce((sum, i) => {
    const lowestPrice = Math.min(...i.part.prices.map((p) => p.price));
    return sum + lowestPrice * i.qty;
  }, 0);

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "IN_STOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            In Stock
          </span>
        );
      case "LIMITED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertCircle className="w-3 h-3" />
            Limited
          </span>
        );
      case "LEAD_TIME":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            Lead Time
          </span>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "search", label: "Search Parts", icon: Search },
    { id: "rfq", label: "RFQ Cart", icon: ShoppingCart, badge: cart.length },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  const lowestPrice = (part: typeof SAMPLE_PARTS[0]) => Math.min(...part.prices.map((p) => p.price));

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
      
      {/* Ukrainian flag bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-yellow-400" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/25">
                  IV
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a12]"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg leading-none">IVYAR</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Procurement Platform</p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by NSN, Part Number, or description..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-32 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500"
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-xl transition-all ${showFilters ? 'bg-blue-500 text-white' : 'hover:bg-white/10 text-slate-400'}`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-1">
            <button className="relative p-2.5 hover:bg-white/5 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a12]" />
            </button>
            <button onClick={() => setActiveTab("rfq")} className="relative p-2.5 hover:bg-white/5 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-slate-400" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-[#0a0a12]">
                  {cart.length}
                </span>
              )}
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-xl transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/25">
                IY
              </div>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">
            <div className="max-w-[1600px] mx-auto flex items-center gap-4">
              <span className="text-sm text-slate-400">Platform:</span>
              <div className="flex gap-2">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatform === platform
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-[57px] left-0 z-50 w-64 h-[calc(100vh-57px)] bg-[#0a0a12]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-r border-white/5 transform transition-transform lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="p-4 h-full flex flex-col">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-blue-400" : ""}`} />
                  {item.label}
                  {item.badge ? (
                    <span className="ml-auto px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">Pro Tip</span>
                </div>
                <p className="text-xs text-slate-400">Use NSN format 2530-01-574-3580 for precise search results</p>
              </div>
              <div className="text-center text-xs text-slate-600 mt-4">
                <p>IVYAR LLC © 2025</p>
                <p className="flex items-center justify-center gap-1 mt-1">
                  🇺🇸 Seattle, WA
                </p>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {/* SEARCH PAGE */}
          {activeTab === "search" && (
            <div className="p-4 lg:p-6 max-w-[1400px] mx-auto">
              {/* Page header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Search Parts</h2>
                  <p className="text-slate-400 text-sm">Find military vehicle parts from verified US suppliers</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>{searchResults.length} parts found</span>
                </div>
              </div>

              {/* Mobile search */}
              <div className="md:hidden mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3"
                  />
                </div>
                <button onClick={handleSearch} className="w-full mt-2 py-3 bg-blue-600 rounded-xl font-medium">
                  Search
                </button>
              </div>

              {/* Results */}
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-slate-400">Searching parts database...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((part) => (
                    <div
                      key={part.id}
                      className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300"
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative p-5">
                        <div className="flex flex-col xl:flex-row xl:items-start gap-5">
                          {/* Part info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-md text-xs font-medium">
                                    {part.category}
                                  </span>
                                  {part.prices[0]?.availability === "IN_STOCK" && (
                                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-medium flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Available
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                  {part.description}
                                </h3>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-500">Best price</p>
                                <p className="text-2xl font-bold text-emerald-400">${lowestPrice(part)}</p>
                              </div>
                            </div>

                            {/* Part details grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              <div className="bg-black/20 rounded-xl p-3">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">NSN</p>
                                <p className="font-mono text-sm text-blue-400">{part.nsn}</p>
                              </div>
                              <div className="bg-black/20 rounded-xl p-3">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Part Number</p>
                                <p className="font-mono text-sm text-white">{part.partNumber}</p>
                              </div>
                              <div className="bg-black/20 rounded-xl p-3">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">CAGE</p>
                                <p className="font-mono text-sm text-white">{part.cageCode}</p>
                              </div>
                              <div className="bg-black/20 rounded-xl p-3">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">FSC</p>
                                <p className="font-mono text-sm text-white">{part.fsc}</p>
                              </div>
                            </div>

                            {/* Platforms */}
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-slate-500" />
                              <div className="flex gap-1">
                                {part.platforms.map((p) => (
                                  <span key={p} className="px-2 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Vendors pricing */}
                          <div className="xl:w-[420px] bg-black/30 rounded-xl overflow-hidden border border-white/5">
                            <div className="px-4 py-2.5 bg-white/5 border-b border-white/5">
                              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Users className="w-3.5 h-3.5" />
                                Vendor Pricing ({part.prices.length} suppliers)
                              </p>
                            </div>
                            <div className="divide-y divide-white/5">
                              {part.prices.map((price, idx) => {
                                const vendor = VENDORS.find((v) => v.id === price.vendorId);
                                const isLowest = price.price === lowestPrice(part);
                                return (
                                  <div
                                    key={idx}
                                    className={`flex items-center justify-between p-3 ${isLowest ? "bg-emerald-500/5" : "hover:bg-white/5"} transition-colors`}
                                  >
                                    <div className="flex items-center gap-3">
                                      {isLowest && (
                                        <span className="px-1.5 py-0.5 bg-emerald-500 text-black text-[10px] font-bold rounded">
                                          BEST
                                        </span>
                                      )}
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-sm font-medium text-white">{price.vendor}</span>
                                          {vendor?.verified && <Shield className="w-3.5 h-3.5 text-blue-400" />}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                          <span className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            {price.score}
                                          </span>
                                          <span>•</span>
                                          <span>{price.leadTime}d delivery</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className={`text-lg font-bold ${isLowest ? "text-emerald-400" : "text-white"}`}>
                                        ${price.price}
                                      </p>
                                      {getAvailabilityBadge(price.availability)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex xl:flex-col gap-2 xl:w-32">
                            <button
                              onClick={() => addToCart(part)}
                              className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                            >
                              <Plus className="w-4 h-4" />
                              Add to RFQ
                            </button>
                            <button
                              onClick={() => setSelectedPart(part)}
                              className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all"
                            >
                              Details
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-slate-400">Welcome back, Igor</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Parts", value: "1,234", change: "+12%", icon: Package, color: "blue" },
                  { label: "Vendors", value: "48", change: "+3", icon: Users, color: "emerald" },
                  { label: "Active RFQs", value: "12", change: "+5", icon: Send, color: "purple" },
                  { label: "This Month", value: "$127K", change: "+23%", icon: TrendingUp, color: "amber" },
                ].map((stat) => (
                  <div key={stat.label} className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 p-5">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                    <div className="relative">
                      <div className={`w-10 h-10 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center mb-3`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                      </div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <div className="flex items-end gap-2 mt-1">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className="text-xs text-emerald-400 pb-1">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Search Parts", icon: Search, action: () => setActiveTab("search") },
                  { label: "View Cart", icon: ShoppingCart, action: () => setActiveTab("rfq") },
                  { label: "Vendors", icon: Users, action: () => setActiveTab("vendors") },
                  { label: "Import Excel", icon: FileSpreadsheet, action: () => alert("Coming soon!") },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={action.action}
                    className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.04] border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RFQ CART */}
          {activeTab === "rfq" && (
            <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">RFQ Cart</h2>
                <p className="text-slate-400">Review items and create Request for Quote</p>
              </div>

              {cart.length === 0 ? (
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 p-12 text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cart is empty</h3>
                  <p className="text-slate-400 mb-6">Add parts from Search to create an RFQ</p>
                  <button
                    onClick={() => setActiveTab("search")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-medium"
                  >
                    Go to Search
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden">
                    {cart.map((item, idx) => (
                      <div key={item.part.id} className={`p-4 flex items-center gap-4 ${idx !== cart.length - 1 ? "border-b border-white/5" : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.part.description}</p>
                          <p className="text-sm text-blue-400 font-mono">{item.part.nsn}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.part.id, item.qty - 1)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center">
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateQty(item.part.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center bg-black/30 border border-white/10 rounded-lg py-1"
                          />
                          <button onClick={() => updateQty(item.part.id, item.qty + 1)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-24 text-right">
                          <p className="font-bold text-emerald-400">${lowestPrice(item.part) * item.qty}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.part.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Estimated Total</p>
                      <p className="text-3xl font-bold">${cartTotal.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => { alert("RFQ created!"); setCart([]); }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25"
                    >
                      <Send className="w-4 h-4" /> Create RFQ
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* VENDORS */}
          {activeTab === "vendors" && (
            <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Vendors</h2>
                <p className="text-slate-400">Your verified supplier network</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VENDORS.map((vendor) => (
                  <div key={vendor.id} className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/10 p-5 hover:border-blue-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/25">
                        {vendor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{vendor.name}</h3>
                          {vendor.verified && <Shield className="w-4 h-4 text-blue-400" />}
                        </div>
                        <p className="text-sm text-slate-400">{vendor.flag} CAGE: {vendor.cage}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-yellow-400" /> {vendor.score}
                          </span>
                          <span className="text-slate-400">{vendor.orders} orders</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
                        <Mail className="w-4 h-4 inline mr-2" />Contact
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-sm font-medium">
                        <Send className="w-4 h-4 inline mr-2" />RFQ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="p-4 lg:p-6 max-w-[1400px] mx-auto">
              <div className="text-center py-20">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-slate-400">Track your procurement performance and trends</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Part Detail Modal */}
      {selectedPart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPart(null)}>
          <div className="bg-[#12121a] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold">{selectedPart.description}</h3>
              <button onClick={() => setSelectedPart(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">NSN</p>
                  <p className="font-mono text-lg text-blue-400">{selectedPart.nsn}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">Part Number</p>
                  <p className="font-mono text-lg">{selectedPart.partNumber}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">CAGE Code</p>
                  <p className="font-mono text-lg">{selectedPart.cageCode}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">FSC</p>
                  <p className="font-mono text-lg">{selectedPart.fsc}</p>
                </div>
              </div>
              <button
                onClick={() => { addToCart(selectedPart); setSelectedPart(null); }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to RFQ Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}v
