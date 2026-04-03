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

         <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 relative z-10">
            {/* Header Section */}
            <div className="max-w-4xl mb-24 md:mb-32 border-l-8 border-[#CBA35C] pl-8 md:pl-12 bg-zinc-50/50 p-8 md:p-16 rounded-r-3xl md:rounded-r-[4rem] shadow-sm">
               <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-2.5 rounded-full mb-8 md:mb-10 border border-white/10 shadow-2xl">
                  <span className="w-2 h-2 bg-[#CBA35C] rounded-full animate-pulse"></span>
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">Sona Elite Tiers 2025</span>
               </div>
               <h1 className="font-headline font-black text-4xl md:text-[5rem] italic uppercase text-zinc-900 leading-[0.9] md:leading-[0.8] tracking-tighter mb-8 md:mb-10">
                  REWARD <br />
                  <span className="text-[#CBA35C]">ARCHITECTURE.</span>
               </h1>
               <p className="text-zinc-500 text-base md:text-xl max-w-2xl font-medium leading-relaxed italic border-l-4 border-zinc-200 pl-6 md:pl-8 ml-1 md:ml-2 mt-6 md:mt-8">
                  Reach the weight milestones to unlock exclusive assets. Elite validation for Sona Cereal market leaders.
               </p>
            </div>

            {/* Legend / Table Header (Desktop) - Clean & Wide */}
            <div className="hidden lg:grid grid-cols-12 gap-12 px-16 py-10 bg-zinc-900 rounded-[3rem] text-white items-center shadow-2xl mb-12">
               <div className="col-span-2 text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C] italic">Tier Level</div>
               <div className="col-span-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/50 italic">Target Milestone (QUINTAL)</div>
               <div className="col-span-6 text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C] italic text-right pr-6">PREMIUM GIFTS</div>
            </div>

            {/* Milestone Grid */}
            <div className="space-y-6 max-w-6xl mx-auto pb-32 px-4">
               {loading ? (
                  <div className="text-center py-24">
                     <div className="inline-block w-12 h-12 border-4 border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin"></div>
                     <p className="mt-4 text-xs font-black uppercase tracking-widest text-zinc-400">Loading Tiers...</p>
                  </div>
               ) : slabs.length === 0 ? (
                  <div className="text-center py-24 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                     <p className="text-zinc-400 font-headline font-black text-2xl uppercase italic tracking-tighter">No Reward Slabs Configured Yet.</p>
                  </div>
               ) : (
                  slabs.map((slab, idx) => (
                     <div
                        key={slab.id}
                        className="group bg-white rounded-3xl md:rounded-full border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-8 md:py-6 px-8 md:px-16 relative overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] hover:border-[#CBA35C]/30 duration-500"
                     >
                        {/* Elite Tag for higher tiers */}
                        {slab.target >= 750 && (
                           <div className="absolute top-0 right-12 md:right-32 py-1.5 px-6 md:px-10 bg-zinc-900 text-[#CBA35C] font-black text-[9px] uppercase tracking-[0.4em] rounded-b-2xl italic flex items-center gap-2 z-20">
                              <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full animate-pulse"></span>
                              Elite
                           </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 items-center w-full relative z-10 gap-8 md:gap-4">
                           {/* Tier Indicator */}
                           <div className="col-span-1 md:col-span-2 md:border-r border-zinc-100 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                              <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.4em] mb-1.5">SLAB</span>
                              <h3 className="text-5xl md:text-6xl font-headline font-black text-zinc-100 italic leading-none group-hover:text-[#CBA35C]/10 transition-all duration-500">
                                 {slab.level}
                              </h3>
                           </div>

                           {/* Milestone Target */}
                           <div className="col-span-1 md:col-span-3 md:border-r border-zinc-100 md:px-8 flex flex-col items-center md:items-start text-center md:text-left">
                              <span className="text-[#CBA35C] text-[10px] font-black uppercase tracking-[0.4em] mb-1.5 block opacity-60">TARGET</span>
                              <div className="flex items-baseline gap-2 group-hover:translate-x-1 transition-transform duration-500">
                                 <span className="text-5xl md:text-5xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter">{slab.target}</span>
                                 <span className="text-zinc-400 text-xs font-black uppercase">QTL</span>
                              </div>
                           </div>

                           {/* Portfolio Options */}
                           <div className="col-span-1 md:col-span-7 flex flex-col md:flex-row items-center md:justify-end gap-6 md:gap-12 group-hover:translate-x-[-4px] transition-transform duration-500">
                              <div className="flex flex-col items-center md:items-end w-full">
                                 <span className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">PORTFOLIO</span>
                                 <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
                                    <div className="flex items-center gap-4">
                                       <h4 className="text-xl md:text-2xl font-headline font-black italic uppercase leading-none tracking-tight text-zinc-900 group-hover:text-[#CBA35C] transition-all duration-500 whitespace-nowrap">
                                          {slab.giftA}
                                       </h4>
                                    </div>
                                    
                                    <span className="text-zinc-300 text-[11px] font-black italic tracking-[0.1em] uppercase bg-zinc-50 px-3 py-1 rounded-md border border-zinc-100">OR</span>
                                    
                                    <div className="flex items-center gap-4">
                                       <h4 className="text-xl md:text-2xl font-headline font-black italic uppercase leading-none tracking-tight text-zinc-900 group-hover:text-[#CBA35C] transition-all duration-500 whitespace-nowrap">
                                          {slab.giftB}
                                       </h4>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Background Number Accent */}
                        <span className="absolute -bottom-10 right-10 text-[12rem] font-headline font-black text-zinc-50 leading-none select-none -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                           {idx + 1}
                        </span>
                     </div>
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
