"use client";

import React, { useState, useEffect } from "react";

export default function AdminRegistrations() {
   const [users, setUsers] = useState<any[]>([]);
   const [selectedUser, setSelectedUser] = useState<any | null>(null);

   useEffect(() => {
      fetch("/api/admin/users")
         .then(res => res.json())
         .then(data => {
            setUsers(Array.isArray(data) ? data : []);
         })
         .catch(err => console.error("Admin user fetch error:", err));
   }, []);

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
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Retailer Name</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Shop / Firm</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Location</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest">Contact</th>
                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {users.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="p-12 text-center text-zinc-400 font-medium italic">No registrations recorded yet.</td>
                        </tr>
                     ) : (
                        users.map((user) => (
                           <tr key={user.phone} className="hover:bg-zinc-50 transition-colors">
                              <td className="p-6">
                                 <span className="block font-headline font-black text-zinc-900 uppercase italic leading-tight">{user.name}</span>
                              </td>
                              <td className="p-6">
                                 <span className="text-xs text-zinc-600 font-bold uppercase tracking-tight">{user.shopName}</span>
                              </td>
                              <td className="p-6">
                                 <span className="text-xs text-zinc-600 font-bold uppercase tracking-tight">{user.city}</span>
                              </td>
                              <td className="p-6">
                                 <span className="text-xs text-zinc-900 font-black tracking-widest underline decoration-[#CBA35C] decoration-2 underline-offset-4">{user.phone}</span>
                              </td>
                              <td className="p-6">
                                 <div className="flex justify-end items-center gap-6">
                                    <button 
                                       onClick={() => setSelectedUser(user)}
                                       className="w-10 h-10 flex items-center justify-center bg-zinc-900 text-white rounded-xl hover:bg-[#CBA35C] hover:text-black transition-all shadow-md group/eye"
                                    >
                                       <span className="material-symbols-outlined scale-110 group-hover/eye:scale-125 transition-transform">visibility</span>
                                    </button>
                                    
                                    <div className="h-10 w-px bg-zinc-100"></div>

                                    <div className="flex gap-4">
                                       <a href={user.aadharFront} target="_blank" className="flex flex-col items-center group/id">
                                          <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center group-hover/id:border-[#CBA35C] transition-all overflow-hidden p-0.5 shadow-sm">
                                             {user.aadharFront && (
                                                <img src={user.aadharFront} className="w-full h-full object-cover rounded-lg scale-110" alt="Front" />
                                             )}
                                          </div>
                                       </a>
                                       <a href={user.aadharBack} target="_blank" className="flex flex-col items-center group/id">
                                          <div className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center group-hover/id:border-[#CBA35C] transition-all overflow-hidden p-0.5 shadow-sm">
                                             {user.aadharBack && (
                                                <img src={user.aadharBack} className="w-full h-full object-cover rounded-lg scale-110" alt="Back" />
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
