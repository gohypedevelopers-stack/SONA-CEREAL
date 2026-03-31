"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
   const [step, setStep] = React.useState(1);
   const totalSteps = 3;
   const progress = (step / totalSteps) * 100;

   // Handle smooth scroll to form
   const scrollToRegistration = () => {
      const element = document.getElementById("registration-section");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div className="bg-white">
         {/* Simple, High-Impact Hero Section */}
         <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
            {/* Minimalist Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f9f9f9_0%,transparent_70%)]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-24 text-center">
               <div className="max-w-5xl mx-auto space-y-12">
                  <div className="inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-2 rounded-full border border-white/10 shadow-2xl animate-fade-in mx-auto">
                     <span className="w-2 h-2 bg-[#CBA35C] rounded-full animate-pulse"></span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Sona Retailer Hub</span>
                  </div>

                  <div className="space-y-4">
                     <h1 className="font-headline font-black text-4xl md:text-[4.5rem] leading-none tracking-tight italic uppercase text-zinc-900">
                        SONA <br />
                        <span className="text-[#CBA35C]">CEREAL.</span>
                     </h1>
                     <p className="font-headline font-bold text-sm md:text-xl uppercase tracking-[0.3em] text-zinc-400 italic">
                        Premium Rewards <span className="text-zinc-900">Program</span> 2025
                     </p>
                  </div>

                  <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed italic">
                     Access the elite rewards ecosystem designed for Sona Cereal market leaders. Register your performance milestones and unlock exclusive lifestyle assets.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                     <button
                        onClick={scrollToRegistration}
                        className="bg-[#CBA35C] text-black px-10 py-5 rounded-full font-headline font-black text-lg uppercase tracking-[0.1em] shadow-2xl shadow-[#CBA35C]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                     >
                        Start Registration
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                     </button>
                     <Link
                        href="/milestones"
                        className="bg-white text-zinc-900 px-10 py-5 rounded-full font-headline font-black text-lg uppercase tracking-[0.1em] border-2 border-zinc-100 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
                     >
                        View Slabs
                        <span className="material-symbols-outlined text-xl">account_tree</span>
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Essential Milestone Snapshot */}
         <section className="py-12 bg-white flex justify-center border-t border-zinc-100">
            <div className="flex gap-16 md:gap-32 items-center overflow-x-auto px-6 no-scrollbar py-4">
               {[
                  { label: "Active Retailers", val: "10K+" },
                  { label: "Rewards Tier", val: "Elite" },
                  { label: "Validation", val: "Instant" }
               ].map(stat => (
                  <div key={stat.label} className="text-center shrink-0">
                     <span className="block text-4xl font-headline font-black text-zinc-900 italic tracking-tighter">{stat.val}</span>
                     <span className="text-[10px] font-black text-[#CBA35C] uppercase tracking-[0.3em]">{stat.label}</span>
                  </div>
               ))}
            </div>
         </section>

         {/* Registration Section - Streamlined to 3 Steps */}
         <section id="registration-section" className="py-24 bg-zinc-50 border-y border-zinc-100 scroll-mt-24">
            <div className="container mx-auto px-0 md:px-6">
               <div className="grid lg:grid-cols-12 gap-0 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] md:rounded-[4rem] overflow-hidden bg-white border border-zinc-200 min-h-[700px]">

                  {/* Sidebar - Desktop Only Branding */}
                  <div className="hidden lg:flex lg:col-span-4 bg-zinc-900 p-12 flex-col justify-between text-white relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-90"></div>
                     <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#CBA35C]/20 rounded-full blur-[100px]"></div>

                     <div className="relative z-10 space-y-12">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-[#CBA35C]"></div>
                              <div className="h-1 w-4 bg-white/20"></div>
                           </div>
                           <h3 className="text-4xl font-headline font-black uppercase leading-tight italic">
                              RETAILER <br />
                              <span className="text-[#CBA35C]">ONBOARDING.</span>
                           </h3>
                           <p className="text-zinc-400 font-medium text-sm">Enter your mission-critical data points for instant validation.</p>
                        </div>

                        <div className="space-y-8">
                           {[
                              { id: 1, label: "Identity Check", sub: "Retailer Details" },
                              { id: 2, label: "Business Info", sub: "Performance Data" },
                              { id: 3, label: "Asset Upload", sub: "Verification" },
                           ].map((s) => (
                              <div key={s.id} className={`flex items-center gap-4 transition-all duration-500 ${step >= s.id ? 'opacity-100 translate-x-1' : 'opacity-30'}`}>
                                 <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black transition-all ${step > s.id ? 'bg-[#CBA35C] border-[#CBA35C] text-black' : step === s.id ? 'bg-white border-white text-black ring-4 ring-white/10' : 'border-white/20 text-white/50'}`}>
                                    {step > s.id ? <span className="material-symbols-outlined text-base">check</span> : `0${s.id}`}
                                 </div>
                                 <div className="hidden sm:block">
                                    <span className={`block text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-[#CBA35C]' : 'text-white/40'}`}>{s.sub}</span>
                                    <span className={`text-lg font-headline font-black uppercase italic leading-none ${step >= s.id ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="relative z-10 pt-12 border-t border-white/10">
                        <div className="flex justify-between items-end mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Validation Progress</span>
                           <span className="text-4xl font-headline font-black italic text-[#CBA35C]">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-[#CBA35C] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(203,163,92,0.4)]" style={{ width: `${progress}%` }}></div>
                        </div>
                     </div>
                  </div>

                  {/* Form Content Area */}
                  <div className="lg:col-span-8 p-8 md:p-24 bg-white relative">

                     {/* Mobile Only Progress Line */}
                     <div className="lg:hidden mb-12 space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-black uppercase tracking-[.25em] text-[#CBA35C] italic">Step 0{step} Progress</span>
                           <span className="text-2xl font-headline font-black italic text-zinc-900">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                           <div className="h-full bg-[#CBA35C] transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                     </div>

                     <div className="mb-12 text-left">
                        <span className="text-[#CBA35C] font-black uppercase tracking-widest text-xs">Phase {step} of 3</span>
                        <h3 className="text-5xl md:text-6xl font-headline font-black uppercase text-zinc-900 mt-2 leading-none italic">
                           {step === 1 ? "IDENTITY" : step === 2 ? "SYSTEMS" : "VALIDATE"}
                        </h3>
                        <div className="w-24 h-2 bg-[#CBA35C] mt-6"></div>
                     </div>

                     <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
                        {step === 1 && (
                           <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
                              <div className="grid md:grid-cols-2 gap-8 md:gap-10 text-left">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">person</span> Propriertor Name
                                    </label>
                                    <input className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400" placeholder="Full name" type="text" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">storefront</span> Shop / Entity Name
                                    </label>
                                    <input className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400" placeholder="Firm name" type="text" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">smartphone</span> Primary Contact
                                    </label>
                                    <input className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400" placeholder="+91 00000 00000" type="tel" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">location_on</span> City / Region
                                    </label>
                                    <input className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400" placeholder="City, State" type="text" />
                                 </div>
                              </div>
                              <div className="flex items-center justify-end pt-10 border-t border-zinc-100">
                                 <button type="button" onClick={() => setStep(2)} className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90">
                                    <span className="font-headline font-black text-sm md:text-lg uppercase tracking-widest italic">Next Section</span>
                                    <div className="w-16 h-16 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#CBA35C] group-hover:bg-[#CBA35C] group-hover:text-black transition-all">
                                       <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </div>
                                 </button>
                              </div>
                           </div>
                        )}

                        {step === 2 && (
                           <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
                              <div className="grid md:grid-cols-2 gap-8 md:gap-10 text-left">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">account_balance_wallet</span> UPI ID / VPA
                                    </label>
                                    <input className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400" placeholder="username@upi" type="text" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm text-[#CBA35C]">reorder</span> Monthly Capacity (WT)
                                    </label>
                                    <select className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium outline-none focus:border-[#CBA35C] appearance-none text-lg text-zinc-900">
                                       <option value="">Select Capacity</option>
                                       <option value="200">200 WT+</option>
                                       <option value="500">500 WT+</option>
                                       <option value="1000">1000 WT+</option>
                                       <option value="2500">2500 WT+</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between pt-10 border-t border-zinc-100">
                                 <button type="button" onClick={() => setStep(step - 1)} className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-all p-4 active:scale-90">
                                    <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-all">
                                       <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                                    </div>
                                    <span className="font-headline font-black text-[10px] md:text-sm uppercase tracking-widest italic">Back</span>
                                 </button>
                                 <button type="button" onClick={() => setStep(3)} className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90">
                                    <span className="font-headline font-black text-sm md:text-lg uppercase tracking-widest italic">Verification</span>
                                    <div className="w-16 h-16 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#CBA35C] group-hover:bg-[#CBA35C] group-hover:text-black transition-all">
                                       <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </div>
                                 </button>
                              </div>
                           </div>
                        )}

                        {step === 3 && (
                           <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
                              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                                 <div className="border-2 border-dashed border-zinc-200 rounded-[3rem] p-8 md:p-12 text-center flex flex-col items-center gap-6 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                       <span className="material-symbols-outlined text-4xl md:text-5xl text-[#CBA35C] font-black">badge</span>
                                    </div>
                                    <div className="space-y-2">
                                       <h4 className="text-xl md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">Aadhar Card</h4>
                                       <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Aadhar Registration</p>
                                    </div>
                                    <label className="px-10 py-4 bg-zinc-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all">
                                       CLICK TO SELECT
                                       <input type="file" className="hidden" />
                                    </label>
                                 </div>

                                 <div className="border-2 border-dashed border-zinc-200 rounded-[3rem] p-8 md:p-12 text-center flex flex-col items-center gap-6 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                       <span className="material-symbols-outlined text-4xl md:text-5xl text-[#CBA35C] font-black">receipt_long</span>
                                    </div>
                                    <div className="space-y-2">
                                       <h4 className="text-xl md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">Invoice</h4>
                                       <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Valid GST / Purchase Invoice</p>
                                    </div>
                                    <label className="px-10 py-4 bg-zinc-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all">
                                       CLICK TO SELECT
                                       <input type="file" className="hidden" />
                                    </label>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between pt-10 border-t border-zinc-100">
                                 <button type="button" onClick={() => setStep(step - 1)} className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-all p-4 active:scale-90">
                                    <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-all">
                                       <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                                    </div>
                                    <span className="font-headline font-black text-[10px] md:text-sm uppercase tracking-widest italic">Back</span>
                                 </button>
                                 <button type="button" className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90">
                                    <span className="font-headline font-black text-sm md:text-lg uppercase tracking-widest italic">Submit</span>
                                    <div className="w-16 h-16 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#CBA35C] group-hover:bg-[#CBA35C] group-hover:text-black transition-all">
                                       <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:translate-x-1">check_circle</span>
                                    </div>
                                 </button>
                              </div>
                           </div>
                        )}
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
