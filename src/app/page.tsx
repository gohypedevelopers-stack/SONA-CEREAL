"use client";

import React from "react";

export default function HomePage() {
   const [step, setStep] = React.useState(1);
   const [authMode, setAuthMode] = React.useState<"login" | "signup">("login");
   const totalSteps = 4;
   const progress = (step / totalSteps) * 100;

   return (
      <>
         {/* HIGH-IMPACT PROMOTIONAL HERO */}
         <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-white pt-24 pb-8 md:pt-40 lg:pt-0">
            {/* Vibrant Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-amber-400 via-white to-white opacity-40"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-32 hidden lg:block"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/10 blur-[80px] md:blur-[150px] rounded-full pointer-events-none animate-pulse"></div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-6 lg:py-10">
               {/* LEFT SIDE: BRAND & CORE OFFER - SHOULD BE TOP ON MOBILE */}
               <div className="w-full max-w-2xl mx-auto lg:ml-0 animate-in fade-in slide-in-from-left-8 duration-1000 order-1 lg:order-1">
                  <div className="mb-6 lg:mb-8 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
                     <h2 className="text-xl md:text-2xl font-headline font-black uppercase text-zinc-900 tracking-widest flex items-center gap-4 w-full">
                        <span className="shrink-0">SONA CEREAL</span>
                        <div className="h-px flex-1 bg-zinc-200 hidden md:block"></div>
                     </h2>
                     <p className="text-sm md:text-base font-headline font-bold text-zinc-400 uppercase italic tracking-[0.2em] mt-1">Pure Rice From Indian Soil</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center lg:items-end gap-6 mb-6 w-full">
                     <div className="w-40 md:w-48 h-[10rem] md:h-[15rem] bg-white p-4 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-50 shrink-0 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                        <img src="/rice-bag.png" className="w-full h-full object-cover rounded-[1rem]" alt="Sona Cereal Product" />
                     </div>
                     <div className="flex-1 min-w-0 text-center lg:text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-headline font-black uppercase text-zinc-900 leading-[0.85] tracking-tight">
                           MEGA <br />
                           <span className="text-primary italic relative inline-block">
                              REWARDS.
                              <div className="absolute -bottom-2 left-0 w-full h-2 md:h-4 bg-primary/10 -rotate-1 rounded-full -z-10"></div>
                           </span>
                        </h1>
                        <div className="mt-6 inline-flex items-center gap-4 bg-primary px-5 py-2.5 rounded-full shadow-[0_15px_30px_-5px_rgba(128,0,0,0.2)] border-2 border-white animate-bounce-slow">
                           <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                              <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">Assured Gift for Every Retailer</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* RIGHT SIDE: REWARD STACK - SHOULD BE BELOW ON MOBILE */}
               <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200 order-2 lg:order-2 flex justify-center lg:justify-end py-6 lg:py-0">
                  <div className="relative aspect-square w-full max-w-[320px] md:max-w-md lg:max-w-lg">
                     {/* "CHANCE TO WIN" TAG */}
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white px-8 py-3 rounded-full shadow-2xl border-4 border-primary animate-pulse">
                        <span className="text-primary text-sm font-black uppercase tracking-[0.3em] whitespace-nowrap">Chance To Win</span>
                     </div>

                     {/* High-Impact Red Accent Behind Stack */}
                     <div className="absolute inset-x-[-20px] md:inset-x-[-40px] inset-y-[-20px] md:inset-y-[-40px] bg-primary/5 rounded-[4rem] -rotate-6 lg:rotate-3"></div>

                     {/* The Main Stage (Bike) */}
                     <div className="absolute inset-0 bg-white rounded-[3rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white overflow-hidden group ring-1 ring-zinc-50 z-10">
                        <img
                           src="/reward-bike.png"
                           className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[2s] ease-out pt-8 md:pt-12"
                           alt="TVS Apache"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent"></div>
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-primary text-white p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-2xl rotate-12 group-hover:rotate-0 transition-transform text-right">
                           <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 opacity-80">Bumper Prize</span>
                           <span className="text-lg md:text-2xl font-headline font-black italic">TVS RTR 310</span>
                        </div>
                     </div>

                     {/* The Gold Layer */}
                     <div className="absolute -top-6 -left-6 md:-top-12 md:-left-12 w-32 md:h-56 h-32 md:w-56 bg-white/70 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] shadow-2xl border-2 md:border-4 border-white overflow-hidden -rotate-6 hover:rotate-0 transition-transform duration-500 z-20 p-2 md:p-3 ring-1 ring-primary/10">
                        <div className="w-full h-full bg-zinc-50 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative">
                           <img src="/reward-gold.png" className="w-full h-full object-cover" alt="Gold" />
                           <div className="absolute inset-0 flex items-end p-2 md:p-4 bg-gradient-to-t from-primary/20 to-transparent">
                              <span className="text-[10px] md:text-sm font-headline font-black text-primary uppercase">25g Pure Gold</span>
                           </div>
                        </div>
                     </div>

                     {/* The Tech Layer */}
                     <div className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 w-28 md:w-48 h-28 md:h-48 bg-white/70 backdrop-blur-3xl rounded-[1.8rem] md:rounded-[2.5rem] shadow-2xl border-2 md:border-4 border-white overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500 z-20 p-2 md:p-3 ring-1 ring-zinc-50">
                        <div className="w-full h-full bg-zinc-900 rounded-[1.4rem] md:rounded-[1.8rem] overflow-hidden relative">
                           <img src="/reward-iphone.png" className="w-full h-full object-cover opacity-80" alt="iPhone" />
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Registration Section */}
         <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24 -mt-16 lg:-mt-24 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.1)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white min-h-[750px]">
               {/* Sidebar */}
               <div className="lg:col-span-4 bg-primary p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#8b0000]"></div>

                  <div className="relative z-10 space-y-12">
                     <div className="space-y-4">
                        <div className="w-16 h-1 w-12 bg-white flex items-center gap-1">
                           <div className="h-full w-4 bg-white"></div>
                           <div className="h-full w-4 bg-white/40"></div>
                        </div>
                        <h3 className="text-4xl font-headline font-black uppercase leading-tight italic">
                           REGISTRATION <br />
                           <span className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.15)]">PROGRESS.</span>
                        </h3>
                        <p className="text-white/80 font-medium">Complete every step to unlock your potential rewards.</p>
                     </div>

                     <div className="space-y-8">
                        {[
                           { id: 1, label: "Account Access", sub: "Auth Security" },
                           { id: 2, label: "Identity Check", sub: "Retailer Details" },
                           { id: 3, label: "Business Info", sub: "Wholesale Data" },
                           { id: 4, label: "Asset Upload", sub: "Verification" },
                        ].map((s) => (
                           <div key={s.id} className={`flex items-center gap-4 transition-all duration-500 ${step >= s.id ? 'opacity-100 translate-x-1' : 'opacity-40'}`}>
                              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black transition-all ${step > s.id ? 'bg-white border-white text-primary' : step === s.id ? 'bg-white border-white text-primary ring-4 ring-white/20' : 'border-white/20 text-white/50'}`}>
                                 {step > s.id ? <span className="material-symbols-outlined text-base">check</span> : `0${s.id}`}
                              </div>
                              <div>
                                 <span className={`block text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-white/60' : 'text-white/40'}`}>{s.sub}</span>
                                 <span className={`text-lg font-headline font-black uppercase italic leading-none ${step >= s.id ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative z-10 pt-12 border-t border-white/10">
                     <div className="flex justify-between items-end mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Form Completion</span>
                        <span className="text-4xl font-headline font-black italic text-white">{Math.round(progress)}%</span>
                     </div>
                     <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ width: `${progress}%` }}></div>
                     </div>
                  </div>
               </div>

               {/* Form Content Area */}
               <div className="lg:col-span-8 p-12 lg:p-20">
                  <div className="mb-12 text-left">
                     <span className="text-primary font-black uppercase tracking-widest text-xs">Section {step} of 4</span>
                     <h3 className="text-5xl font-headline font-black uppercase text-zinc-900 mt-2 leading-none">
                        {step === 1 ? (authMode === "login" ? "LOGIN" : "SIGNUP") : step === 2 ? "IDENTITY" : step === 3 ? "DETAILS" : "UPLOAD"}
                     </h3>
                     <div className="w-20 h-2 bg-primary mt-4"></div>
                  </div>

                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                     {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                           <div className="space-y-6 text-left">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm">alternate_email</span> Email
                                    </label>
                                    <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 focus:border-primary/20 focus:bg-white outline-none transition-all font-medium" placeholder="mail@firm.com" type="email" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                       <span className="material-symbols-outlined text-sm">lock</span> Password
                                    </label>
                                    <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 focus:border-primary/20 focus:bg-white outline-none transition-all font-medium" placeholder="••••••••" type="password" />
                                 </div>

                                 {authMode === "signup" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                          <span className="material-symbols-outlined text-sm">lock_reset</span> Confirm Password
                                       </label>
                                       <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 focus:border-primary/20 focus:bg-white outline-none transition-all font-medium" placeholder="••••••••" type="password" />
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="flex flex-col gap-4">
                              <button onClick={() => setStep(2)} className="w-full py-5 bg-zinc-900 text-white rounded-full font-headline font-black text-xl uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                                 {authMode === "login" ? "CONTINUE" : "CREATE ACCOUNT"}
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                              </button>
                              <p className="text-center text-sm font-medium text-zinc-500">
                                 {authMode === "login" ? "No account? " : "Already registered? "}
                                 <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-primary font-black underline underline-offset-4 decoration-2">
                                    {authMode === "login" ? "SIGNUP HERE" : "LOGIN HERE"}
                                 </button>
                              </p>
                           </div>
                        </div>
                     )}

                     {step === 2 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                           <div className="grid md:grid-cols-2 gap-6 text-left">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">person</span> Name
                                 </label>
                                 <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium focus:border-primary/20 focus:bg-white outline-none" placeholder="Full name" type="text" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">storefront</span> Shop
                                 </label>
                                 <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium focus:border-primary/20 focus:bg-white outline-none" placeholder="Firm name" type="text" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">smartphone</span> Mobile Number
                                 </label>
                                 <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium focus:border-primary/20 focus:bg-white outline-none" placeholder="+91 00000 00000" type="tel" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">location_on</span> Location
                                 </label>
                                 <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium focus:border-primary/20 focus:bg-white outline-none" placeholder="City, State" type="text" />
                              </div>
                           </div>
                           <div className="flex items-center gap-6 pt-12 border-t border-zinc-100">
                              <button type="button" onClick={() => setStep(step - 1)} className="flex-1 h-16 border border-zinc-100 rounded-full font-headline font-black text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 group">
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
                                 BACK
                              </button>
                              <button type="button" onClick={() => setStep(3)} className="flex-[2] h-16 bg-zinc-900 text-white rounded-full font-headline font-black text-sm uppercase tracking-widest shadow-lg hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                                 NEXT STEP
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                              </button>
                           </div>
                        </div>
                     )}
                     {step === 3 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                           <div className="grid md:grid-cols-2 gap-8 text-left">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">payments</span> UPI ID / VPA
                                 </label>
                                 <input className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium" placeholder="username@upi" type="text" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">shopping_cart</span> Grain Quantity
                                 </label>
                                 <select className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-medium outline-none focus:border-primary/20 transition-all">
                                    <option value="">Select quantity</option>
                                    <option value="200">200.00 Gram</option>
                                    <option value="300">300.00 Gram</option>
                                    <option value="500">500.00 Gram</option>
                                    <option value="750">750.00 Gram</option>
                                    <option value="1000">1,000.00 Gram</option>
                                    <option value="1250">1,250.00 Gram</option>
                                    <option value="1500">1,500.00 Gram</option>
                                    <option value="1750">1,750.00 Gram</option>
                                    <option value="2000">2,000.00 Gram</option>
                                    <option value="2500">2,500.00 Gram</option>
                                 </select>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 pt-12 border-t border-zinc-100">
                              <button type="button" onClick={() => setStep(step - 1)} className="flex-1 h-16 border border-zinc-100 rounded-full font-headline font-black text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 group">
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
                                 BACK
                              </button>
                              <button type="button" onClick={() => setStep(4)} className="flex-[2] h-16 bg-zinc-900 text-white rounded-full font-headline font-black text-sm uppercase tracking-widest shadow-lg hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                                 NEXT STEP
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                              </button>
                           </div>
                        </div>
                     )}

                     {step === 4 && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                           <div className="space-y-6 text-left">
                              <div className="grid md:grid-cols-2 gap-4">
                                 <div className="border-2 border-dashed border-zinc-100 rounded-[2rem] p-10 text-center flex flex-col items-center gap-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                                       <span className="material-symbols-outlined text-3xl text-primary">badge</span>
                                    </div>
                                    <div className="space-y-2">
                                       <h4 className="text-xl font-headline font-black uppercase tracking-tight">Aadhar Card</h4>
                                       <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">Front & Back (JPG/PNG)</p>
                                    </div>
                                    <label htmlFor="aadhar-upload" className="px-8 py-3 bg-white border border-zinc-100 rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-white transition-all shadow-sm">
                                       Choose File
                                    </label>
                                    <input type="file" className="hidden" id="aadhar-upload" />
                                 </div>

                                 <div className="border-2 border-dashed border-zinc-100 rounded-[2rem] p-10 text-center flex flex-col items-center gap-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                                       <span className="material-symbols-outlined text-3xl text-primary">receipt_long</span>
                                    </div>
                                    <div className="space-y-2">
                                       <h4 className="text-xl font-headline font-black uppercase tracking-tight">Purchase Invoice</h4>
                                       <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">Recent bill copy (PDF)</p>
                                    </div>
                                    <label htmlFor="invoice-upload" className="px-8 py-3 bg-white border border-zinc-100 rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-white transition-all shadow-sm">
                                       Choose File
                                    </label>
                                    <input type="file" className="hidden" id="invoice-upload" />
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 pt-12 border-t border-zinc-100">
                              <button type="button" onClick={() => setStep(step - 1)} className="flex-1 h-16 border border-zinc-100 rounded-full font-headline font-black text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 group">
                                 <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
                                 BACK
                              </button>
                              <button type="button" className="flex-[2] h-16 bg-primary text-white rounded-full font-headline font-black text-sm uppercase tracking-widest shadow-primary/20 shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                                 FINISH
                                 <span className="material-symbols-outlined text-base">check_circle</span>
                              </button>
                           </div>
                        </div>
                     )}
                  </form>
               </div>
            </div>
         </section>

         {/* Full Rewards Gallery */}
         <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
               <div className="text-center mb-24">
                  <span className="inline-block bg-primary/5 text-primary px-6 py-2 rounded-full font-headline font-black text-xs tracking-[0.2em] uppercase mb-6">Discovery Tier</span>
                  <h2 className="text-[2.8rem] xs:text-5xl md:text-7xl lg:text-8xl font-headline font-black uppercase text-zinc-900 leading-[0.85] tracking-tight">MEGA <br /> <span className="text-primary italic">REWARDS.</span></h2>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 relative group overflow-hidden rounded-[3rem] bg-zinc-100 text-white p-12 min-h-[450px] flex items-center">
                     <img src="/reward-gold.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Gold" />
                     <div className="relative z-10 space-y-6">
                        <span className="bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">2500.00 WT</span>
                        <h3 className="text-6xl font-headline font-black italic uppercase leading-none drop-shadow-xl">25 GM GOLD <br /> COIN</h3>
                     </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-[3rem] bg-zinc-50 p-10 flex flex-col justify-end min-h-[450px] border border-zinc-100">
                     <img src="/reward-bike.png" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-125 transition-transform duration-1000" alt="Bike" />
                     <div className="relative z-10 bg-white shadow-2xl p-6 rounded-2xl border border-zinc-100 transform group-hover:translate-y-[-10px] transition-transform">
                        <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">1250.00 WT</span>
                        <h4 className="text-3xl font-headline font-black uppercase italic leading-none text-zinc-900">TVS Apache</h4>
                     </div>
                  </div>

                  {/* Standard Reward Rows */}
                  <div className="relative group overflow-hidden rounded-[3rem] bg-zinc-950 text-white min-h-[400px] p-10 flex flex-col justify-between">
                     <img alt="iPhone" className="absolute inset-0 w-full h-full object-cover opacity-60" src="/reward-iphone.png" />
                     <div className="relative z-10"><span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">1000 WT</span></div>
                     <div className="relative z-10"><h4 className="text-3xl font-headline font-black italic uppercase leading-tight">IPHONE 16 PRO <br /> <span className="text-zinc-500">& FRIDGE</span></h4></div>
                  </div>

                  <div className="relative group overflow-hidden rounded-[3rem] bg-zinc-50 min-h-[400px] p-10 flex flex-col justify-between border border-zinc-100">
                     <img alt="Laptop" className="absolute inset-0 w-full h-full object-cover opacity-90" src="/reward-laptop.png" />
                     <div className="relative z-10"><span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">750 WT</span></div>
                     <div className="relative z-10"><h4 className="text-3xl font-headline font-black italic uppercase leading-none text-zinc-900 underline decoration-primary/20">ACER LAPTOP</h4></div>
                  </div>

                  <div className="relative group overflow-hidden rounded-[3rem] bg-white border border-zinc-100 min-h-[400px] p-10 flex flex-col justify-end">
                     <img alt="TV" className="absolute inset-0 w-full h-full object-cover" src="/reward-tv.png" />
                     <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-zinc-100 shadow-xl">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">500 WT</span>
                        <h4 className="text-2xl font-headline font-black italic uppercase leading-tight text-zinc-900">SONY SMART TV</h4>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
