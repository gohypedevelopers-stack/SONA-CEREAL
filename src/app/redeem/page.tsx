"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RedeemPage() {
   const [phone, setPhone] = useState("+91 ");
   const [userData, setUserData] = useState<any>(null);
   const [error, setError] = useState("");
   const [searched, setSearched] = useState(false);
   const [selectedGift, setSelectedGift] = useState<string | null>(null);
   const [settings, setSettings] = useState<any>(null);
   const [totalAcceptedQty, setTotalAcceptedQty] = useState(0);
   const [loading, setLoading] = useState(false);
   const [slabs, setSlabs] = useState<any[]>([]);

   const checkStatus = async () => {
      if (phone.length < 14) {
         setError("Please enter a valid 10-digit phone number.");
         return;
      }
      const cleanPhone = phone.replace(/\D/g, '');
      setSearched(true);
      setLoading(true);
      try {
         const [subRes, settingsRes, slabsRes] = await Promise.all([
            fetch(`/api/submissions?phone=${encodeURIComponent(cleanPhone)}`, { cache: 'no-store' }),
            fetch('/api/settings', { cache: 'no-store' }),
            fetch('/api/slabs', { cache: 'no-store' })
         ]);

         const [subData, settingsData, slabsData] = await Promise.all([
            subRes.json(),
            settingsRes.json(),
            slabsRes.json()
         ]);

         setSettings(settingsData);
         setSlabs(Array.isArray(slabsData) ? slabsData.sort((a: any, b: any) => a.target - b.target) : []);

         if (subData.submissions && subData.submissions.length > 0) {
            const acceptedSubs = subData.submissions.filter((s: any) => s.status === 'accepted' || s.status === 'claimed');
            const total = acceptedSubs.reduce((acc: number, s: any) => acc + (parseFloat(s.capacity) || 0), 0);
            setTotalAcceptedQty(total);

            const claimedSub = acceptedSubs.find((s: any) => s.status === 'claimed');
            const baseUser = subData.user || {};
            
            if (claimedSub) {
               setSelectedGift(claimedSub.claimedGift);
               setUserData({ ...baseUser, ...claimedSub, totalQty: total });
            } else {
               setUserData({ ...baseUser, ...subData.submissions[0], totalQty: total });
            }
            setError("");
         } else {
            setError("No active registration found.");
            setUserData(null);
         }
      } catch (err) {
         setError("Connection error.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetch('/api/settings', { cache: 'no-store' }).then(res => res.json()).then(setSettings).catch(console.error);
      fetch('/api/slabs', { cache: 'no-store' }).then(res => res.json()).then(data => {
         setSlabs(Array.isArray(data) ? data.sort((a: any, b: any) => a.target - b.target) : []);
      }).catch(console.error);

      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         setPhone(storedPhone);
         checkStatus();
      }
   }, []);

   const getSlabData = (totalQty: number) => {
      // Priority 1: Manual Override
      if (userData?.overrideSlabId) {
         return slabs.find(s => s.id === userData.overrideSlabId);
      }
      
      // Priority 2: Auto Calculation
      const achievedSlabs = slabs.filter(s => totalQty >= s.target);
      if (achievedSlabs.length === 0) return null;
      return achievedSlabs[achievedSlabs.length - 1];
   };

   const getGiftOptions = (totalQty: number) => {
      const data = getSlabData(totalQty);
      if (!data) return [];
      return [
         { name: data.giftA, img: data.giftAImg },
         { name: data.giftB, img: data.giftBImg },
         { name: data.giftC, img: data.giftCImg },
         { name: data.giftD, img: data.giftDImg }
      ].filter(g => g.name);
   };


   const handleGiftSelect = async (giftName: string) => {
      if (!userData || selectedGift) return;

      try {
         const res = await fetch("/api/submissions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userData.id, claimedGift: giftName })
         });
         const data = await res.json();
         if (data.success) {
            setSelectedGift(giftName);
            setUserData({ ...userData, claimedGift: giftName, status: 'claimed' });
         } else {
            alert("Error: " + (data.error || "Failed to select gift"));
         }
      } catch (err) {
         alert("Network error.");
      }
   };

   return (
      <div className="bg-white pb-24 font-body">
         {/* SPACED HIGH-OCTANE HERO SECTION */}
         <section className="relative md:min-h-[500px] flex items-center overflow-hidden pt-4 md:pt-24 pb-12" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f4f1ea 100%)" }}>
            <div className="container mx-auto px-6 relative z-10">
               <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-6 md:space-y-8">
                     <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-zinc-200 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full"></span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-400">Step-by-Step Success</span>
                     </div>

                     <div className="space-y-1">
                        <h1 className="font-headline font-black text-3xl md:text-[90px] italic uppercase leading-[0.8] md:leading-[0.75] tracking-tighter text-zinc-950">
                           HOW TO
                        </h1>
                        <h1 className="font-headline font-black text-3xl md:text-[90px] italic uppercase leading-[0.8] md:leading-[0.75] tracking-tighter text-[#CBA35C]">
                           REDEEM
                        </h1>
                     </div>

                     <p className="text-zinc-500 font-medium text-base md:text-xl leading-relaxed max-w-lg italic">
                        Turn your sales achievement into high-octane luxury rewards. Built for speed and precision.
                     </p>
                  </div>

                  <div className="relative group lg:block hidden">
                     <div className="relative w-full aspect-[4/3] max-w-[650px] ml-auto">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-[4.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[8px] border-white z-20">
                           <img src="/reward-bike.png" className="w-full h-full object-cover" alt="Elite Rewards" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-[#CBA35C]/5 rounded-full blur-[100px] -z-10"></div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* REDEEM PORTAL SECTION */}
         <section className="py-20 bg-white relative z-10">
            <div className="container mx-auto px-6 max-w-[1440px]">
               <div className="w-full">
                  {!searched ? (
                     <div className="bg-zinc-50 p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] text-center shadow-xl border border-zinc-100 max-w-4xl mx-auto">
                        <h3 className="font-headline font-black text-2xl md:text-6xl italic uppercase text-zinc-900 leading-none tracking-tighter mb-8 md:mb-12 text-center">
                           REDEEM <br />
                           <span className="text-[#CBA35C]">OFFER.</span>
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
                  ) : userData ? (
                     <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">

                        {/* GIFT SELECTION GRID */}
                        {(!settings?.rewardsDistributed) ? (
                           <div className="space-y-12 py-6 md:py-10 animate-in fade-in duration-1000">
                              <div className="bg-zinc-900 border border-[#CBA35C]/30 px-6 py-12 md:p-24 rounded-[3rem] md:rounded-[4rem] text-center space-y-6 md:space-y-10 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35C]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                                 <div className="space-y-4 md:space-y-6 relative z-10">
                                    <h3 className="font-headline font-black text-2xl md:text-8xl italic uppercase text-white tracking-tighter leading-none">
                                       CAMPAIGN <br /><span className="text-[#CBA35C]">IN PROGRESS.</span>
                                    </h3>
                                    <p className="text-[#CBA35C] font-black text-[10px] md:text-xs italic tracking-widest max-w-xl mx-auto opacity-60">
                                       "After 5 months you will get rewarded as per the slabs"
                                    </p>
                                    <p className="text-zinc-400 font-medium text-sm md:text-lg italic max-w-xl mx-auto">
                                       Your verified submissions are being tracked. The reward claim portal will unlock automatically once the campaign duration is complete.
                                    </p>
                                 </div>
                                 <div className="pt-6 md:pt-8 relative z-10">
                                    <button disabled className="group relative bg-zinc-800 text-zinc-500 px-8 md:px-16 py-4 md:py-8 rounded-xl md:rounded-[2.5rem] font-headline font-black uppercase text-sm md:text-2xl tracking-widest cursor-not-allowed border border-white/5 shadow-2xl">
                                       <span className="flex items-center gap-3">
                                          <span className="material-symbols-outlined text-xl md:text-3xl">lock</span>
                                          CLAIM REWARD
                                       </span>
                                       <div className="absolute -top-2 -right-2 bg-[#CBA35C] text-black text-[8px] md:text-[10px] px-2 md:px-4 py-0.5 md:py-1 rounded-full font-black tracking-widest animate-bounce shadow-xl">LOCKED</div>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ) : (
                           <div className="space-y-12 py-10 animate-in fade-in duration-1000">
                              <div className="text-center space-y-4">
                                 <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-ping"></span>
                                    Rewards Unlocked
                                 </div>
                                 <h3 className="font-headline font-black text-3xl md:text-7xl italic uppercase text-zinc-900 tracking-tighter leading-none">
                                    SELECT YOUR <br /><span className="text-[#CBA35C]">ELITE GIFT.</span>
                                    <div className="text-[12px] md:text-sm font-black text-[#CBA35C] tracking-[0.6em] mt-4 opacity-80">
                                       — {getSlabData(totalAcceptedQty)?.level ? `SLAB ${getSlabData(totalAcceptedQty)?.level}` : "NO MILESTONE REACHED"} —
                                    </div>
                                 </h3>

                                 <p className="text-zinc-500 font-medium text-lg italic tracking-widest uppercase">
                                    Based on your total verified quantity of <span className="text-zinc-900 font-black">{totalAcceptedQty} Qtl</span>, you qualify for the slab below.
                                 </p>
                              </div>

                              {!getSlabData(totalAcceptedQty) ? (
                                 <div className="max-w-xl mx-auto p-12 rounded-[4rem] border-2 border-dashed border-zinc-200 bg-zinc-50 text-center space-y-6">
                                    <span className="material-symbols-outlined text-6xl text-zinc-200">workspace_premium</span>
                                    <h4 className="text-2xl font-headline font-black uppercase italic tracking-tighter text-zinc-400">
                                       Sorry, you are not rewarded any gift yet.
                                    </h4>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-loose">
                                       Keep submitting your invoices {slabs[0]?.target ? `to reach the first milestone of ${slabs[0].target} QTL!` : "to reach your first milestone!"}
                                    </p>
                                 </div>
                              ) : selectedGift ? (
                                 <div className="max-w-xl mx-auto p-12 rounded-[4rem] border-4 border-[#CBA35C] bg-zinc-50 text-center space-y-8 animate-in zoom-in-95 duration-500">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CBA35C]">YOUR SELECTION</span>
                                    <div className="aspect-square rounded-[3rem] bg-white flex items-center justify-center p-8 shadow-xl">
                                       {getGiftOptions(totalAcceptedQty).find(g => g.name === selectedGift)?.img ? (
                                          <img src={getGiftOptions(totalAcceptedQty).find(g => g.name === selectedGift)?.img} className="w-full h-full object-contain" alt={selectedGift || ""} />
                                       ) : (
                                          <div className="text-zinc-200">
                                             <span className="material-symbols-outlined text-8xl">card_giftcard</span>
                                          </div>
                                       )}
                                    </div>
                                    <h4 className="text-4xl font-headline font-black uppercase italic tracking-tighter">{selectedGift}</h4>
                                    <div className="bg-green-500 text-white py-4 rounded-2xl font-headline font-black uppercase italic tracking-widest">GIFT CLAIMED</div>
                                 </div>

                              ) : (
                                 <div className={`grid gap-6 md:gap-8 max-w-7xl mx-auto ${getGiftOptions(totalAcceptedQty).length === 1 ? 'grid-cols-1 max-w-xl' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                                    {getGiftOptions(totalAcceptedQty).map((gift) => (
                                       <button 
                                          key={gift.name} 
                                          onClick={() => handleGiftSelect(gift.name)} 
                                          className={`group relative p-8 md:p-10 rounded-[3rem] md:rounded-[4rem] border border-zinc-100 bg-white hover:border-[#CBA35C]/40 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_-20px_rgba(203,163,92,0.15)] overflow-hidden ${getGiftOptions(totalAcceptedQty).length === 1 ? 'ring-2 ring-[#CBA35C]/20' : ''}`}
                                       >
                                          <div className="aspect-square bg-zinc-50/50 rounded-[2.5rem] mb-8 p-10 flex items-center justify-center overflow-hidden border border-zinc-50 relative group-hover:bg-white transition-colors duration-500">
                                             {gift.img ? (
                                                <img src={gift.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={gift.name} />
                                             ) : (
                                                <div className="flex flex-col items-center gap-4 text-zinc-200">
                                                   <span className="material-symbols-outlined text-7xl">card_giftcard</span>
                                                </div>
                                             )}
                                             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                          </div>
                                          
                                          <div className="text-center space-y-3">
                                             <h4 className="text-lg md:text-xl font-headline font-black italic uppercase leading-[1] tracking-tighter text-zinc-900 break-words px-4">
                                                {gift.name}
                                             </h4>
                                             <div className="flex flex-col items-center gap-2">
                                                <div className="h-[1px] w-8 bg-zinc-100"></div>
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">
                                                   ELITE_SELECTION
                                                </span>
                                             </div>
                                          </div>

                                          {/* Hover Indicator */}
                                          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#CBA35C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                       </button>
                                    ))}
                                 </div>

                              )}
                           </div>
                        )}

                        <div className="text-center pt-8">
                           <Link href="/dashboard" className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline mr-8">View Records Portfolio</Link>
                           <button onClick={() => { setSearched(false); setUserData(null); setSelectedGift(null); }} className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline">Use Different Number</button>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center p-24 bg-zinc-50 rounded-[4rem] border-2 border-dashed border-zinc-200">
                        <p className="text-zinc-400 font-headline font-black text-2xl uppercase italic mb-8 tracking-tighter">No Active Registration Found.</p>
                        <Link href="/dashboard" className="inline-block text-[#CBA35C] font-black text-[10px] uppercase tracking-[0.5em] underline">Check Records Archive</Link>
                     </div>
                  )}
               </div>
            </div>
         </section>

         {/* SYNCED BOTTOM GRID */}
         <section className="py-24 bg-white border-t border-zinc-100">
            <div className="container mx-auto px-6">
               <div className="max-w-6xl mx-auto flex justify-between items-end mb-16">
                  <h2 className="font-headline font-black text-5xl md:text-7xl italic uppercase text-zinc-900 leading-[0.85] tracking-tighter text-left">REWARD <br /><span className="text-[#CBA35C]">SLABS.</span></h2>
                  <p className="hidden md:block text-zinc-400 text-right font-medium italic text-lg max-w-xs">A comprehensive portfolio of the assets available at each performance level.</p>
               </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto text-center px-4 md:px-0">
                   {slabs.map((slab) => (
                      <div key={slab.id} className="group p-8 bg-zinc-50/50 rounded-[3rem] border border-zinc-100 hover:bg-white hover:border-[#CBA35C]/20 transition-all duration-500 flex flex-col items-center shadow-sm hover:shadow-xl relative overflow-hidden">
                         <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 bg-white shadow-inner flex items-center justify-center p-8 relative border border-zinc-50">
                            {slab.giftAImg ? (
                               <img src={slab.giftAImg} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={slab.target.toString()} />
                            ) : (
                               <span className="material-symbols-outlined text-zinc-200 text-6xl">card_giftcard</span>
                            )}
                         </div>
                         <div className="space-y-3 w-full text-center">
                            <h4 className="text-lg md:text-xl font-headline font-black text-zinc-900 italic uppercase leading-none tracking-tighter">
                               {slab.target} <span className="text-[#CBA35C] text-[8px] ml-1">QTL</span>
                            </h4>
                            <div className="h-[1px] w-full bg-zinc-100"></div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-loose italic px-6">
                               {[slab.giftA, slab.giftB, slab.giftC, slab.giftD].filter(Boolean).join(' / ')}
                            </p>
                         </div>
                      </div>
                   ))}
                </div>
            </div>
         </section>
      </div>
   );
}
