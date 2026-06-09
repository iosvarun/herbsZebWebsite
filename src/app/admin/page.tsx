"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock, 
  Award, 
  ShieldAlert, 
  CheckCircle, 
  Mail, 
  MessageSquare,
  Search
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  landmark?: string;
  pincode: string;
  state: string;
  city: string;
  paymentMethod: string;
  amount: number;
  items: OrderItem[];
  createdAt: string;
  status: string;
}

interface Inquiry {
  name: string;
  mobile: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "inquiries">("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbMode, setDbMode] = useState<"mongodb" | "local" | "">("");

  // Stats
  const [revenue, setRevenue] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [avgOrderVal, setAvgOrderVal] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [ordersRes, inquiriesRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/inquiries")
      ]);
      
      const ordersResult = await ordersRes.json();
      const inquiriesResult = await inquiriesRes.json();

      if (ordersResult.success) {
        setOrders(ordersResult.data);
        setDbMode(ordersResult.dbMode || "local");
        const totalRev = ordersResult.data.reduce((acc: number, curr: Order) => acc + curr.amount, 0);
        setRevenue(totalRev);
        setOrderCount(ordersResult.data.length);
        setAvgOrderVal(ordersResult.data.length > 0 ? totalRev / ordersResult.data.length : 0);
      } else {
        setError("Failed to fetch order details");
      }

      if (inquiriesResult.success) {
        setInquiries(inquiriesResult.data);
        if (inquiriesResult.dbMode) {
          setDbMode(inquiriesResult.dbMode);
        }
      }
    } catch (e) {
      setError("Network connection issue while loading administration logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    alert(`Order ${orderId} marked as ${newStatus}!`);
  };

  // Client-side filtering for search query
  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      o.orderId.toLowerCase().includes(query) ||
      o.name.toLowerCase().includes(query) ||
      o.mobile.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      (o.city && o.city.toLowerCase().includes(query)) ||
      (o.state && o.state.toLowerCase().includes(query))
    );
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      inq.name.toLowerCase().includes(query) ||
      inq.mobile.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.message.toLowerCase().includes(query)
    );
  });

  // Check if we are searching for a specific user profile (by typing phone or email)
  const isProfileSearchActive = 
    searchQuery.trim().length >= 8 || searchQuery.includes("@");

  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-[#8FA89B] uppercase tracking-wider block">Internal Portal</span>
            <h1 className="font-serif text-3xl font-extrabold text-[#113E21]">Owner Dashboard</h1>
          </div>
          <button
            onClick={fetchData}
            className="bg-[#113E21] text-white py-2.5 px-6 rounded-full text-xs font-bold hover:bg-[#1a5632] transition-colors cursor-pointer"
          >
            Refresh Logs
          </button>
        </div>

        {/* STATS PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Revenue */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-[#3B7A57]/10 text-[#3B7A57] rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Revenue</span>
              <h3 className="text-xl font-extrabold text-[#113E21] mt-0.5">₹{revenue.toFixed(2)}</h3>
            </div>
          </div>

          {/* Orders count */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-[#3B7A57]/10 text-[#3B7A57] rounded-2xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Orders Processed</span>
              <h3 className="text-xl font-extrabold text-[#113E21] mt-0.5">{orderCount}</h3>
            </div>
          </div>

          {/* Avg Value */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-[#3B7A57]/10 text-[#3B7A57] rounded-2xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Order Value</span>
              <h3 className="text-xl font-extrabold text-[#113E21] mt-0.5">₹{avgOrderVal.toFixed(2)}</h3>
            </div>
          </div>

          {/* Inquiries */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-[#3B7A57]/10 text-[#3B7A57] rounded-2xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Inquiries</span>
              <h3 className="text-xl font-extrabold text-[#113E21] mt-0.5">{inquiries.length}</h3>
            </div>
          </div>
        </div>

        {/* SEARCH BAR & DATABASE MODE STATUS */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex-1 max-w-lg relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by phone number, name, email, or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-[10px] font-extrabold text-slate-400 hover:text-[#113E21] uppercase tracking-wide cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Database Connection:</span>
            {dbMode === "mongodb" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold border border-emerald-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MongoDB Live
              </span>
            ) : dbMode === "local" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-extrabold border border-amber-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Local Storage Fallback
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-extrabold">
                Checking connection...
              </span>
            )}
          </div>
        </div>

        {/* UNIFIED USER PROFILE VIEW */}
        {isProfileSearchActive && (
          <div className="bg-[#113E21]/5 p-6 rounded-3xl border border-[#113E21]/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#113E21] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3B7A57]" />
                Unified Customer Log: <span className="font-sans font-extrabold text-[#3B7A57]">"{searchQuery}"</span>
              </h4>
              <span className="text-[9px] font-bold bg-[#113E21] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                linked data
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
              {/* Order history */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <span className="text-[10px] font-bold text-[#8FA89B] uppercase tracking-wider block border-b pb-1">
                  Orders ({filteredOrders.length})
                </span>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {filteredOrders.length === 0 ? (
                    <p className="text-slate-400 italic py-2">No matching orders found.</p>
                  ) : (
                    filteredOrders.map((o) => (
                      <div key={o.orderId} className="flex justify-between items-start border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <div className="font-bold text-slate-800">{o.orderId}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(o.createdAt).toLocaleDateString()} | {o.items.length} items
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-[#113E21]">₹{o.amount.toFixed(2)}</div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${
                            o.status === "Processing" ? "bg-amber-100 text-amber-800" :
                            o.status === "Dispatched" ? "bg-blue-100 text-blue-800" :
                            "bg-emerald-100 text-emerald-800"
                          }`}>
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Inquiry tickets */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <span className="text-[10px] font-bold text-[#8FA89B] uppercase tracking-wider block border-b pb-1">
                  Web Messages ({filteredInquiries.length})
                </span>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {filteredInquiries.length === 0 ? (
                    <p className="text-slate-400 italic py-2">No matching inquiries found.</p>
                  ) : (
                    filteredInquiries.map((inq, idx) => (
                      <div key={idx} className="border-b border-slate-50 pb-2.5 last:border-0 last:pb-0 space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="font-bold text-slate-600">{inq.name}</span>
                          <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600 italic font-medium leading-relaxed bg-slate-50 p-2 rounded border border-slate-100/50">
                          "{inq.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABS SELECTOR */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "orders"
                ? "border-[#113E21] text-[#113E21] bg-white font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Orders ({filteredOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "inquiries"
                ? "border-[#113E21] text-[#113E21] bg-white font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Web Messages ({filteredInquiries.length})
          </button>
        </div>

        {/* LOG PANEL TABLE */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#113E21] animate-spin mx-auto mb-3" />
              <span>Fetching server logs database...</span>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500 text-sm flex flex-col items-center gap-2">
              <ShieldAlert className="w-8 h-8" />
              <span>{error}</span>
            </div>
          ) : activeTab === "orders" ? (
            // Orders Log Table
            filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                <span>{searchQuery ? "No matching orders found for this search." : "No orders logged in the database yet."}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Shipping Address</th>
                      <th className="p-4">Items Ordered</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{order.orderId}</td>
                        <td className="p-4 text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div className="font-bold text-slate-800">{order.name}</div>
                          <div 
                            className="text-[10px] text-[#3B7A57] font-bold hover:underline cursor-pointer"
                            onClick={() => setSearchQuery(order.mobile)}
                          >
                            {order.mobile}
                          </div>
                          <div className="text-[10px] text-slate-400">{order.email}</div>
                        </td>
                        <td className="p-4 space-y-0.5 max-w-[200px]">
                          <div>{order.address}</div>
                          {order.landmark && (
                            <div className="text-[10px] text-slate-400 italic">
                              Landmark: {order.landmark}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-400">
                            {order.city}, {order.state} - {order.pincode}
                          </div>
                        </td>
                        <td className="p-4 space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100/60 leading-tight">
                              <span className="font-bold text-[#113E21]">{item.name}</span>
                              <span className="text-[10px] text-slate-400 ml-1">x{item.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-extrabold text-[#113E21] text-sm">
                          ₹{order.amount.toFixed(2)}
                          <span className="text-[9px] bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded-full block w-max font-bold mt-1 uppercase">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-4 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                order.status === "Processing"
                                  ? "bg-amber-400 animate-pulse"
                                  : order.status === "Dispatched"
                                  ? "bg-blue-400"
                                  : "bg-emerald-500"
                              }`}
                            />
                            <span className="font-bold text-slate-700">{order.status}</span>
                          </div>
                          
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleUpdateStatus(order.orderId, "Dispatched")}
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 px-2 rounded font-bold text-[9px] uppercase cursor-pointer"
                            >
                              Ship
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.orderId, "Delivered")}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-1 px-2 rounded font-bold text-[9px] uppercase cursor-pointer"
                            >
                              Deliver
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            // Inquiries Log Table
            filteredInquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                <span>{searchQuery ? "No matching inquiries found for this search." : "No customer inquiries logged yet."}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Inquiry Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredInquiries.map((inq, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-4 text-slate-400 font-medium">
                          {new Date(inq.createdAt).toLocaleString()}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div className="font-bold text-slate-800">{inq.name}</div>
                          <div 
                            className="text-[10px] text-[#3B7A57] font-bold hover:underline cursor-pointer"
                            onClick={() => setSearchQuery(inq.mobile)}
                          >
                            Mobile: {inq.mobile}
                          </div>
                          <div className="text-[10px] text-slate-400">Email: {inq.email}</div>
                        </td>
                        <td className="p-4 max-w-lg leading-relaxed text-slate-600 bg-slate-50/30 font-medium italic">
                          "{inq.message}"
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>

      </main>

      <Footer />
    </>
  );
}

