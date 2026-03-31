"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SLAB_DATA = [
  { weight: 200, sale: "11,00,000", support: "12,000", pct: "1.1%", items: ["Microwave", "JBL SPEAKER"], color: "border-zinc-100" },
  { weight: 300, sale: "16,50,000", support: "19,500", pct: "1.2%", items: ["TABLET", "AIR PURIFIER"], color: "border-zinc-100" },
  { weight: 500, sale: "27,50,000", support: "37,500", pct: "1.4%", items: ["NOTHING PHONE", "SMART TV"], color: "border-zinc-100" },
  { weight: 750, sale: "41,25,000", support: "60,000", pct: "1.5%", items: ["LAPTOP ACER", "CANON DSLR"], color: "border-zinc-900" },
  { weight: 1000, sale: "55,00,000", support: "90,000", pct: "1.6%", items: ["IPHONE 16 PRO", "DOUBLE DOOR FRIDGE"], color: "border-primary" },
  { weight: 1250, sale: "68,75,000", support: "1,25,000", pct: "1.8%", items: ["TVS APACHE BIKE"], color: "border-primary" },
  { weight: 1500, sale: "82,50,000", support: "1,65,000", pct: "2.0%", items: ["10 GM GOLD COIN 22K"], color: "border-primary" },
  { weight: 1750, sale: "96,25,000", support: "2,10,000", pct: "2.2%", items: ["12 GM GOLD 22K"], color: "border-primary" },
  { weight: 2000, sale: "1,10,00,000", support: "2,60,000", pct: "2.4%", items: ["18 GM GOLD 22K"], color: "border-primary" },
  { weight: 2500, sale: "1,37,50,000", support: "3,75,000", pct: "2.7%", items: ["25 GM GOLD 22K"], color: "border-primary" },
];

export default function MilestonesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <div className="max-w-4xl mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-4 py-2 rounded-full mb-6 italic border border-white/10 shadow-xl">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">Sona Elite Tiers 2025</span>
          </div>
          <h1 className="font-headline font-black text-4xl md:text-[4.5rem] italic uppercase text-zinc-900 leading-none tracking-tight mb-8">
            REWARD <br />
            <span className="text-primary">ARCHITECTURE.</span>
          </h1>
          <p className="text-zinc-600 text-xl max-w-2xl font-medium leading-relaxed italic">
            A dual-trigger milestone system designed for high-performance retailers. Scales with both sales volume and purchase value milestones.
          </p>
        </div>

        {/* Legend / Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:bg-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">scale</span>
              <h4 className="font-headline font-black uppercase text-zinc-900 mb-2">Weight Trigger</h4>
              <p className="text-zinc-500 text-sm italic">Minimum rice weight in WT units to unlock the specific slab reward.</p>
           </div>
           <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:bg-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">payments</span>
              <h4 className="font-headline font-black uppercase text-zinc-900 mb-2">Sale Amount</h4>
              <p className="text-zinc-500 text-sm italic">Aggregate purchase value milestone required for valid slab activation.</p>
           </div>
           <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:bg-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">military_tech</span>
              <h4 className="font-headline font-black uppercase text-zinc-900 mb-2">ROI Percentage</h4>
              <p className="text-zinc-500 text-sm italic">Exclusive benefit multiplier that scales with your market performance.</p>
           </div>
        </div>

        {/* Slab Performance Grid */}
        <div className="space-y-6">
          {/* Legend / Table Header (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-6 px-12 py-6 bg-zinc-900 rounded-[2rem] border border-zinc-900 text-white items-center shadow-2xl">
            <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-primary">ELITE SLAB</div>
            <div className="col-span-2 text-[10px] font-black uppercase tracking-widest">MIN. WEIGHT</div>
            <div className="col-span-2 text-[10px] font-black uppercase tracking-widest">SALE AMOUNT</div>
            <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-primary">SUPP. VALUE</div>
            <div className="col-span-1 text-[10px] font-black uppercase tracking-widest">RATE</div>
            <div className="col-span-4 text-[10px] font-black uppercase tracking-widest">PREMIUM GIFTS</div>
          </div>

          {/* Slabs */}
          {SLAB_DATA.map((slab, idx) => (
            <div 
              key={idx} 
              className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-8 lg:p-12 bg-white rounded-[2.5rem] border-2 ${slab.color === 'border-primary' ? 'border-primary shadow-xl shadow-primary/5' : 'border-zinc-100 shadow-sm'} transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-1 relative overflow-hidden`}
            >
              {idx >= 4 && (
                 <div className="absolute top-0 right-0 py-2 px-8 bg-black text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-bl-3xl italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    High Altitude Tier
                 </div>
              )}
              
              <div className="col-span-1">
                <span className="text-6xl font-headline font-black italic text-zinc-100 group-hover:text-primary transition-colors leading-none tracking-tighter">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <div className="col-span-2">
                 <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Milestone Weight</div>
                 <div className="text-4xl font-headline font-black italic uppercase text-zinc-900">
                    {slab.weight}<span className="text-xs font-bold text-zinc-400 ml-1">WT</span>
                 </div>
              </div>

              <div className="col-span-2">
                 <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Purchase Target</div>
                 <div className="text-2xl font-headline font-black italic uppercase text-zinc-900 whitespace-nowrap">₹{slab.sale}</div>
              </div>

              <div className="col-span-2">
                 <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Support Value</div>
                 <div className="text-2xl font-headline font-black italic text-primary">₹{slab.support}</div>
              </div>

              <div className="col-span-1">
                 <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Benefit Rate</div>
                 <div className="text-2xl font-headline font-black italic text-zinc-900">{slab.pct}</div>
              </div>

              <div className="col-span-4 pl-0 lg:pl-10 border-l-0 lg:border-l-4 border-zinc-100 group-hover:border-primary transition-colors">
                 <div className="lg:hidden text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 mt-6">Assured Rewards Portfolio</div>
                 <div className="flex flex-wrap gap-3 items-center">
                    {slab.items.map((item, i) => (
                      <React.Fragment key={i}>
                        <span className="px-4 py-2 bg-zinc-900 text-white border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-[0.1em] group-hover:bg-primary group-hover:text-black transition-all shadow-lg italic">
                           {item}
                        </span>
                        {i < slab.items.length - 1 && (
                          <span className="text-[10px] font-black text-zinc-300 italic">OR</span>
                        )}
                      </React.Fragment>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Performance CTA */}
        <div className="mt-24 bg-zinc-900 p-12 md:p-32 rounded-[4rem] text-center overflow-hidden relative shadow-2xl border border-white/5">

          
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-[6rem] font-headline font-black italic uppercase text-white tracking-widest leading-none drop-shadow-2xl">
               READY <br />
               TO <span className="text-primary italic">SCALE?</span>
            </h2>
            <p className="text-zinc-400 text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
               Calculate your trajectory and start injecting sales artifacts into the Sona Portal for instant validation and elite reward redemption.
            </p>
            <div className="flex justify-center pt-8">
              <Link href="/" className="group flex items-center gap-6 text-white hover:text-primary transition-all p-4 active:scale-95">
                <span className="font-headline font-black text-2xl md:text-5xl uppercase tracking-widest italic">Enter Portal</span>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-4xl md:text-6xl font-black transition-transform group-hover:translate-x-2">arrow_forward</span>
                </div>
              </Link>
            </div>
            <div className="pt-12 flex justify-center gap-12 border-t border-white/5">
                <div className="text-left">
                    <span className="block text-white font-headline font-black text-2xl italic tracking-tighter leading-none">100%</span>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Instant Validation</span>
                </div>
                <div className="text-left border-l border-white/10 pl-12">
                    <span className="block text-white font-headline font-black text-2xl italic tracking-tighter leading-none">REALTIME</span>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Dashboard Sync</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
