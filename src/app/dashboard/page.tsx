"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
   const [phone, setPhone] = useState("");
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userSubmissions, setUserSubmissions] = useState<any[]>([]);
   const [error, setError] = useState("");

   // Check for session on mount
   useEffect(() => {
      const storedPhone = localStorage.getItem("sona_user_session");
      if (storedPhone) {
         setPhone(storedPhone);
         loadDashboard(storedPhone);
      }
   }, []);

   const loadDashboard = (phoneInput: string) => {
      const sanitized = phoneInput.replace(/\D/g, "");
      const allSubmissions = JSON.parse(localStorage.getItem("sona_submissions") || "[]");
      const filtered = allSubmissions.filter((s: any) => s.phone.replace(/\D/g, "") === sanitized);

      if (filtered.length > 0) {
         setUserSubmissions(filtered.reverse());
         setIsLoggedIn(true);
         setError("");
         localStorage.setItem("sona_user_session", phoneInput);
      } else {
         setError("No active records found for this phone number.");
         setIsLoggedIn(false);
      }
   };

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (phone.length < 10) {
         setError("Please enter a valid phone number.");
         return;
      }
      loadDashboard(phone);
   };

   const handleLogout = () => {
      localStorage.removeItem("sona_user_session");
      setIsLoggedIn(false);
      setUserSubmissions([]);
      setPhone("");
   };

   const getStatusStyle = (status: string) => {
      switch (status?.toUpperCase()) {
         case 'APPROVED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
         case 'REJECTED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
         case 'CLAIMED': return 'bg-[#CBA35C]/10 text-[#CBA35C] border-[#CBA35C]/20';
         default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      }
   };

   if (!isLoggedIn) {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-md w-full space-y-12 text-center">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full border border-white/10 shadow-2xl mb-4">
                     <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full animate-pulse"></span>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">Partner Authentication</span>
                  </div>
                  <h1 className="text-5xl font-headline font-black italic uppercase text-zinc-900 leading-[0.8] tracking-tighter">
                     PORTAL <br />
                     <span className="text-[#CBA35C]">ACCESS.</span>
                  </h1>
                  <p className="text-zinc-500 font-medium italic opacity-70">Enter your registered phone number to access your reward portfolio.</p>
               </div>

               <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                     <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 00000 00000"
                        className="w-full bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem] text-3xl font-headline font-black text-center text-zinc-900 outline-none focus:ring-4 focus:ring-[#CBA35C]/10 transition-all placeholder:text-zinc-200"
                     />
                     {error && <p className="absolute -bottom-8 left-0 right-0 text-rose-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                  </div>
                  <button className="w-full bg-zinc-900 text-white py-8 rounded-[2rem] font-headline font-black uppercase text-xl shadow-2xl hover:bg-[#CBA35C] hover:text-black transition-all active:scale-95">
                     VALIDATE SESSION
                  </button>
               </form>
               
               <Link href="/" className="inline-block text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-zinc-900 transition-colors underline decoration-[#CBA35C]">Return to Homepage</Link>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-white font-body selection:bg-[#CBA35C] selection:text-black pb-32">
         {/* Subtle Background Pattern */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
         </div>

         <div className="container mx-auto px-6 pt-32 relative z-10">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-l-8 border-[#CBA35C] pl-12 bg-zinc-50/50 p-12 rounded-r-[4rem] shadow-sm">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-2.5 rounded-full border border-white/10 shadow-2xl">
                     <span className="w-2 h-2 bg-[#CBA35C] rounded-full"></span>
                     <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">Verified Partner Session</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-headline font-black italic uppercase text-zinc-900 leading-[0.8] tracking-tighter">
                     COMMAND <br />
                     <span className="text-[#CBA35C]">CENTER.</span>
                  </h1>
                  <p className="text-zinc-500 font-medium italic border-l-4 border-zinc-200 pl-6">
                     Tracking <span className="text-zinc-900 font-black">{phone}</span> application portfolio.
                  </p>
               </div>
               
               <button 
                  onClick={handleLogout}
                  className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white px-10 py-5 rounded-2xl font-headline font-black uppercase text-xs tracking-widest transition-all border border-rose-500/20"
               >
                  TERMINATE SESSION
               </button>
            </div>

            {/* Application List */}
            <div className="space-y-6 max-w-6xl mx-auto">
               <div className="grid grid-cols-12 gap-8 px-16 py-8 bg-zinc-900 rounded-[2.5rem] text-white/50 text-[9px] font-black uppercase tracking-[0.4em] italic shadow-2xl">
                  <div className="col-span-2 text-[#CBA35C]">ID / DATE</div>
                  <div className="col-span-3">FIRM IDENTITY</div>
                  <div className="col-span-4">APPLICATION DETAILS</div>
                  <div className="col-span-3 text-right">STATUS ARCHIVE</div>
               </div>

               {userSubmissions.map((sub: any) => (
                  <div key={sub.id} className="group bg-white rounded-[2.5rem] border border-zinc-100 p-2 pl-16 pr-10 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center min-h-[100px]">
                     <div className="grid grid-cols-12 w-full items-center gap-8 py-4">
                        <div className="col-span-2 border-r border-zinc-50">
                           <span className="text-zinc-300 text-[8px] font-black block mb-1">REF: {sub.id?.slice(-6)}</span>
                           <span className="text-xs font-headline font-black italic text-zinc-900 opacity-60">
                              {new Date(sub.timestamp).toLocaleDateString()}
                           </span>
                        </div>

                        <div className="col-span-3 border-r border-zinc-50">
                           <h4 className="text-xl font-headline font-black italic uppercase text-zinc-900 leading-none">{sub.firmName}</h4>
                           <span className="text-[10px] text-zinc-400 font-medium">{sub.distributorName}</span>
                        </div>

                        <div className="col-span-4 border-r border-zinc-50 flex items-center gap-8">
                           <div>
                              <span className="text-[8px] font-black text-[#CBA35C] block mb-1">SLAB</span>
                              <span className="text-2xl font-headline font-black italic text-zinc-900">{sub.capacity} <span className="text-[10px] text-zinc-300">QTL</span></span>
                           </div>
                           {sub.claimedGift && (
                              <div>
                                 <span className="text-[8px] font-black text-zinc-300 block mb-1">REWARD</span>
                                 <span className="text-lg font-headline font-black italic text-[#CBA35C] uppercase">{sub.claimedGift}</span>
                              </div>
                           )}
                        </div>

                        <div className="col-span-3 flex justify-end">
                           <div className={`px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border shadow-sm transition-all group-hover:scale-105 ${getStatusStyle(sub.status)}`}>
                              {sub.status || 'PENDING'}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
               
               {userSubmissions.length === 0 && (
                  <div className="text-center py-32 bg-zinc-50 rounded-[4rem] border-2 border-dashed border-zinc-100">
                     <p className="text-zinc-300 font-headline font-black text-2xl uppercase italic tracking-widest">No historical data found.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
