"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Mock Submissions Data - In a real app, this would come from a database
const initialSubmissions = [
  {
    id: "1",
    name: "Rajesh Kumar",
    shopName: "Kumar Cereal Store",
    phone: "9876543210",
    city: "Jaipur",
    upi: "rajesh@upi",
    capacity: "500",
    status: "pending",
    timestamp: "2026-03-31 14:20",
  },
  {
    id: "2",
    name: "Sunil Verma",
    shopName: "Verma Traders",
    phone: "9123456789",
    city: "Indore",
    upi: "sunil@upi",
    capacity: "1000",
    status: "accepted",
    timestamp: "2026-03-31 10:15",
  },
];

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("sona_submissions");
    if (saved) {
      setSubmissions(JSON.parse(saved));
    } else {
      setSubmissions(initialSubmissions);
      localStorage.setItem("sona_submissions", JSON.stringify(initialSubmissions));
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub);
    setSubmissions(updated);
    localStorage.setItem("sona_submissions", JSON.stringify(updated));
  };

  const filteredSubmissions = submissions.filter(sub =>
    filter === "all" ? true : sub.status === filter
  );

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === "pending").length,
    accepted: submissions.filter(s => s.status === "accepted").length,
    rejected: submissions.filter(s => s.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-body">
      {/* Sidebar - Fixed */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 text-white p-8 hidden lg:flex flex-col z-50">
        <div className="mb-12">
          <h1 className="text-2xl font-headline font-black italic">
            SONA <span className="text-[#CBA35C]">ADMIN</span>
          </h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Command Center 2026</p>
        </div>

        <nav className="space-y-4 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 p-4 bg-[#CBA35C] text-black rounded-xl font-black text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined">dashboard</span> Submissions
          </Link>
          <div className="p-4 text-zinc-500 font-black text-xs uppercase tracking-widest flex items-center gap-3">
            <span className="material-symbols-outlined">analytics</span> Analytics (Soon)
          </div>
          <div className="p-4 text-zinc-500 font-black text-xs uppercase tracking-widest flex items-center gap-3">
            <span className="material-symbols-outlined">settings</span> Settings
          </div>
        </nav>

        <Link href="/" className="flex items-center gap-3 p-4 text-zinc-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest">
          <span className="material-symbols-outlined">logout</span> View Portal
        </Link>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 md:p-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-headline font-black text-zinc-900 uppercase italic">Retailer <span className="text-[#CBA35C]">Requests</span></h2>
            <p className="text-zinc-500 font-medium">Manage and validate incoming retailer registrations.</p>
          </div>

          <div className="flex gap-2">
            {["all", "pending", "accepted", "rejected"].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400 border border-zinc-200 hover:border-zinc-900'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total", val: stats.total, color: "zinc" },
            { label: "Pending", val: stats.pending, color: "orange" },
            { label: "Accepted", val: stats.accepted, color: "green" },
            { label: "Rejected", val: stats.rejected, color: "red" },
          ].map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{stat.label} Submissions</span>
              <span className="block text-4xl font-headline font-black text-zinc-900 mt-2 italic">{stat.val}</span>
            </div>
          ))}
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Retailer / Shop</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Capacity</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Contact / UPI</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-zinc-400 font-medium italic">No submissions found in this category.</td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-6">
                        <span className="block font-headline font-black text-zinc-900 uppercase italic leading-tight">{sub.name}</span>
                        <span className="text-xs text-zinc-500 font-medium">{sub.shopName} • {sub.city}</span>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center gap-1 bg-[#CBA35C]/10 text-black px-3 py-1 rounded-full text-[10px] font-black">
                          {sub.capacity} Qtl+
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="block text-xs font-bold text-zinc-900">{sub.phone}</span>
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{sub.upi}</span>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${sub.status === 'accepted' ? 'bg-green-50 border-green-100 text-green-600' :
                          sub.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-600' :
                            'bg-orange-50 border-orange-100 text-orange-600'
                          }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(sub.id, "accepted")}
                            title="Approve"
                            className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
                          >
                            <span className="material-symbols-outlined">check</span>
                          </button>
                          <button
                            onClick={() => handleStatusChange(sub.id, "rejected")}
                            title="Reject"
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                          <button
                            title="View Documents"
                            className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
