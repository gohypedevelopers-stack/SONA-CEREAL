import React from "react";
import Link from "next/link";

export default function RedeemPage() {
   return (
      <>
         {/* Hero Section */}
         <section
            className="relative min-h-[600px] flex items-center overflow-hidden pt-20"
            style={{
               background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f4f1ea 100%)"
            }}
         >
            {/* Subtle Background Pattern & Grain */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-soft-light">
               <div
                  className="absolute inset-0"
                  style={{
                     backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
                     opacity: "0.2"
                  }}
               ></div>
               <div className="absolute inset-0 hero-rays opacity-30"></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/4"></div>

            <div className="container mx-auto px-6 relative z-10 py-12">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side: Text Content */}
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-2xl">
                        <span className="w-2 h-2 bg-primary animate-pulse rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Step-By-Step Success</span>
                     </div>

                     <h1 className="font-headline font-black text-6xl md:text-8xl italic uppercase leading-[0.8] tracking-tighter text-zinc-900">
                        HOW TO <br />
                        <span className="text-primary">REDEEM</span>
                     </h1>

                     <p className="text-zinc-600 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
                        Turn your sales achievement into high-octane luxury rewards. Our high-performance redemption portal is built for speed and precision.
                     </p>

                     <div className="flex flex-wrap gap-4 pt-4">
                        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-xl group hover:bg-zinc-50 transition-colors">
                           <span className="block text-2xl font-headline font-black text-zinc-900 italic">INSTANT</span>
                           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">UPI Validation</span>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-zinc-200 shadow-xl group hover:bg-zinc-50 transition-colors">
                           <span className="block text-2xl font-headline font-black text-zinc-900 italic">24/7</span>
                           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Support Portal</span>
                        </div>
                     </div>
                  </div>

                  {/* Right Side: Visual Showcase */}
                  <div className="relative">
                     <div className="relative aspect-square max-w-[500px] mx-auto group">
                        {/* Prize Stack Effect */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-zinc-200 opacity-50 rounded-[4rem] rotate-6 group-hover:rotate-3 transition-transform duration-700"></div>
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-[4rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100"></div>

                        <div className="relative w-full h-full p-8 flex items-center justify-center">
                           {/* Main Prize Image */}
                           <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white/20">
                              <img
                                 src="/reward-bike.png"
                                 className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                                 alt="TVS Apache"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                           </div>

                           {/* Overlay Prize Cards */}
                           <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 w-40 rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                              <img src="/reward-gold.png" className="w-full h-auto rounded-lg" alt="Gold Coins" />
                              <span className="block text-[8px] font-black text-primary uppercase tracking-widest mt-2">Achievement Gold</span>
                           </div>

                           <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 w-40 -rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                              <img src="/reward-iphone.png" className="w-full h-auto rounded-lg" alt="iPhone" />
                              <span className="block text-[8px] font-black text-zinc-900 uppercase tracking-widest mt-2 text-center">Tech Bundle</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Dynamic Slant/Skew bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-white transform translate-y-1/2 -skew-y-2 border-t border-zinc-100"></div>
         </section>

         {/* Step-by-Step Guide */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Left Column: Visual Anchor */}
                  <div className="lg:col-span-5 sticky top-32">
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-zinc-100 rounded-xl blur-2xl group-hover:bg-primary/5 transition-colors duration-500"></div>
                        <div className="relative bg-white rounded-xl p-8 shadow-2xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
                           <img
                              className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-700"
                              alt="Premium rice pack"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5uzOLEobdFodHDtTiNYl7_EYvofpEl4eB-dxv3lrgWGZHX4vNsHJRF6oTG78OkZGZfTMpeNRErghaYMxGF1ZjdjuGywgMN7S-4mzvbJODsCRAav5CaWA_F6hW7OC7b4kPYzDsp-Ce4_JEZ2wOqdXsbBYbeuywxvC5rX1okb1-hl8Qk2ZeAjGvx6Nb7VD7yEUTlzi8Q7DFyy_bNypxcn-Sta16-_uiJyhI2EzUvPyZRlVQDafuNb44QGeXTba4bmNfBmjYomX1Ck"
                           />
                           <div className="mt-8">
                              <h3 className="font-headline font-bold text-2xl text-primary">
                                 Sona Cereal Premium Basmati
                              </h3>
                              <p className="text-zinc-600 font-body mt-2">
                                 The fuel for your rewards journey. Every pack is a
                                 potential win.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Right Column: The Steps */}
                  <div className="lg:col-span-7 space-y-20">
                     {/* Step 1 */}
                     <div className="flex gap-8 items-start group">
                        <div className="flex-shrink-0">
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                              01
                           </div>
                        </div>
                        <div className="pt-2">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-primary text-3xl">
                                 shopping_basket
                              </span>
                              <h2 className="font-headline font-black uppercase text-2xl tracking-tight text-zinc-900">
                                 Portal Entry
                              </h2>
                           </div>
                           <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-100 relative overflow-hidden">
                              <p className="text-zinc-500 text-lg leading-relaxed relative z-10 italic">
                                 <span className="text-zinc-900 font-bold block mb-2">Signup or Login Required:</span>
                                 Retailers establish their high-performance entry point into the Sona Cereal portal. This secure step is mandatory to track your journey and claim rewards.
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* Step 2 */}
                     <div className="flex gap-8 items-start group">
                        <div className="flex-shrink-0">
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                              02
                           </div>
                        </div>
                        <div className="pt-2">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-primary text-3xl">
                                 app_registration
                              </span>
                              <h2 className="font-headline font-black uppercase text-2xl tracking-tight text-zinc-900">
                                 Registration Form
                              </h2>
                           </div>
                           <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-100 relative overflow-hidden">
                              <p className="text-zinc-500 text-lg leading-relaxed mb-8 italic">
                                 Fill out the comprehensive retailer registration form with your business identity and proof of purchase to initiate the validation phase:
                              </p>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {[
                                    { icon: "store", text: "Shop Name" },
                                    { icon: "location_on", text: "Shop Address" },
                                    { icon: "badge", text: "Aadhar Card" },
                                    { icon: "receipt_long", text: "Invoice Copy" }
                                 ].map((item) => (
                                    <li key={item.text} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm group-hover:border-primary/20 transition-all duration-300">
                                       <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                                       <span className="text-xs font-black uppercase tracking-widest text-zinc-600">{item.text}</span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                     {/* Step 3: Admin Verification */}
                     <div className="flex gap-8 items-start group">
                        <div className="flex-shrink-0">
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                              03
                           </div>
                        </div>
                        <div className="pt-2">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-primary text-3xl">
                                 verified
                              </span>
                              <h2 className="font-headline font-black uppercase text-2xl tracking-tight text-zinc-900">
                                 Admin Verification
                              </h2>
                           </div>
                           <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-100 relative overflow-hidden">
                              <p className="text-zinc-500 text-lg leading-relaxed relative z-10 italic">
                                 Our dedicated verification team reviews your submission for total compliance. Approvals are typically processed within
                                 <span className="text-zinc-900 font-bold ml-2">24 to 48 hours</span>. Your status will be updated in real-time on your dashboard.
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Step 4: Gift Provision */}
                     <div className="flex gap-8 items-start group">
                        <div className="flex-shrink-0">
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                              04
                           </div>
                        </div>
                        <div className="pt-2">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-primary text-3xl">
                                 redeem
                              </span>
                              <h2 className="font-headline font-black uppercase text-2xl tracking-tight text-zinc-900">
                                 Claim Your Gift
                              </h2>
                           </div>
                           <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-100 relative overflow-hidden">
                              <p className="text-zinc-500 text-lg leading-relaxed relative z-10 italic">
                                 Once verified, unlock your <span className="text-zinc-900 font-bold">Assured Gift</span> instantly. You also officially enter the draw for our exclusive bumper prizes, including TVS Apache, Gold, and Tech bundles.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Milestone Slabs Section */}
         <section className="py-24 bg-white relative z-10 border-t border-zinc-100">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <div className="max-w-2xl">
                     <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Official Benchmarks</span>
                     <h2 className="font-headline font-black text-5xl md:text-7xl italic uppercase text-zinc-900 leading-[0.85] tracking-tighter">
                        REWARD <br />
                        <span className="text-primary">SLABS.</span>
                     </h2>
                  </div>
                  <Link href="/milestones" className="bg-zinc-900 text-white px-10 py-4 rounded-full font-headline font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-3">
                     View All Milestones
                     <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                     { wt: "200", sale: "11L", item: "Microwave", icon: "kitchen" },
                     { wt: "500", sale: "27.5L", item: "Smart TV", icon: "tv" },
                     { wt: "1000", sale: "55L", item: "iPhone 16 Pro", icon: "smartphone" },
                     { wt: "2500", sale: "1.37C", item: "25g Gold Coin", icon: "military_tech" },
                  ].map((slab) => (
                     <div key={slab.wt} className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 group hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
                        <div className="relative z-10">
                           <span className="material-symbols-outlined text-primary text-5xl mb-6">{slab.icon}</span>
                           <h4 className="text-4xl font-headline font-black text-zinc-900 italic uppercase mb-2">
                              {slab.wt}<span className="text-xs font-bold text-zinc-400 ml-1">WT</span>
                           </h4>
                           <p className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-6">Target: ₹{slab.sale}</p>
                           <div className="h-1 w-full bg-zinc-200 rounded-full mb-8 relative overflow-hidden">
                              <div className="absolute top-0 left-0 h-full bg-primary w-2/3 group-hover:w-full transition-all duration-1000"></div>
                           </div>
                           <p className="text-xs font-bold italic text-zinc-600">Reward Options:</p>
                           <p className="text-[10px] md:text-sm font-headline font-black uppercase italic text-zinc-900 leading-tight">
                              {slab.item.split(", ").map((part, idx) => (
                                <React.Fragment key={idx}>
                                  {part}
                                  {idx < slab.item.split(", ").length - 1 && <span className="text-primary mx-1">OR</span>}
                                </React.Fragment>
                              ))}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-24 bg-white overflow-hidden border-t border-zinc-100">
            <div className="container mx-auto px-6">
               <div className="relative bg-zinc-900 rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5">
                  <div
                     className="absolute inset-0 opacity-10"
                     style={{
                        backgroundImage:
                           "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCt70UDeTMzfrZAKLZZECj-S48HWYyDjx8_xyH5aHUfxR_1Hclm1ZcHhPaht4M8cehU0qJ30-ozRG-Ly9idcbNwECc_3FLaQVrwBArOhLfXjK0S7qqgmFldVQfsT78IRG3rmzVps5k3SjFf_LAIs3JSx6133WdFLNJeT6FNvsJORxzqF2KeRLokVpX9lSQHEsO9ANtk78uTsYFHjo6g8Pf9TTyV003Ibr-6nEMLdwJO57fVUKGpwWlRsigrSqQ5gJzDlyjfhXSl_Sc')",
                     }}
                  ></div>
                  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-30"></div>
                  <div className="relative z-10 text-center max-w-3xl mx-auto">
                     <h2 className="font-headline font-black text-4xl md:text-6xl text-white italic uppercase tracking-tighter mb-8 leading-none">
                        Ready to <span className="text-primary">Ignite</span>{" "}
                        Your Rewards?
                     </h2>
                     <p className="text-zinc-400 text-lg md:text-xl font-body mb-12">
                        Don't let your code sit idle. Register now and join thousands of
                        winners who are fueling their lifestyle with Sona Cereal.
                     </p>
                     <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <button className="w-full md:w-auto bg-primary text-black px-12 py-5 rounded-xl font-headline font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary/40 scale-100 hover:scale-105 active:scale-95 transition-all">
                           Register Now
                        </button>
                        <button className="w-full md:w-auto bg-white/5 text-white backdrop-blur-md px-12 py-5 rounded-xl font-headline font-black text-xl uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                           Watch Tutorial
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
