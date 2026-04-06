"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
   const [phone, setPhone] = useState("+91 ");
   const [userProfile, setUserProfile] = useState<any>(null);
   const [submissions, setSubmissions] = useState<any[]>([]);
   const [error, setError] = useState("");
   const [searched, setSearched] = useState(false);
   const [loading, setLoading] = useState(false);
   const STATIC_SLABS = [
      { id: "s1", target: 200, giftA: "MICROWAVE", giftAImg: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop", giftB: "JBL SPEAKER" },
      { id: "s2", target: 300, giftA: "IPHONE", giftAImg: "/reward-iphone.png", giftB: "TVS APACHE" },
      { id: "s3", target: 500, giftA: "SMART PHONE NOTHING", giftAImg: "/reward-phone.png", giftB: "SMART TV SONY" },
      { id: "s4", target: 1000, giftA: "IPHONE 16 PRO", giftAImg: "/reward-iphone.png", giftB: "REFRIGERATOR" }
   ];

   const checkStatus = async () => {
      if (phone.length < 14) {
         setError("Please enter a valid 10-digit phone number (+91 00000 00000).");
         return;
      }
      setSearched(true);
      setLoading(true);
      try {
         const res = await fetch(`/api/submissions?phone=${encodeURIComponent(phone)}`);
         const data = await res.json();

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
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         setPhone(storedPhone);
         checkStatus();
      }
   }, []);

   return (
      <div className="bg-white pb-24 font-body">
         {/* HEADER SECTION */}
         <section className="relative pt-12 md:pt-24 pb-12 bg-white">
            <div className="container mx-auto px-6 max-w-[1440px]">
               {!searched ? (
                  <div className="bg-zinc-50 p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] text-center shadow-xl border border-zinc-100 max-w-4xl mx-auto">
                     <h3 className="font-headline font-black text-2xl md:text-6xl italic uppercase text-zinc-900 leading-none tracking-tighter mb-8 md:mb-12 text-center">
                        USER <br />
                        <span className="text-[#CBA35C]">DASHBOARD.</span>
                     </h3>
                     <div className="relative max-w-md mx-auto space-y-4 md:space-y-6">
                        <input 
                           type="tel" 
                           value={phone} 
                           onChange={(e) => {
                              if (e.target.value.startsWith('+91 ')) {
                                 setPhone(e.target.value);
                              }
                           }} 
                           placeholder="+91 00000 00000" 
                           className="w-full p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white border border-zinc-100 outline-none text-xl md:text-2xl font-headline font-black text-zinc-900 text-center shadow-inner" 
                        />
                        {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{error}</p>}
                        <button onClick={checkStatus} className="w-full bg-zinc-900 text-white py-6 md:py-8 rounded-2xl md:rounded-[2rem] font-headline font-black uppercase text-lg md:text-xl hover:bg-[#CBA35C] hover:text-black transition-all shadow-xl">CHECK STATUS</button>
                     </div>
                  </div>
                ) : loading ? (
                   <div className="py-24 text-center space-y-8 animate-in fade-in duration-700">
                      <div className="relative w-24 h-24 mx-auto">
                         <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-t-[#CBA35C] rounded-full animate-spin"></div>
                      </div>
                      <div className="space-y-2">
                         <h3 className="font-headline font-black text-2xl uppercase italic tracking-tighter text-zinc-900">Synchronizing Data</h3>
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Verifying secure database node</p>
                      </div>
                   </div>
               ) : (
                  <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                     {/* PROFILE HEADER */}
                     {submissions.length > 0 ? (
                        <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35C]/10 rounded-full blur-[100px]"></div>
                           <div className="space-y-4 relative z-10 w-full md:w-auto">
                              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Verified Retailer Dashboard</span>
                              </div>
                              <h2 className="font-headline font-black text-2xl md:text-6xl italic uppercase tracking-tighter">
                                 {userProfile?.name || 'Retailer Name'}
                              </h2>
                              <p className="text-[#CBA35C] font-black text-xs md:text-lg uppercase italic tracking-widest leading-none">
                                 {userProfile?.shopName || 'Business Entity'} • {userProfile?.city}
                              </p>
                           </div>
                           <div className="mt-8 md:mt-0 text-left md:text-right relative z-10 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex gap-8 md:gap-12 w-full md:w-auto">
                              <div className="flex-1 md:flex-none">
                                 <span className="block text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Achievement</span>
                                 <div className="flex items-center gap-1">
                                    <span className="text-2xl md:text-6xl font-headline font-black text-[#CBA35C] italic leading-none">
                                       {submissions.filter(s => s.status !== 'rejected').reduce((sum, sub) => sum + (parseInt(sub.capacity) || 0), 0)}
                                    </span>
                                    <span className="text-zinc-400 text-[8px] font-black uppercase mt-2 md:mt-4">Total QTL</span>
                                 </div>
                              </div>
                              <div className="flex-1 md:flex-none">
                                 <span className="block text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2">Application Portfolio</span>
                                 <div className="flex items-center gap-1">
                                    <span className="text-2xl md:text-6xl font-headline font-black text-[#CBA35C] italic leading-none">{submissions.length}</span>
                                    <span className="text-zinc-400 text-[8px] font-black uppercase mt-2 md:mt-4">Active Records</span>
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
                                       <span className="text-[#CBA35C] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Bill Quantity</span>
                                       <div className="flex items-center justify-center gap-1">
                                          <span className="text-3xl md:text-7xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter">{sub.capacity}</span>
                                          <span className="text-zinc-300 text-[8px] md:text-[10px] font-black uppercase mt-3 md:mt-6 ml-1">QTL</span>
                                       </div>
                                       <div className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Invoice: {sub.invoiceNo}</div>
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
                                       <div className={`inline-flex w-full lg:w-auto items-center justify-center px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-3xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all shadow-md ${sub.status === 'claimed' ? 'bg-[#CBA35C] text-black shadow-[#CBA35C]/10' :
                                          sub.status === 'accepted' ? 'bg-green-500 text-white shadow-green-100' :
                                             sub.status === 'pending' ? 'bg-zinc-100 text-zinc-400' :
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

      </div>
   );
}
