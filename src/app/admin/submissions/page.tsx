"use client";

import React, { useState, useEffect } from "react";

export default function AdminSubmissions() {
   const [submissions, setSubmissions] = useState<any[]>([]);
   const [filter, setFilter] = useState("all");
   const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);

   useEffect(() => {
      fetch("/api/admin/submissions")
         .then(res => res.json())
         .then(data => {
            setSubmissions(Array.isArray(data) ? data : []);
         })
         .catch(err => console.error("Admin fetch error:", err));
   }, []);

   const handleStatusChange = async (id: string, newStatus: string) => {
      try {
         const res = await fetch("/api/admin/submissions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus })
         });
         const data = await res.json();
         if (data.success) {
            setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
            if (selectedSubmission?.id === id) {
               setSelectedSubmission({ ...selectedSubmission, status: newStatus });
            }
         }
      } catch (err) {
         alert("Error updating status");
      }
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
      <main className="p-8 md:p-12 relative min-h-screen">
         {/* Detail Modal Overlay */}
         {selectedSubmission && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
               <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md" onClick={() => setSelectedSubmission(null)}></div>
               <div className="relative bg-white/90 backdrop-blur-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-zinc-200 shadow-2xl p-8 md:p-16 animate-in zoom-in-95 duration-300">
                  <header className="flex justify-between items-start mb-12">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedSubmission.status === 'accepted' ? 'bg-green-50 border-green-100 text-green-600' :
                              selectedSubmission.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-600' :
                                 'bg-orange-50 border-orange-100 text-orange-600'
                              }`}>
                              {selectedSubmission.status}
                           </span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#CBA35C]">Submission Request Detail</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-headline font-black text-zinc-900 italic uppercase leading-none">{selectedSubmission.name}</h3>
                        <p className="text-zinc-500 font-medium italic flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-[#CBA35C]">storefront</span> {selectedSubmission.shopName} • {selectedSubmission.city}
                        </p>
                     </div>
                     <button onClick={() => setSelectedSubmission(null)} className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-all">
                        <span className="material-symbols-outlined text-3xl font-black">close</span>
                     </button>
                  </header>

                  <div className="grid lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-5 space-y-10">
                        <div className="bg-zinc-50/50 p-8 rounded-[2rem] border border-zinc-100 space-y-8">
                           <h4 className="text-xl font-headline font-black text-zinc-900 border-b border-zinc-100 pb-4 mb-6 italic uppercase">Submission Logic</h4>

                           <div className="grid grid-cols-2 gap-8">
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Claimed Capacity</p>
                                 <p className="text-2xl font-black text-zinc-900 italic tracking-tighter">{selectedSubmission.capacity} Qtl+</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Proposed Gift</p>
                                 <p className="text-sm font-black text-[#CBA35C] uppercase italic tracking-widest">{selectedSubmission.claimedGift || "---"}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Invoiced Date</p>
                                 <p className="text-lg font-bold text-zinc-900 tracking-tight italic">{selectedSubmission.invoiceDate || new Date(selectedSubmission.timestamp).toLocaleDateString()}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Reference ID / Invoice</p>
                                 <p className="text-lg font-bold text-zinc-900 tracking-widest">{selectedSubmission.invoiceNo || "N/A"}</p>
                              </div>
                           </div>

                           <div className="pt-8 border-t border-zinc-100">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Verification Metadata</p>
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between text-xs">
                                    <span className="text-zinc-500 font-medium italic">Retailer Contact</span>
                                    <span className="text-zinc-900 font-black">{selectedSubmission.phone}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="pt-8 flex gap-4">
                              <button onClick={() => handleStatusChange(selectedSubmission.id, "accepted")} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-headline font-black uppercase italic shadow-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50" disabled={selectedSubmission.status === 'accepted' || selectedSubmission.status === 'claimed'}>
                                 <span className="material-symbols-outlined">check_circle</span> Approve
                              </button>
                              <button onClick={() => handleStatusChange(selectedSubmission.id, "rejected")} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-headline font-black uppercase italic shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50" disabled={selectedSubmission.status === 'rejected' || selectedSubmission.status === 'claimed'}>
                                 <span className="material-symbols-outlined">cancel</span> Reject
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="lg:col-span-7 space-y-8">
                        <h4 className="text-xl font-headline font-black text-zinc-900 px-4 italic uppercase">Identity Documents</h4>

                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">AADHAAR FRONT</p>
                              <a href={selectedSubmission.aadharFront} target="_blank" className="block relative aspect-[1.6/1] w-full rounded-[2.5rem] overflow-hidden border border-zinc-200 group/img shadow-lg">
                                 {selectedSubmission.aadharFront ? (
                                    <img src={selectedSubmission.aadharFront} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" alt="Front" />
                                 ) : (
                                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center italic text-zinc-400 text-xs">No image provided</div>
                                 )}
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-white font-black">zoom_in</span>
                                 </div>
                              </a>
                           </div>

                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">AADHAAR BACK</p>
                              <a href={selectedSubmission.aadharBack} target="_blank" className="block relative aspect-[1.6/1] w-full rounded-[2.5rem] overflow-hidden border border-zinc-200 group/img shadow-lg">
                                 {selectedSubmission.aadharBack ? (
                                    <img src={selectedSubmission.aadharBack} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" alt="Back" />
                                 ) : (
                                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center italic text-zinc-400 text-xs">No image provided</div>
                                 )}
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-white font-black">zoom_in</span>
                                 </div>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

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
                        <th className="p-6 text-[10px) font-black uppercase tracking-widest">Contact / ID</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Gift</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {filteredSubmissions.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="p-12 text-center text-zinc-400 font-medium italic">No submissions found in this category.</td>
                        </tr>
                     ) : (
                        filteredSubmissions.map((sub) => (
                           <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                              <td className="p-6">
                                 <span className="block font-headline font-black text-zinc-900 uppercase italic leading-tight">{sub.name}</span>
                                 <span className="text-xs text-zinc-500 font-medium">{sub.shopName} • {sub.city} • <span className="text-zinc-400 font-bold tracking-tight italic">{sub.invoiceNo}</span></span>
                              </td>
                              <td className="p-6">
                                 <span className="inline-flex items-center gap-1 bg-[#CBA35C]/10 text-black px-3 py-1 rounded-full text-[10px] font-black">
                                    {sub.capacity} Qtl+
                                 </span>
                              </td>
                              <td className="p-6">
                                 <span className="block text-xs font-bold text-zinc-900">{sub.phone}</span>
                                 <div className="flex gap-2 mt-1">
                                    {sub.aadharFront && (
                                       <a href={sub.aadharFront} target="_blank" className="text-[8px] font-black uppercase text-[#CBA35C] hover:underline">Front ID</a>
                                    )}
                                    {sub.aadharBack && (
                                       <a href={sub.aadharBack} target="_black" className="text-[8px] font-black uppercase text-[#CBA35C] hover:underline">Back ID</a>
                                    )}
                                 </div>
                              </td>
                               <td className="p-6">
                                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                    sub.status === 'claimed' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' :
                                    sub.status === 'accepted' ? 'bg-green-50 border-green-100 text-green-600' :
                                    sub.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-600' :
                                       'bg-orange-50 border-orange-100 text-orange-600'
                                    }`}>
                                    {sub.status}
                                 </span>
                              </td>
                              <td className="p-6">
                                 <span className="text-[10px] font-black uppercase text-[#CBA35C] tracking-widest">{sub.claimedGift || "---"}</span>
                              </td>
                              <td className="p-6 text-right">
                                 <div className="flex justify-end items-center gap-4">
                                    <button
                                       onClick={() => setSelectedSubmission(sub)}
                                       className="w-10 h-10 flex items-center justify-center bg-zinc-900 text-white rounded-xl hover:bg-[#CBA35C] hover:text-black transition-all shadow-md group/eye"
                                    >
                                       <span className="material-symbols-outlined scale-110 group-hover/eye:scale-125 transition-transform">visibility</span>
                                    </button>

                                    <div className="h-10 w-px bg-zinc-100"></div>

                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => handleStatusChange(sub.id, "accepted")}
                                          title="Approve" disabled={sub.status === 'claimed'}
                                          className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                       >
                                          <span className="material-symbols-outlined">check</span>
                                       </button>
                                       <button
                                          onClick={() => handleStatusChange(sub.id, "rejected")}
                                          title="Reject" disabled={sub.status === 'claimed'}
                                          className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                       >
                                          <span className="material-symbols-outlined">close</span>
                                       </button>
                                    </div>
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
   );
}
