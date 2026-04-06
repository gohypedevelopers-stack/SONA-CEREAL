"use client";

import React, { useState, useEffect } from "react";

export default function AdminRegistrations() {
   const [users, setUsers] = useState<any[]>([]);
   const [allSlabs, setAllSlabs] = useState<any[]>([]);
   const [selectedUser, setSelectedUser] = useState<any | null>(null);
   const [isLocked, setIsLocked] = useState(true);
   const [loadingSettings, setLoadingSettings] = useState(true);

   useEffect(() => {
      fetch("/api/admin/users")
         .then(res => res.json())
         .then(data => {
            if (data.users) {
               setUsers(data.users);
               setAllSlabs(data.allSlabs || []);
            } else {
               setUsers(Array.isArray(data) ? data : []);
            }
         })
         .catch(err => console.error("Admin user fetch error:", err));

      fetch("/api/settings", { cache: 'no-store' })
         .then(res => res.json())
         .then(data => {
            setIsLocked(!data.rewardsDistributed);
         })
         .finally(() => setLoadingSettings(false));
   }, []);

   const handleManualSlabChange = async (phone: string, slabId: string) => {
      try {
         const res = await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, slabId })
         });
         const data = await res.json();
         if (data.success) {
            // Re-fetch everything to ensure all calculated fields are in sync
            fetch("/api/admin/users")
               .then(res => res.json())
               .then(data => {
                  if (data.users) {
                     setUsers(data.users);
                  }
               });
         } else {
            alert("Error: " + (data.error || "Failed to update"));
         }
      } catch (err) {
         alert("Error overriding slab");
      }
   };

   const handleResetRecords = async (phone: string) => {
      if (!window.confirm("Are you sure you want to reset all records for this retailer? This will delete all their submissions and choices.")) return;

      try {
         const res = await fetch(`/api/admin/users?phone=${phone}`, { method: 'DELETE' });
         const data = await res.json();
         if (data.success) {
            setUsers(prev => prev.map(u => u.phone === phone ? { ...u, totalQty: 0, claimedGift: null, slabNo: '—', slabName: '—' } : u));
            alert("Records reset successfully.");
         } else {
            alert("Error resetting records: " + data.error);
         }
      } catch (err) {
         alert("Network error.");
      }
   };

   return (
      <main className="p-8 md:p-12 relative min-h-screen">
         {/* Detail Modal Overlay */}
         {selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
               <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md" onClick={() => setSelectedUser(null)}></div>
               <div className="relative bg-white/90 backdrop-blur-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-zinc-200 shadow-2xl p-8 md:p-16 animate-in zoom-in-95 duration-300">
                  <header className="flex justify-between items-start mb-12">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#CBA35C]">Registered Entity Profile</span>
                        <h3 className="text-4xl md:text-5xl font-headline font-black text-zinc-900 italic uppercase leading-none">{selectedUser.name}</h3>
                        <p className="text-zinc-500 font-medium italic flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-[#CBA35C]">storefront</span> {selectedUser.shopName}
                        </p>
                     </div>
                     <button onClick={() => setSelectedUser(null)} className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-all">
                        <span className="material-symbols-outlined text-3xl font-black">close</span>
                     </button>
                  </header>

                  <div className="grid lg:grid-cols-2 gap-12">
                     <div className="space-y-10">
                        <div className="bg-zinc-50/50 p-8 rounded-[2rem] border border-zinc-100 space-y-6">
                           <h4 className="text-xl font-headline font-black text-zinc-900 border-b border-zinc-100 pb-4 mb-6 italic uppercase">Core Identity</h4>

                           <div className="space-y-6">
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Proprietor Name</p>
                                 <p className="text-lg font-bold text-zinc-900">{selectedUser.name}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Business Name</p>
                                 <p className="text-lg font-bold text-zinc-900">{selectedUser.shopName}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Phone Number</p>
                                 <p className="text-lg font-bold text-zinc-900">{selectedUser.phone}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">City / Region</p>
                                 <p className="text-lg font-bold text-zinc-900">{selectedUser.city}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <h4 className="text-xl font-headline font-black text-zinc-900 px-4 italic uppercase">Verification Assets</h4>

                        <div className="space-y-6">
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">AADHAAR FRONT (IMAGE)</p>
                              <a href={selectedUser.aadharFront} target="_blank" className="block relative aspect-[1.6/1] w-full rounded-[2.5rem] overflow-hidden border border-zinc-200 group/img shadow-lg">
                                 {selectedUser.aadharFront && (
                                    <img src={selectedUser.aadharFront} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" alt="Front" />
                                 )}
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-5xl text-white font-black">zoom_in</span>
                                 </div>
                              </a>
                           </div>

                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">AADHAAR BACK (IMAGE)</p>
                              <a href={selectedUser.aadharBack} target="_blank" className="block relative aspect-[1.6/1] w-full rounded-[2.5rem] overflow-hidden border border-zinc-200 group/img shadow-lg">
                                 {selectedUser.aadharBack && (
                                    <img src={selectedUser.aadharBack} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" alt="Back" />
                                 )}
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-5xl text-white font-black">zoom_in</span>
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
               <h2 className="text-4xl font-headline font-black text-zinc-900 uppercase italic">Business <span className="text-[#CBA35C]">Registrations</span></h2>
               <p className="text-zinc-500 font-medium">Full database of all registered retailers across the ecosystem.</p>
            </div>

            {!loadingSettings && (
               <div className="flex items-center gap-4">
                  <button 
                     onClick={async () => {
                        const confirmed = window.confirm("WARNING: This will delete ALL submissions and reset all slab overrides for ALL retailers. Registrations will be kept. Are you sure you want to proceed?");
                        if (confirmed) {
                           try {
                              const res = await fetch("/api/admin/users", { method: "DELETE" });
                              const data = await res.json();
                              if (data.success) {
                                 alert("All campaign data has been reset.");
                                 // Re-fetch everything
                                 fetch("/api/admin/users").then(res => res.json()).then(data => data.users && setUsers(data.users));
                                 setIsLocked(true);
                              }
                           } catch (err) {
                              alert("Error resetting data.");
                           }
                        }
                     }}
                     className="px-6 py-3 rounded-xl font-headline font-black uppercase text-xs transition-all shadow-lg flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
                  >
                     <span className="material-symbols-outlined text-lg">delete_forever</span>
                     Delete All Data
                  </button>

                  <button 
                     onClick={async () => {
                        const confirmed = window.confirm(`Are you sure you want to ${isLocked ? 'unlock' : 'lock'} the redeem portal?`);
                        if (confirmed) {
                           try {
                              await fetch('/api/settings', {
                                 method: 'PATCH',
                                 headers: { 'Content-Type': 'application/json' },
                                 body: JSON.stringify({ rewardsDistributed: isLocked })
                              });
                              setIsLocked(!isLocked);
                              alert(`Redeem portal ${isLocked ? 'unlocked' : 'locked'} successfully!`);
                           } catch (err) {
                              alert("Error updating settings.");
                           }
                        }
                     }}
                     className={`px-8 py-3 rounded-xl font-headline font-black uppercase text-xs transition-all shadow-lg flex items-center gap-2 ${isLocked ? 'bg-[#CBA35C] text-black hover:bg-[#B08644]' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  >
                     <span className="material-symbols-outlined text-lg">{isLocked ? 'workspace_premium' : 'lock'}</span>
                     {isLocked ? 'Distribute Rewards' : 'Lock Redeem Page'}
                  </button>
               </div>
            )}
         </header>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
               <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Registered Partners</span>
               <span className="block text-4xl font-headline font-black text-zinc-900 mt-2 italic">{users.length}</span>
            </div>
         </div>

         {/* Registrations Table */}
         <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-[#CBA35C] text-black">
                     <tr>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest font-headline italic">Retailer Name</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest font-headline italic">Gift Chosen</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest font-headline italic">Slab No</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest font-headline italic">Slab Detail</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest font-headline italic">Total Qty</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right font-headline italic">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {users.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="p-12 text-center text-zinc-400 font-medium italic">No registrations recorded yet.</td>
                        </tr>
                     ) : (
                        users.map((user) => (
                           <tr key={user.phone} className="hover:bg-zinc-50 transition-colors">
                              <td className="p-6">
                                 <span className="block font-headline font-black text-zinc-900 uppercase italic leading-tight">{user.name}</span>
                                 <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-tight">{user.shopName} • {user.city}</span>
                                 <div className="text-[8px] text-[#CBA35C] font-black tracking-widest mt-1 uppercase italic underline">{user.phone}</div>
                              </td>
                              <td className="p-6">
                                 <span className={`text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 ${user.claimedGift ? 'text-indigo-600' : 'text-zinc-300'}`}>
                                    <span className="material-symbols-outlined text-xs">{user.claimedGift ? 'redeem' : 'pending'}</span>
                                    {user.claimedGift || 'NONE'}
                                 </span>
                              </td>
                              <td className="p-6">
                                 <div className="relative group w-fit cursor-pointer">
                                    <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black tracking-widest italic border transition-all ${user.overrideSlabId ? 'bg-[#CBA35C] text-black border-[#CBA35C] shadow-[0_0_15px_rgba(203,163,92,0.3)]' : 'bg-zinc-900 text-white border-zinc-800'}`}>
                                       {user.slabNo === '—' ? 'NONE' : `SLAB ${user.slabNo}`}
                                       {user.overrideSlabId && <span className="ml-2 material-symbols-outlined text-[10px]">edit</span>}
                                    </span>
                                    
                                    <select
                                       value={user.overrideSlabId || 'auto'}
                                       onChange={(e) => handleManualSlabChange(user.phone, e.target.value)}
                                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                       title="Click to Change Slab Level"
                                    >
                                       <option value="auto" className="bg-white text-black uppercase">
                                          {(user.autoSlabNo && user.autoSlabNo !== '—') ? `SLAB ${user.autoSlabNo}` : 'NONE'} (SYSTEM)
                                       </option>
                                       {allSlabs.map(s => (
                                          <option key={s.id} value={s.id} className="bg-white text-black uppercase">
                                             SLAB {s.level} - ({s.target}Q Target)
                                          </option>
                                       ))}
                                    </select>
                                 </div>
                              </td>
                              <td className="p-6">
                                 <span className="text-[8px] text-zinc-400 font-black uppercase tracking-widest italic leading-tight block max-w-[100px]">
                                    {user.slabName || '—'}
                                 </span>
                              </td>
                              <td className="p-6">
                                 <span className="text-lg font-headline font-black text-zinc-900 italic tracking-tighter">
                                    {user.totalQty} <span className="text-[10px] text-zinc-400">QTL+</span>
                                 </span>
                              </td>
                              <td className="p-6">
                                 <div className="flex justify-end items-center gap-4">
                                    <button
                                       onClick={() => setSelectedUser(user)}
                                       title="View Identity"
                                       className="w-10 h-10 flex items-center justify-center bg-zinc-100 text-zinc-400 rounded-xl hover:bg-zinc-900 hover:text-white transition-all shadow-sm group/eye"
                                    >
                                       <span className="material-symbols-outlined scale-110 group-hover/eye:scale-110 transition-transform">visibility</span>
                                    </button>

                                    <button
                                       onClick={() => handleResetRecords(user.phone)}
                                       title="Reset All Records"
                                       className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                    >
                                       <span className="material-symbols-outlined">delete_sweep</span>
                                    </button>

                                    <div className="h-8 w-px bg-zinc-100"></div>

                                    <div className="flex gap-2">
                                       <a href={user.aadharFront} target="_blank" className="flex flex-col items-center group/id" title="Aadhar Front">
                                          <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center group-hover/id:border-[#CBA35C] transition-all overflow-hidden p-0.5 shadow-sm">
                                             {user.aadharFront ? (
                                                <img src={user.aadharFront} className="w-full h-full object-cover rounded-lg scale-110" alt="Front" />
                                             ) : (
                                                <span className="material-symbols-outlined text-xs text-zinc-200">id_card</span>
                                             )}
                                          </div>
                                       </a>
                                       <a href={user.aadharBack} target="_blank" className="flex flex-col items-center group/id" title="Aadhar Back">
                                          <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center group-hover/id:border-[#CBA35C] transition-all overflow-hidden p-0.5 shadow-sm">
                                             {user.aadharBack ? (
                                                <img src={user.aadharBack} className="w-full h-full object-cover rounded-lg scale-110" alt="Back" />
                                             ) : (
                                                <span className="material-symbols-outlined text-xs text-zinc-200">id_card</span>
                                             )}
                                          </div>
                                       </a>
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
