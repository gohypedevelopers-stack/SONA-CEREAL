"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RedeemPage() {
   const [phone, setPhone] = useState("");
   const [userData, setUserData] = useState<any>(null);
   const [error, setError] = useState("");
   const [searched, setSearched] = useState(false);
   const [selectedGift, setSelectedGift] = useState<string | null>(null);

   const checkStatus = () => {
      const submissions = JSON.parse(localStorage.getItem("sona_submissions") || "[]");
      const sanitizedPhoneInput = phone.replace(/\D/g, "");
      const user = [...submissions].reverse().find((s: any) => {
         const sanitizedStored = s.phone.replace(/\D/g, "");
         return sanitizedStored === sanitizedPhoneInput;
      });

      setSearched(true);
      if (user) {
         setUserData(user);
         setError("");
         setSelectedGift(user.claimedGift || null);
      } else {
         setError("No registration found with this phone number.");
         setUserData(null);
      }
   };

   useEffect(() => {
      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         const sanitizedStored = storedPhone.replace(/\D/g, "");
         setPhone(storedPhone);
         const submissions = JSON.parse(localStorage.getItem("sona_submissions") || "[]");
         const user = [...submissions].reverse().find((s: any) => {
            const storedNum = s.phone.replace(/\D/g, "");
            return storedNum === sanitizedStored;
         });
         if (user) {
            setUserData(user);
            setSearched(true);
            setSelectedGift(user.claimedGift || null);
         }
      }
   }, []);

   const getSlabData = (capacity: string) => {
      switch (capacity) {
         case "200": return {
            level: "01", target: "200",
            giftA: "MICROWAVE", giftAImg: "https://images.unsplash.com/photo-1574269909861-12bf6019551c?q=80&w=500&auto=format&fit=crop",
            giftB: "JBL SPEAKER", giftBImg: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop"
         };
         case "500": return {
            level: "02", target: "500",
            giftA: "SMART TV", giftAImg: "/reward-tv.png",
            giftB: "EXECUTIVE SOFA", giftBImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500&auto=format&fit=crop"
         };
         case "1000": return {
            level: "03", target: "1000",
            giftA: "IPHONE 16 PRO", giftAImg: "/reward-iphone.png",
            giftB: "DOUBLE DOOR FRIDGE", giftBImg: "https://images.unsplash.com/photo-1571175439180-dd0b60b731dd?q=80&w=500&auto=format&fit=crop"
         };
         case "2500": return {
            level: "04", target: "2500",
            giftA: "TVS APACHE", giftAImg: "/reward-bike.png",
            giftB: "25G GOLD", giftBImg: "/reward-gold.png"
         };
         default: return { level: "--", target: capacity || "0", giftA: "PENDING", giftAImg: "", giftB: "VALIDATION", giftBImg: "" };
      }
   };

   const getGiftOptions = (capacity: string) => {
      const data = getSlabData(capacity);
      if (!data.giftAImg) return [];
      return [
         { name: data.giftA, img: data.giftAImg },
         { name: data.giftB, img: data.giftBImg }
      ];
   };

   const handleGiftSelect = (giftName: string) => {
      if (!userData || selectedGift) return;
      const submissions = JSON.parse(localStorage.getItem("sona_submissions") || "[]");
      const updatedSubmissions = submissions.map((s: any) =>
         (s.phone === userData.phone && s.id === userData.id)
            ? { ...s, claimedGift: giftName, status: 'claimed' }
            : s
      );
      localStorage.setItem("sona_submissions", JSON.stringify(updatedSubmissions));
      setSelectedGift(giftName);
      setUserData({ ...userData, claimedGift: giftName, status: 'claimed' });
   };

   return (
      <div className="bg-white pb-24 font-body">
         {/* SPACED HIGH-OCTANE HERO SECTION */}
         <section className="relative min-h-[500px] flex items-center overflow-hidden pt-44 pb-12" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f4f1ea 100%)" }}>
            <div className="container mx-auto px-6 relative z-10">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-zinc-200 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Step-by-Step Success</span>
                     </div>

                     <div className="space-y-1">
                        <h1 className="font-headline font-black text-6xl md:text-[90px] italic uppercase leading-[0.75] tracking-tighter text-zinc-950">
                           HOW TO
                        </h1>
                        <h1 className="font-headline font-black text-6xl md:text-[90px] italic uppercase leading-[0.75] tracking-tighter text-[#CBA35C]">
                           REDEEM
                        </h1>
                     </div>

                     <p className="text-zinc-500 font-medium text-lg md:text-xl leading-relaxed max-w-lg italic">
                        Turn your sales achievement into high-octane luxury rewards. Built for speed and precision.
                     </p>

                     <div className="flex flex-wrap gap-4 mt-8">
                        <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-lg flex flex-col min-w-[140px]">
                           <span className="text-2xl font-headline font-black text-zinc-900 uppercase italic leading-none">INSTANT</span>
                           <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-2">UPI VALIDATION</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-lg flex flex-col min-w-[140px]">
                           <span className="text-2xl font-headline font-black text-zinc-900 uppercase italic leading-none">24/7</span>
                           <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-2">SUPPORT PORTAL</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative group lg:block hidden">
                     {/* The streamlined overlapping visual ensemble */}
                     <div className="relative w-full aspect-[4/3] max-w-[650px] ml-auto">

                        {/* Main Backdrop / Bike */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-[4.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[8px] border-white z-20">
                           <img src="/reward-bike.png" className="w-full h-full object-cover" alt="Elite Rewards" />
                           <div className="absolute top-10 left-10 opacity-30">
                              <span className="font-headline font-black text-2xl text-white tracking-tighter leading-none block">DIGITAL<br />ATELIER</span>
                           </div>
                        </div>

                        {/* Top Right Float: Tech Card */}
                        <div className="absolute top-[-2%] right-[-2%] w-[38%] bg-white p-4 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] z-30 transform rotate-6">
                           <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-3 border border-zinc-50 bg-zinc-100">
                              <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Elite Tech Bundle" />
                           </div>
                           <div className="text-center pb-1">
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-900">TECH BUNDLE</span>
                           </div>
                        </div>

                        {/* Bottom Left Float: Gold Card */}
                        <div className="absolute bottom-[2%] left-[-5%] w-[35%] bg-white p-4 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] z-30 transform -rotate-6">
                           <div className="aspect-square rounded-[1.8rem] overflow-hidden mb-3 border border-zinc-50">
                              <img src="/reward-gold.png" className="w-full h-full object-cover" alt="Achievement Gold" />
                           </div>
                           <div className="text-center pb-1">
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CBA35C]">ACHIEV. GOLD</span>
                           </div>
                        </div>

                        {/* Soft Glow Shapes */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-[#CBA35C]/5 rounded-full blur-[100px] -z-10"></div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* DASHBOARD SECTION */}
         <section className="py-20 bg-white relative z-10">
            <div className="container mx-auto px-6 max-w-[1440px]">
               <div className="w-full">
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
                  ) : userData ? (
                     <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
                        {/* ULTRA-SLIM DASHBOARD COMMAND ROW */}
                        <div className="bg-white rounded-full border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] p-3 px-12 relative overflow-hidden group w-full border-b-2">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-[#CBA35C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                           <div className="grid grid-cols-12 items-center gap-6 relative z-10 py-1">
                              <div className="col-span-1 border-r border-zinc-50 pr-6">
                                 <span className="text-[#CBA35C] text-[8px] font-black uppercase tracking-[0.3em] block mb-1 scale-75 origin-left">Level</span>
                                 <h3 className="text-6xl font-headline font-black text-zinc-50 italic leading-none opacity-50">{getSlabData(userData.capacity).level}</h3>
                              </div>
                              <div className="col-span-3 text-center border-r border-zinc-50 px-6">
                                 <span className="text-[#CBA35C] text-[8px] font-black uppercase tracking-[0.3em] block mb-1">Milestone Target</span>
                                 <div className="flex items-center justify-center gap-1">
                                    <span className="text-7xl font-headline font-black text-zinc-900 italic leading-none tracking-tighter">{getSlabData(userData.capacity).target}</span>
                                    <span className="text-zinc-300 text-[10px] font-black uppercase mt-6 ml-1">QTL</span>
                                 </div>
                              </div>
                              <div className="col-span-5 flex items-center justify-center gap-12 px-6 border-r border-zinc-50">
                                 <div className="flex flex-col items-center gap-1">
                                    <div className={`w-14 h-14 rounded-2xl overflow-hidden bg-zinc-50 border transition-all duration-500 flex items-center justify-center p-2 relative 
                                       ${selectedGift === getSlabData(userData.capacity).giftA ? 'border-[#CBA35C] shadow-lg ring-4 ring-[#CBA35C]/5' : 'border-zinc-100'}
                                    `}>
                                       <img src={getSlabData(userData.capacity).giftAImg} alt="Gift A" className="w-full h-full object-contain" />
                                       {selectedGift === getSlabData(userData.capacity).giftA && (
                                          <div className="absolute inset-0 bg-[#CBA35C]/10 flex items-center justify-center">
                                             <div className="bg-[#CBA35C] text-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined font-black text-sm">check</span>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${selectedGift === getSlabData(userData.capacity).giftA ? 'text-[#CBA35C]' : 'text-zinc-600'}`}>
                                       {getSlabData(userData.capacity).giftA}
                                    </span>
                                 </div>
                                 <span className="text-zinc-200 text-[9px] font-black italic tracking-widest">— OR —</span>
                                 <div className="flex flex-col items-center gap-1">
                                    <div className={`w-14 h-14 rounded-2xl overflow-hidden bg-zinc-50 border transition-all duration-500 flex items-center justify-center p-2 relative 
                                       ${selectedGift === getSlabData(userData.capacity).giftB ? 'border-[#CBA35C] shadow-lg ring-4 ring-[#CBA35C]/5' : 'border-zinc-100'}
                                    `}>
                                       <img src={getSlabData(userData.capacity).giftBImg} alt="Gift B" className="w-full h-full object-contain" />
                                       {selectedGift === getSlabData(userData.capacity).giftB && (
                                          <div className="absolute inset-0 bg-[#CBA35C]/10 flex items-center justify-center">
                                             <div className="bg-[#CBA35C] text-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined font-black text-sm">check</span>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${selectedGift === getSlabData(userData.capacity).giftB ? 'text-[#CBA35C]' : 'text-zinc-600'}`}>
                                       {getSlabData(userData.capacity).giftB}
                                    </span>
                                 </div>
                              </div>
                              <div className="col-span-3 text-center px-6">
                                 <div className={`inline-flex px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-md ${userData.status === 'claimed' ? 'bg-[#CBA35C] text-black shadow-[#CBA35C]/10' :
                                    userData.status === 'accepted' ? 'bg-green-500 text-white shadow-green-100' :
                                       userData.status === 'pending' ? 'bg-zinc-100 text-zinc-500' :
                                          'bg-red-50 text-red-500'
                                    }`}>
                                    {userData.status === 'claimed' ? 'CLAIMED' : userData.status || 'PENDING'}
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* GIFT SELECTION GRID */}
                        {(userData.status === 'accepted') && !selectedGift && (
                           <div className="space-y-12 py-10 animate-in fade-in duration-1000">
                              <div className="text-center space-y-4">
                                 <h3 className="font-headline font-black text-4xl md:text-7xl italic uppercase text-zinc-900 tracking-tighter">SELECT YOUR <span className="text-[#CBA35C]">GIFT.</span></h3>
                                 <p className="text-zinc-500 font-medium text-lg italic tracking-widest uppercase">Verified Milestone. Choose your official reward portfolio choice.</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                                 {getGiftOptions(userData.capacity).map((gift) => (
                                    <button key={gift.name} onClick={() => handleGiftSelect(gift.name)} className="group relative p-6 rounded-[4rem] border-2 border-zinc-100 bg-zinc-50 hover:border-[#CBA35C]/50 hover:bg-white transition-all duration-500 shadow-xl overflow-hidden">
                                       <div className="aspect-square rounded-[3.5rem] overflow-hidden mb-8 relative bg-white flex items-center justify-center p-8">
                                          <img src={gift.img} alt={gift.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                                       </div>
                                       <div className="pb-10 text-center space-y-3">
                                          <h4 className="text-3xl font-headline font-black uppercase italic leading-none tracking-tight">{gift.name}</h4>
                                          <span className="block text-[8px] font-black uppercase tracking-[0.5em] opacity-40">Milestone Selection</span>
                                       </div>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        )}

                        <div className="text-center pt-8">
                           <button onClick={() => { setSearched(false); setUserData(null); setSelectedGift(null); }} className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline">Return to Main Dashboard</button>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center p-24 bg-zinc-50 rounded-[4rem] border-2 border-dashed border-zinc-200">
                        <p className="text-zinc-400 font-headline font-black text-3xl uppercase italic mb-8 tracking-tighter">No Active Registration Record Found.</p>
                        <button onClick={() => setSearched(false)} className="text-[#CBA35C] font-black text-[10px] uppercase tracking-[0.5em] underline">Try Different Number</button>
                     </div>
                  )}
               </div>
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
                  {[
                     { wt: "200", sale: "11L", gift: "MICROWAVE / JBL", img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop" },
                     { wt: "500", sale: "27.5L", gift: "SMART TV / SOFA", img: "/reward-tv.png" },
                     { wt: "1000", sale: "55L", gift: "IPHONE 16 PRO / FRIDGE", img: "/reward-iphone.png" },
                     { wt: "2500", sale: "1.37C", gift: "BIKE / 25G GOLD", img: "/reward-bike.png" },
                  ].map((slab) => (
                     <div key={slab.wt} className="group p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 hover:bg-white transition-all text-center flex flex-col items-center">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-white shadow-xl flex items-center justify-center p-4 text-center">
                           <img src={slab.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={slab.wt} />
                        </div>
                        <h4 className="text-3xl font-headline font-black text-zinc-900 italic uppercase leading-none mb-1">{slab.wt} <span className="text-[10px] font-bold text-zinc-400">QTL</span></h4>
                        <p className="text-[8px] font-black text-[#CBA35C] uppercase tracking-widest mb-4">Target: ₹{slab.sale}</p>
                        <span className="text-[9px] font-black text-zinc-950 uppercase tracking-widest border-t border-zinc-100 pt-4 w-full">{slab.gift}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
