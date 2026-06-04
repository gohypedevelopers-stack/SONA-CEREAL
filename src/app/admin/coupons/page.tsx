"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isAdding, setIsAdding] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: "" });
  const [file, setFile] = useState<File | null>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/coupons?search=${search}&status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [search, statusFilter]);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon)
      });
      const data = await res.json();
      if (data.success) {
        alert("Coupon added successfully");
        setIsAdding(false);
        fetchCoupons();
        setNewCoupon({ code: "" });
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to add coupon");
    }
  };

  const handleImport = async () => {
    if (!file) return alert("Please select a CSV file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/coupons/import", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        const { result } = data;
        alert(`Imported successfully!\nTotal: ${result.totalRows}\nSuccess: ${result.successCount}\nDuplicates skipped: ${result.duplicateCount}\nFailed: ${result.failedRows.length}`);
        setFile(null);
        fetchCoupons();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to import CSV");
    }
  };

  const handleExport = () => {
    window.location.href = "/api/admin/coupons/export";
  };

  const handleDeleteAll = async () => {
    if (confirm("Are you absolutely sure you want to delete ALL coupons and their redemption records? This action cannot be undone.")) {
      try {
        const res = await fetch("/api/admin/coupons", {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("All coupons deleted successfully");
          fetchCoupons();
        } else {
          alert("Error deleting coupons");
        }
      } catch (err) {
        alert("Failed to delete coupons");
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "DISABLED" ? "AVAILABLE" : "DISABLED";
    try {
      await fetch(`/api/admin/coupons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchCoupons();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-headline font-black italic uppercase tracking-tighter text-zinc-900">
            COUPON <span className="text-[#CBA35C]">MANAGEMENT</span>
          </h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Create, import and track coupons</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleDeleteAll} className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-colors">
            Delete All
          </button>
          <button onClick={handleExport} className="bg-zinc-100 text-zinc-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors">
            Export Redemptions CSV
          </button>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#CBA35C] hover:text-black transition-colors">
            {isAdding ? "Close" : "+ Add Manual"}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-xl space-y-6">
          <h3 className="text-xl font-headline font-black italic uppercase">Add New Coupon</h3>
          <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input type="text" placeholder="Coupon Code" value={newCoupon.code} onChange={e => setNewCoupon({code: e.target.value})} className="p-4 border border-zinc-200 rounded-xl" required />
            <button type="submit" className="bg-[#CBA35C] text-black font-black uppercase text-sm rounded-xl py-4 hover:opacity-80">Save Coupon</button>
          </form>

          <div className="pt-6 border-t border-zinc-100 flex items-center gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-zinc-500 mb-2">Or Import via CSV</p>
              <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>
            <button onClick={handleImport} className="bg-zinc-900 text-white px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-zinc-800">
              Upload & Import
            </button>
            <a href="data:text/csv;charset=utf-8,code%0AABC123%0AXYZ999" download="template.csv" className="text-xs text-blue-500 underline">Download Template</a>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-100 flex flex-wrap gap-4 justify-between items-center bg-zinc-50/50">
          <input 
            type="text" 
            placeholder="Search code, phone, name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border border-zinc-200 rounded-xl w-full max-w-xs text-sm"
          />
          <div className="flex gap-2 text-sm font-bold">
            {["ALL", "AVAILABLE", "REDEEMED", "DISABLED", "EXPIRED"].map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg ${statusFilter === status ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-400">
                <th className="p-4 pl-6 font-black">Code</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black">Redeemed By</th>
                <th className="p-4 font-black">Gift Selected</th>
                <th className="p-4 pr-6 text-right font-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center p-8">Loading...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-8 text-zinc-500 font-medium italic">No coupons found</td></tr>
              ) : coupons.map((c: any) => (
                <tr key={c.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-zinc-900">{c.code}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                      c.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                      c.status === 'REDEEMED' ? 'bg-blue-100 text-blue-700' :
                      c.status === 'DISABLED' ? 'bg-red-100 text-red-700' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-zinc-500">
                    {c.redemption ? (
                      <div>
                        <div className="font-bold text-zinc-900">{c.redemption.name}</div>
                        <div className="text-xs">{c.redemption.phone}</div>
                        <div className="text-[10px] text-zinc-400 mt-1">{new Date(c.redemption.redeemedAt).toLocaleDateString()}</div>
                      </div>
                    ) : "-"}
                  </td>
                  <td className="p-4 text-sm text-zinc-600 italic">
                    {c.redemption?.selectedGift || "-"}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    {c.status !== "REDEEMED" && (
                      <button 
                        onClick={() => toggleStatus(c.id, c.status)}
                        className={`text-xs font-bold underline ${c.status === 'DISABLED' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {c.status === 'DISABLED' ? 'Enable' : 'Disable'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
