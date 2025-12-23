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
  X,
  Bell,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Clock,
  Star,
  Filter,
  Zap,
  Upload,
  Download,
  Mail,
  Eye,
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
    prices: [
      { vendor: "Memphis Equipment", price: 245, availability: "IN_STOCK", leadTime: 3, score: 4.8 },
      { vendor: "Midwest Military", price: 268, availability: "IN_STOCK", leadTime: 5, score: 4.5 },
    ],
  },
  {
    id: "2",
    nsn: "2610-01-562-6518",
    partNumber: "47750-84",
    cageCode: "81349",
    description: "Tire, Pneumatic 395/85R20",
    platforms: ["FMTV", "HEMTT"],
    prices: [
      { vendor: "Oshkosh Defense", price: 580, availability: "IN_STOCK", leadTime: 7, score: 4.9 },
      { vendor: "Memphis Equipment", price: 595, availability: "LIMITED", leadTime: 10, score: 4.8 },
    ],
  },
  {
    id: "3",
    nsn: "2920-01-507-5765",
    partNumber: "10939039",
    cageCode: "19207",
    description: "Starter Motor, Engine 24V",
    platforms: ["HMMWV"],
    prices: [
      { vendor: "AM General", price: 890, availability: "IN_STOCK", leadTime: 5, score: 4.7 },
      { vendor: "Midwest Military", price: 925, availability: "LEAD_TIME", leadTime: 21, score: 4.5 },
    ],
  },
  {
    id: "4",
    nsn: "2940-01-585-0894",
    partNumber: "12557067",
    cageCode: "19207",
    description: "Oil Filter Element",
    platforms: ["FMTV", "MRAP"],
    prices: [
      { vendor: "Memphis Equipment", price: 45, availability: "IN_STOCK", leadTime: 2, score: 4.8 },
      { vendor: "GovPlanet", price: 38, availability: "IN_STOCK", leadTime: 7, score: 4.2 },
    ],
  },
  {
    id: "5",
    nsn: "2930-01-518-9454",
    partNumber: "4952631",
    cageCode: "99193",
    description: "Radiator Assembly",
    platforms: ["FMTV"],
    prices: [
      { vendor: "Oshkosh Defense", price: 1250, availability: "LEAD_TIME", leadTime: 14, score: 4.9 },
    ],
  },
];

const VENDORS = [
  { id: "1", name: "Memphis Equipment", cage: "1MEC1", score: 4.8, orders: 47, flag: "🇺🇸" },
  { id: "2", name: "Oshkosh Defense", cage: "19207", score: 4.9, orders: 32, flag: "🇺🇸" },
  { id: "3", name: "Midwest Military", cage: "3MMS1", score: 4.5, orders: 28, flag: "🇺🇸" },
  { id: "4", name: "AM General", cage: "99193", score: 4.7, orders: 21, flag: "🇺🇸" },
  { id: "5", name: "GovPlanet", cage: "5GPT1", score: 4.2, orders: 15, flag: "🇺🇸" },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SAMPLE_PARTS>([]);
  const [cart, setCart] = useState<{ part: typeof SAMPLE_PARTS[0]; qty: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search handler
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1000));
    const q = searchQuery.toLowerCase();
    const results = SAMPLE_PARTS.filter(
      (p) =>
        p.nsn.includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setSearchResults(results.length > 0 ? results : SAMPLE_PARTS);
    setIsSearching(false);
    setActiveTab("search");
  };

  // Cart handlers
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

  const cartTotal = cart.reduce((sum, i) => sum + (i.part.prices[0]?.price || 0) * i.qty, 0);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "search", label: "Search Parts", icon: Search },
    { id: "rfq", label: "RFQ Cart", icon: ShoppingCart, badge: cart.length },
    { id: "vendors", label: "Vendors", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ukrainian flag bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-500 to-yellow-400 from-50% to-50%" />

      {/* Header */}
      <header className="bg-[#12121a] border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold">
                IV
              </div>
              <div>
                <h1 className="font-bold text-lg">IVYAR</h1>
                <p className="text-xs text-slate-400">Procurement Platform</p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search NSN, Part Number..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
            >
              Search
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setActiveTab("rfq")}
              className="relative p-2 hover:bg-slate-800 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5 text-slate-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold ml-2">
              IY
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#12121a] border-r border-slate-800 transform transition-transform lg:transform-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 lg:pt-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.badge ? (
                    <span className="ml-auto px-2 py-0.5 bg-blue-500 rounded-full text-xs">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
            <div className="text-center text-xs text-slate-500">
              <p>IVYAR LLC © 2025</p>
              <p className="flex items-center justify-center gap-1 mt-1">
                <span>🇺🇸</span> Seattle, WA
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 min-h-screen">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-slate-400">Welcome back, Igor</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Parts", value: "1,234", icon: Package, color: "blue" },
                  { label: "Vendors", value: "48", icon: Users, color: "green" },
                  { label: "Active RFQs", value: "12", icon: Send, color: "purple" },
                  { label: "This Month", value: "$127K", icon: TrendingUp, color: "orange" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#1e293b] rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-500/20`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
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
                    className="bg-[#1e293b] hover:bg-slate-700 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors"
                  >
                    <action.icon className="w-6 h-6 text-blue-400" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Recent parts */}
              <div className="bg-[#1e293b] rounded-xl p-4">
                <h3 className="font-semibold mb-4">Recent Parts</h3>
                <div className="space-y-2">
                  {SAMPLE_PARTS.slice(0, 3).map((part) => (
                    <div key={part.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                      <div>
                        <p className="font-medium">{part.description}</p>
                        <p className="text-sm text-blue-400 font-mono">{part.nsn}</p>
                      </div>
                      <button
                        onClick={() => addToCart(part)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEARCH */}
          {activeTab === "search" && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Search Parts</h2>
                <p className="text-slate-400">Find parts by NSN, Part Number, or description</p>
              </div>

              {/* Mobile search */}
              <div className="md:hidden flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
                />
                <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 rounded-lg">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              {isSearching ? (
                <div className="flex flex-col items-center py-12">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-slate-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((part) => (
                    <div key={part.id} className="bg-[#1e293b] rounded-xl p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{part.description}</h3>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm">
                            <span className="text-blue-400 font-mono">{part.nsn}</span>
                            <span className="text-slate-500">P/N: {part.partNumber}</span>
                            <span className="text-slate-500">CAGE: {part.cageCode}</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {part.platforms.map((p) => (
                              <span key={p} className="px-2 py-0.5 bg-slate-700 rounded text-xs">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Prices */}
                        <div className="lg:w-72 bg-slate-900 rounded-lg overflow-hidden">
                          {part.prices.slice(0, 2).map((price, idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between p-3 ${idx === 0 ? "bg-green-500/10" : ""} ${
                                idx !== part.prices.length - 1 ? "border-b border-slate-800" : ""
                              }`}
                            >
                              <div>
                                <p className="text-sm font-medium">{price.vendor}</p>
                                <p className="text-xs text-slate-400">★ {price.score} • {price.leadTime}d</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-400">${price.price}</p>
                                <span
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    price.availability === "IN_STOCK"
                                      ? "bg-green-500/20 text-green-400"
                                      : price.availability === "LIMITED"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-blue-500/20 text-blue-400"
                                  }`}
                                >
                                  {price.availability.replace("_", " ")}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => addToCart(part)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Add to RFQ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Search for parts</h3>
                  <p className="text-slate-400">Enter NSN, Part Number, or description</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Brake", "Tire", "Filter", "Starter"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          handleSearch();
                        }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-sm"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RFQ CART */}
          {activeTab === "rfq" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">RFQ Cart</h2>
                <p className="text-slate-400">Review items and create Request for Quote</p>
              </div>

              {cart.length === 0 ? (
                <div className="bg-[#1e293b] rounded-xl p-12 text-center">
                  <ShoppingCart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Cart is empty</h3>
                  <p className="text-slate-400 mb-4">Add parts from Search to create an RFQ</p>
                  <button
                    onClick={() => setActiveTab("search")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Go to Search
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-[#1e293b] rounded-xl divide-y divide-slate-700">
                    {cart.map((item) => (
                      <div key={item.part.id} className="p-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.part.description}</p>
                          <p className="text-sm text-blue-400 font-mono">{item.part.nsn}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.part.id, item.qty - 1)}
                            className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateQty(item.part.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center bg-slate-900 border border-slate-700 rounded py-1"
                          />
                          <button
                            onClick={() => updateQty(item.part.id, item.qty + 1)}
                            className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="w-24 text-right">
                          <p className="font-bold text-green-400">
                            ${(item.part.prices[0]?.price || 0) * item.qty}
                          </p>
                          <p className="text-xs text-slate-500">${item.part.prices[0]?.price}/ea</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.part.id)}
                          className="p-2 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#1e293b] rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Estimated Total</p>
                      <p className="text-2xl font-bold">${cartTotal.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        alert("RFQ created successfully!");
                        setCart([]);
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2"
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
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Vendors</h2>
                <p className="text-slate-400">Your supplier network</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VENDORS.map((vendor) => (
                  <div key={vendor.id} className="bg-[#1e293b] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-lg font-bold">
                        {vendor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <p className="text-sm text-slate-400">
                          {vendor.flag} CAGE: {vendor.cage}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="text-yellow-400">★ {vendor.score}</span>
                          <span className="text-slate-400">{vendor.orders} orders</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">
                        <Mail className="w-4 h-4 inline mr-1" /> Contact
                      </button>
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                        <Send className="w-4 h-4 inline mr-1" /> RFQ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}