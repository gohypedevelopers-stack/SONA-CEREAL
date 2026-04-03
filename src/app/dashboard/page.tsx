"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
   const [phone, setPhone] = useState("");
   const [userProfile, setUserProfile] = useState<any>(null);
   const [submissions, setSubmissions] = useState<any[]>([]);
   const [error, setError] = useState("");
   const [searched, setSearched] = useState(false);
   const [slabs, setSlabs] = useState<any[]>([]);

   const checkStatus = async () => {
      if (!phone) return;
      setSearched(true);
      try {
         const res = await fetch(`/api/submissions?phone=${encodeURIComponent(phone)}`);
         const data = await res.json();

         const slabsRes = await fetch('/api/slabs');
         const slabsData = await slabsRes.json();
         setSlabs(slabsData);

         if (data.submissions && data.submissions.length > 0) {
            setUserProfile(data.user);
            setSubmissions(data.submissions.reverse());
            setError("");
         } else {
            setError("No registration found with this phone number.");
            setSubmissions([]);
         }
      } catch (err) {
         setError("Connection error.");
      }
   };

   useEffect(() => {
      fetch('/api/slabs').then(res => res.json()).then(setSlabs).catch(console.error);

      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         setPhone(storedPhone);
         checkStatus();
      }
   }, []);

   return (
      <div className="bg-white pb-24 font-body">
         {/* HEADER SECTION */}
         <section className="relative pt-32 pb-12 bg-white">
            <div className="container mx-auto px-6 max-w-[1440px]">
               {!searched ? (
                  <div className="bg-zinc-50 p-12 md:p-24 rounded-[4rem] text-center shadow-xl border border-zinc-100 max-w-4xl mx-auto">
                     <h3 className="font-headline font-black text-4xl md:text-6xl italic uppercase text-zinc-900 leading-none tracking-tighter mb-12 text-center">
                        USER <br />
                        <span className="text-[#CBA35C]">DASHBOARD.</span>
                     </h3>
                     <div className="relative max-w-md mx-auto space-y-6">
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 00000 00000" className="w-full p-8 rounded-[2rem] bg-white border border-zinc-100 outline-none text-2xl font-headline font-black text-zinc-900 text-center shadow-inner" />
                        <button onClick={checkStatus} className="w-full bg-zinc-900 text-white py-8 rounded-[2rem] font-headline font-black uppercase text-xl hover:bg-[#CBA35C] hover:text-black transition-all shadow-xl">CHECK STATUS</button>
                     </div>
                  </div>
               ) : (
                  <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                     {/* PROFILE HEADER */}
                     {submissions.length > 0 ? (
                        <>
                        <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35C]/10 rounded-full blur-[100px]"></div>
                           <div className="space-y-4 relative z-10">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Verified Retailer Dashboard</span>
                              </div>
                              <h2 className="font-headline font-black text-4xl md:text-6xl italic uppercase tracking-tighter">
                                 {userProfile?.name || 'Retailer Name'}
                              </h2>
                              <p className="text-[#CBA35C] font-black text-sm md:text-lg uppercase italic tracking-widest leading-none">
                                 {userProfile?.shopName || 'Business Entity'} • {userProfile?.city}
                              </p>
                           </div>
                           <div className="mt-8 md:mt-0 text-center md:text-right relative z-10 border-l-0 md:border-l border-white/10 pl-0 md:pl-12 flex gap-12">
                              <div>
                                 <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-center md:text-right">Total Achievement</span>
                                 <div className="flex items-center justify-center md:justify-end gap-2">
                                    <span className="text-4xl md:text-6xl font-headline font-black text-[#CBA35C] italic leading-none">
                                       {submissions.filter(s => s.status !== 'rejected').reduce((sum, sub) => sum + (parseInt(sub.capacity) || 0), 0)}
                                    </span>
                                    <span className="text-zinc-400 text-[10px] font-black uppercase mt-4">Total QTL</span>
                                 </div>
                              </div>
                              <div>
                                 <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-center md:text-right">Application Portfolio</span>
                                 <div className="flex items-center justify-center md:justify-end gap-2">
                                    <span className="text-4xl md:text-6xl font-headline font-black text-[#CBA35C] italic leading-none">{submissions.length}</span>
                                    <span className="text-zinc-400 text-[10px] font-black uppercase mt-4">Active Records</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="flex items-center gap-4 px-12 opacity-30">
                              <div className="h-[1px] flex-1 bg-zinc-200"></div>
                              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Voucher Record Archives</span>
                              <div className="h-[1px] flex-1 bg-zinc-200"></div>
                           </div>

                           {submissions.map((sub: any) => (
                              <div key={sub.id} className="bg-white rounded-[2rem] lg:rounded-full border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] p-6 lg:p-3 lg:px-12 relative overflow-hidden group w-full border-b-2 hover:border-[#CBA35C]/30 transition-all">
                                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#CBA35C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                 
                                 <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-8 lg:gap-6 relative z-10 py-2">
                                    
                                    {/* Bill Index Section */}
                                    <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 lg:pr-6 w-full lg:w-auto text-center lg:text-left">
                                       <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.3em] block mb-1 origin-left">BILL</span>
                                       <h3 className="text-3xl lg:text-4xl font-headline font-black text-zinc-500 italic leading-none opacity-40">#{submissions.indexOf(sub) + 1}</h3>
                                    </div>


                                    {/* Quantity Section */}
                                    <div className="lg:col-span-3 text-center border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 lg:px-6 w-full lg:w-auto">
                                       <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Bill Quantity</span>
                                       <div className="flex items-center justify-center gap-1">
                                          <span className="text-5xl lg:text-7xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter">{sub.capacity}</span>
                                          <span className="text-zinc-300 text-[10px] font-black uppercase mt-4 lg:mt-6 ml-1">QTL</span>
                                       </div>
                                       <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Invoice: {sub.invoiceNo}</div>
                                    </div>


                                    {/* Date Section */}
                                    <div className="lg:col-span-5 flex items-center justify-center gap-8 lg:gap-12 px-6 border-b lg:border-b-0 lg:border-r border-zinc-50 pb-4 lg:pb-0 w-full lg:w-auto">
                                       <div className="text-center">
                                          <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Submission Date</span>
                                          <span className="text-xl font-headline font-black text-zinc-900 uppercase italic">{sub.invoiceDate || new Date(sub.timestamp).toLocaleDateString()}</span>
                                       </div>
                                    </div>


                                    {/* Status Section */}
                                    <div className="lg:col-span-3 text-center px-6 w-full lg:w-auto">
                                       <div className={`inline-flex w-full lg:w-auto flex-col items-center justify-center px-12 py-4 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-md ${sub.status === 'claimed' ? 'bg-[#CBA35C] text-black shadow-[#CBA35C]/10' :
                                          sub.status === 'accepted' ? 'bg-green-500 text-white shadow-green-100' :
                                             sub.status === 'pending' ? 'bg-zinc-100 text-zinc-500' :
                                                'bg-red-50 text-red-500'
                                          }`}>
                                          <span>{sub.status === 'claimed' ? 'VERIFIED' : sub.status || 'PENDING'}</span>
                                       </div>
                                    </div>

                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className="text-center pt-8">
                           <button onClick={() => { setSearched(false); setUserProfile(null); setSubmissions([]); }} className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline">Use Different Number</button>
                        </div>
                        </>
                     ) : (
                        <div className="text-center p-24 bg-zinc-50 rounded-[4rem] border-2 border-dashed border-zinc-200">
                           <p className="text-zinc-400 font-headline font-black text-3xl uppercase italic mb-8 tracking-tighter">No Active Registration Record Found.</p>
                           <button onClick={() => setSearched(false)} className="text-[#CBA35C] font-black text-[10px] uppercase tracking-[0.5em] underline">Try Different Number</button>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </section>

         {/* SYNCED BOTTOM GRID */}
         <section className="py-24 bg-white border-t border-zinc-100">
            <div className="container mx-auto px-6">
               <div className="max-w-6xl mx-auto flex justify-between items-end mb-16">
                  <h2 className="font-headline font-black text-4xl md:text-7xl italic uppercase text-zinc-900 leading-[0.85] tracking-tighter text-left">REWARD <br /><span className="text-[#CBA35C]">SLABS.</span></h2>
                  <p className="hidden md:block text-zinc-400 text-right font-medium italic text-lg max-w-xs">A comprehensive portfolio of the assets available at each performance level.</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
                  {Array.isArray(slabs) && slabs.map((slab) => (
                     <div key={slab.id} className="group p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 hover:bg-white transition-all text-center flex flex-col items-center">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-white shadow-xl flex items-center justify-center p-4 text-center">
                           {slab.giftAImg ? (
                              <img src={slab.giftAImg} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={slab.target} />
                           ) : (
                              <span className="material-symbols-outlined text-zinc-200 text-6xl">card_giftcard</span>
                           )}
                        </div>
                        <h4 className="text-3xl font-headline font-black text-zinc-900 italic uppercase leading-none mb-4">{slab.target} <span className="text-[10px] font-bold text-zinc-400">QTL</span></h4>
                        <span className="text-[9px] font-black text-zinc-950 uppercase tracking-widest border-t border-zinc-100 pt-4 w-full">{slab.giftA} / {slab.giftB}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
