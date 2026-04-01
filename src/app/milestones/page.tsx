"use client";

import React from "react";
import Link from "next/link";

const SLAB_DATA = [
   { weight: 200, sale: "11,00,000", items: ["Microwave", "JBL SPEAKER"], color: "border-zinc-100" },
   { weight: 300, sale: "16,50,000", items: ["TABLET", "AIR PURIFIER"], color: "border-zinc-100" },
   { weight: 500, sale: "27,50,000", items: ["NOTHING PHONE", "SMART TV"], color: "border-zinc-100" },
   { weight: 750, sale: "41,25,000", items: ["LAPTOP ACER", "CANON DSLR"], color: "border-zinc-900" },
   { weight: 1000, sale: "55,00,000", items: ["IPHONE 16 PRO", "DOUBLE DOOR FRIDGE"], color: "border-primary" },
   { weight: 1250, sale: "68,75,000", items: ["TVS APACHE BIKE"], color: "border-primary" },
   { weight: 1500, sale: "82,50,000", items: ["10 GM GOLD COIN 22K"], color: "border-primary" },
   { weight: 1750, sale: "96,25,000", items: ["12 GM GOLD 22K"], color: "border-primary" },
   { weight: 2000, sale: "1,10,00,000", items: ["18 GM GOLD 22K"], color: "border-primary" },
   { weight: 2500, sale: "1,37,50,000", items: ["25 GM GOLD 22K"], color: "border-primary" },
];

export default function MilestonesPage() {
   return (
      <div className="min-h-screen bg-white font-body selection:bg-[#CBA35C] selection:text-black pb-32">
         {/* Subtle Background Pattern */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
         </div>

         <div className="container mx-auto px-6 pt-32 relative z-10">
            {/* Header Section */}
            <div className="max-w-4xl mb-32 border-l-8 border-[#CBA35C] pl-12 bg-zinc-50/50 p-16 rounded-r-[4rem] shadow-sm">
               <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-2.5 rounded-full mb-10 border border-white/10 shadow-2xl">
                  <span className="w-2 h-2 bg-[#CBA35C] rounded-full animate-pulse"></span>
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">Sona Elite Tiers 2025</span>
               </div>
               <h1 className="font-headline font-black text-4xl md:text-[5rem] italic uppercase text-zinc-900 leading-[0.8] tracking-tighter mb-10">
                  REWARD <br />
                  <span className="text-[#CBA35C]">ARCHITECTURE.</span>
               </h1>
               <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed italic border-l-4 border-zinc-200 pl-8 ml-2 mt-8">
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
            <div className="space-y-3 max-w-[1440px] mx-auto pb-32 px-4">
               {SLAB_DATA.map((slab, idx) => (
                  <div
                     key={idx}
                     className={`group bg-white rounded-full border border-zinc-100 shadow-[0_4px_25px_-10px_rgba(0,0,0,0.04)] py-6 px-16 relative overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] hover:border-[#CBA35C]/30 duration-500 flex items-center`}
                  >
                     {/* Restored High-Altitude Tag - Now a subtle notch */}
                     {idx >= 4 && (
                        <div className="absolute top-0 right-32 py-1.5 px-10 bg-zinc-900 text-[#CBA35C] font-black text-[9px] uppercase tracking-[0.4em] rounded-b-2xl italic flex items-center gap-2 z-20">
                           <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full animate-pulse"></span>
                           Elite
                        </div>
                     )}

                     <div className="grid grid-cols-12 items-center w-full relative z-10 gap-4">
                        {/* Tier Indicator */}
                        <div className="col-span-2 border-r border-zinc-50 flex flex-col justify-center">
                           <span className="text-[#CBA35C] text-[8px] font-black uppercase tracking-[0.4em] mb-1.5">SLAB</span>
                           <h3 className="text-5xl font-headline font-black text-zinc-100 italic leading-none group-hover:text-zinc-200 transition-all duration-500">
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                           </h3>
                        </div>

                        {/* Milestone Target */}
                        <div className="col-span-3 border-r border-zinc-50 px-8">
                           <span className="text-[#CBA35C] text-[8px] font-black uppercase tracking-[0.4em] mb-1.5 block opacity-60">TARGET</span>
                           <div className="flex items-baseline gap-2 group-hover:translate-x-1 transition-transform duration-500">
                              <span className="text-5xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter">{slab.weight}</span>
                              <span className="text-zinc-400 text-[11px] font-black uppercase">QTL</span>
                           </div>
                        </div>

                        {/* Portfolio Options */}
                        <div className="col-span-7 flex items-center justify-end gap-12">
                           <div className="text-right">
                              <span className="text-zinc-300 text-[8px] font-black uppercase tracking-[0.4em] mb-2 block">PORTFOLIO</span>
                              <div className="flex items-center gap-5 justify-end">
                                 <h4 className="text-2xl font-headline font-black italic uppercase leading-none tracking-tight text-zinc-900 group-hover:text-[#CBA35C] transition-all duration-500">
                                    {slab.items[0]}
                                 </h4>
                                 {slab.items[1] && (
                                    <>
                                       <span className="text-zinc-400 text-[10px] font-black italic tracking-[0.2em] uppercase px-4">OR</span>
                                       <h4 className="text-2xl font-headline font-black italic uppercase leading-none tracking-tight text-zinc-900 group-hover:text-[#CBA35C] transition-all duration-500">
                                          {slab.items[1]}
                                       </h4>
                                    </>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Global CTA - Expanded & Refined */}
            <div className="mt-24 relative group font-body max-w-5xl mx-auto">
               <div className="absolute inset-0 bg-[#CBA35C] rounded-[3rem] blur-3xl opacity-5"></div>
               <div className="relative bg-zinc-900 p-16 md:p-24 rounded-[3rem] text-center overflow-hidden border border-white/5 shadow-2xl">
                  <div className="max-w-3xl mx-auto space-y-8 relative z-10">
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
