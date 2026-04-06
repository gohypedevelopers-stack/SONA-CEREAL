"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function MilestonesPage() {
   const [slabs, setSlabs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch('/api/slabs')
         .then(res => res.json())
         .then(data => {
            setSlabs(Array.isArray(data) ? data : []);
         })
         .catch(err => console.error(err))
         .finally(() => setLoading(false));
   }, []);

   return (
      <div className="min-h-screen bg-white font-body selection:bg-[#CBA35C] selection:text-black pb-32">
         {/* Subtle Background Pattern */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
         </div>

         <div className="max-w-full mx-auto px-2 md:px-6 pt-24 md:pt-32 relative z-10">
            {/* Header Section */}
            <div className="max-w-4xl mb-24 md:mb-32 border-l-8 border-[#CBA35C] pl-8 md:pl-12 bg-zinc-50/50 p-8 md:p-16 rounded-r-3xl md:rounded-r-[4rem] shadow-sm">
               <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-2.5 rounded-full mb-8 md:mb-10 border border-white/10 shadow-2xl">
                  <span className="w-2 h-2 bg-[#CBA35C] rounded-full animate-pulse"></span>
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">Sona Elite Slabs 2025</span>
               </div>
               <h1 className="font-headline font-black text-4xl md:text-[5rem] italic uppercase text-zinc-900 leading-[0.9] md:leading-[0.8] tracking-tighter mb-8 md:mb-10">
                  REWARD <br />
                  <span className="text-[#CBA35C]">ARCHITECTURE.</span>
               </h1>
               <p className="text-zinc-500 text-base md:text-xl max-w-2xl font-medium leading-relaxed italic border-l-4 border-zinc-200 pl-6 md:pl-8 ml-1 md:ml-2 mt-6 md:mt-8">
                  Reach the weight milestones to unlock exclusive assets. Elite validation for Sona Cereal market leaders.
               </p>
            </div>

            {/* Legend / Table Header - Absolute Width Pill */}
            <div className="hidden lg:grid grid-cols-12 gap-8 px-24 py-8 bg-zinc-900 rounded-full text-white items-center shadow-2xl mb-12 border border-white/5 w-full">
               <div className="col-span-2 text-[11px] font-black uppercase tracking-[0.8em] text-[#CBA35C] italic">SLABS</div>
               <div className="col-span-3 text-[11px] font-black uppercase tracking-[0.8em] text-white/40 italic">MILESTONE</div>
               <div className="col-span-7 text-[11px] font-black uppercase tracking-[0.8em] text-[#CBA35C] italic text-right pr-12">REWARDS PORTFOLIO</div>
            </div>

            {/* Milestone Grid - Edge-to-Edge */}
            <div className="space-y-10 w-full mx-auto pb-48 px-2 md:px-0">
               {loading ? (
                  <div className="text-center py-32 bg-zinc-50/50 rounded-[4rem]">
                     <div className="inline-block w-16 h-16 border-[6px] border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin"></div>
                     <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Loading Elite Slabs...</p>
                  </div>
               ) : (
                  slabs.map((slab) => (
                     <SlabCard key={slab.id} slab={slab} />
                  ))
               )}
            </div>

            {/* Global CTA - Expanded & Refined */}
            <div className="mt-24 relative group font-body max-w-5xl mx-auto text-center md:text-left">
               <div className="absolute inset-0 bg-[#CBA35C] rounded-[3rem] blur-3xl opacity-5"></div>
               <div className="relative bg-zinc-900 p-16 md:p-24 rounded-[3rem] text-center overflow-hidden border border-white/5 shadow-2xl">
                  <div className="max-w-3xl mx-auto space-y-8 relative z-10 text-center">
                     <h2 className="text-3xl md:text-5xl font-headline font-black italic uppercase text-white tracking-widest leading-[0.8]">
                        SCALE <br />
                        THROUGH <span className="text-[#CBA35C]">LEGACY.</span>
                     </h2>
                     <p className="text-zinc-500 text-lg font-medium italic leading-relaxed opacity-70">
                        Instant elite validation for Sona Cereal market leaders. Start your journey today.
                     </p>
                     <div className="pt-6">
                        <Link href="/" className="inline-flex items-center gap-8 bg-[#CBA35C] text-black px-12 py-5 rounded-2xl font-headline font-black text-xl uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl">
                           Enter Portal
                           <span className="material-symbols-outlined text-4xl">east</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function SlabCard({ slab }: { slab: any }) {
   const [open, setOpen] = useState(false);
   const rewards = [slab.giftA, slab.giftB, slab.giftC, slab.giftD].filter(Boolean);

   return (
      <div className="flex flex-col gap-4">
         <div
            className={`group bg-white rounded-[3.5rem] lg:rounded-full border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)] py-8 lg:py-4 px-8 md:px-16 lg:px-24 relative overflow-hidden transition-all hover:shadow-[0_45px_90px_-25px_rgba(203,163,92,0.1)] hover:border-[#CBA35C]/20 duration-500 w-full z-20 ${open ? 'border-[#CBA35C]/40' : ''}`}
         >
            {/* High-Performance Top Lighting */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CBA35C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            {/* Status Beacon - Compact Edition */}
            {slab.target >= 15000 && (
               <div className="absolute top-0 right-24 md:right-48 py-2 px-6 bg-zinc-900 text-[#CBA35C] font-black text-[9px] uppercase tracking-[0.4em] rounded-b-[1.25rem] italic flex items-center gap-3 z-20 shadow-2xl border-x border-b border-white/10">
                  <div className="relative flex h-1.5 w-1.5">
                     <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CBA35C] opacity-75"></div>
                     <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#CBA35C]"></div>
                  </div>
                  SLAB ELITE
               </div>
            )}

            <div className="flex flex-col lg:grid lg:grid-cols-12 items-center w-full relative z-10 gap-10 lg:gap-8">
               {/* Tier Specification */}
               <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left relative lg:pr-12 lg:scale-90 lg:origin-left">
                  <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-[0.8em] mb-1 opacity-40 italic">SLAB</span>
                  <div className="relative inline-block scale-90 lg:scale-100">
                     <h3 className="text-6xl lg:text-7xl font-headline font-black text-zinc-900/[0.04] italic leading-none select-none">
                        0{slab.level}
                     </h3>
                     <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl lg:text-5xl font-headline font-black text-zinc-900 italic tracking-tighter">
                        {slab.level}
                     </span>
                  </div>
               </div>

               {/* Milestone Configuration */}
               <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-0 lg:px-8 lg:scale-90 lg:origin-left">
                  <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-[0.8em] mb-1 opacity-40 italic">STAKE</span>
                  <div className="flex items-baseline gap-1 group-hover:translate-x-4 transition-transform duration-1000 scale-90 lg:scale-100">
                     <span className="text-5xl lg:text-6xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter drop-shadow-lg">
                        {slab.target}
                     </span>
                     <span className="text-[#CBA35C] text-[9px] font-black uppercase tracking-widest italic ml-1">QTL</span>
                  </div>
               </div>

               {/* Reward Dropdown Action */}
               <div className="lg:col-span-6 flex flex-col items-center lg:items-end pt-0 lg:pl-16 relative w-full lg:w-auto">
                  <button
                     onClick={() => setOpen(!open)}
                     className={`flex items-center justify-between lg:justify-center gap-6 px-10 py-3.5 rounded-full font-headline font-black italic uppercase tracking-[0.2em] transition-all duration-500 border group w-full lg:w-auto ${open ? 'bg-zinc-900 text-[#CBA35C] border-[#CBA35C]' : 'bg-transparent text-zinc-400 border-zinc-100 hover:border-[#CBA35C] hover:text-[#CBA35C] hover:bg-zinc-50'}`}
                  >
                     <span className="text-[10px] sm:text-xs">VIEW GIFTS</span>
                     <div className="flex items-center gap-2 border-l border-current pl-4 ml-2 opacity-50">
                        <span className="text-[10px]">{rewards.length}</span>
                        <svg 
                           className={`w-4 h-4 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </button>
               </div>
            </div>

            {/* Background Vector Motif */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#CBA35C]/[0.02] rounded-full blur-[80px] pointer-events-none group-hover:bg-[#CBA35C]/[0.05] transition-all duration-1000"></div>
         </div>

         {/* Simple Portfolio Menu - Mobile Optimized */}
         {open && (
            <div 
               className="animate-in fade-in slide-in-from-top-2 duration-300 bg-zinc-900 rounded-[2.5rem] p-6 md:p-8 lg:p-10 border border-white/5 shadow-2xl relative overflow-hidden -mt-8 pt-16 z-0"
            >
               <div className="relative z-10 w-full">
                  <div className="flex flex-col gap-3 lg:gap-4">
                     {rewards.map((reward, rIdx) => (
                        <React.Fragment key={rIdx}>
                           <div className="flex items-center gap-3 cursor-default">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#CBA35C] shrink-0"></span>
                              <h4 className="text-base lg:text-xl font-headline font-black italic uppercase tracking-tighter text-[#CBA35C] leading-snug">
                                 {reward}
                              </h4>
                           </div>
                           {rIdx < rewards.length - 1 && (
                              <div className="flex items-center pl-4 py-0.5">
                                 <span className="text-zinc-600 text-[8px] lg:text-[9px] font-black italic uppercase tracking-[0.4em]">OR</span>
                              </div>
                           )}
                        </React.Fragment>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
