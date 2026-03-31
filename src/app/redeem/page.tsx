import React from "react";

export default function RedeemPage() {
   return (
      <>
         {/* Hero Section */}
         <section
            className="relative min-h-[600px] flex items-center overflow-hidden pt-20"
            style={{
               background: "linear-gradient(135deg, #1a0000 0%, #09090b 50%, #000000 100%)"
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

                     <h1 className="font-headline font-black text-6xl md:text-8xl italic uppercase leading-[0.8] tracking-tighter text-white">
                        HOW TO <br />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(182,1,0,0.5)]">REDEEM</span>
                     </h1>

                     <p className="text-zinc-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
                        Turn your sales achievement into high-octane luxury rewards. Our high-performance redemption portal is built for speed and precision.
                     </p>

                     <div className="flex flex-wrap gap-4 pt-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl group hover:bg-white/10 transition-colors">
                           <span className="block text-2xl font-headline font-black text-white italic">INSTANT</span>
                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">UPI Validation</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl group hover:bg-white/10 transition-colors">
                           <span className="block text-2xl font-headline font-black text-white italic">24/7</span>
                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Support Portal</span>
                        </div>
                     </div>
                  </div>

                  {/* Right Side: Visual Showcase */}
                  <div className="relative">
                     <div className="relative aspect-square max-w-[500px] mx-auto group">
                        {/* Prize Stack Effect */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-[4rem] rotate-6 group-hover:rotate-3 transition-transform duration-700"></div>
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-[4rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100"></div>

                        <div className="relative w-full h-full p-8 flex items-center justify-center">
                           {/* Main Prize Image */}
                           <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/20">
                              <img
                                 src="/reward-bike.png"
                                 className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                                 alt="TVS Apache"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                           </div>

                           {/* Overlay Prize Cards */}
                           <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-200 w-40 rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                              <img src="/reward-gold.png" className="w-full h-auto rounded-lg" alt="Gold Coins" />
                              <span className="block text-[8px] font-black text-zinc-900 uppercase tracking-widest mt-2">Achievement Gold</span>
                           </div>

                           <div className="absolute -top-6 -right-6 bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-white/10 w-40 -rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                              <img src="/reward-iphone.png" className="w-full h-auto rounded-lg" alt="iPhone" />
                              <span className="block text-[8px] font-black text-white uppercase tracking-widest mt-2 text-center">Tech Bundle</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Dynamic Slant/Skew bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-surface transform translate-y-1/2 -skew-y-2 border-t border-zinc-200"></div>
         </section>

         {/* Step-by-Step Guide */}
         <section className="py-24 bg-surface">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Left Column: Visual Anchor */}
                  <div className="lg:col-span-5 sticky top-32">
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-secondary-container/20 rounded-xl blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                        <div className="relative bg-surface-container-lowest rounded-xl p-8 shadow-2xl shadow-primary/10 overflow-hidden">
                           <img
                              className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-700"
                              alt="Premium rice pack"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5uzOLEobdFodHDtTiNYl7_EYvofpEl4eB-dxv3lrgWGZHX4vNsHJRF6oTG78OkZGZfTMpeNRErghaYMxGF1ZjdjuGywgMN7S-4mzvbJODsCRAav5CaWA_F6hW7OC7b4kPYzDsp-Ce4_JEZ2wOqdXsbBYbeuywxvC5rX1okb1-hl8Qk2ZeAjGvx6Nb7VD7yEUTlzi8Q7DFyy_bNypxcn-Sta16-_uiJyhI2EzUvPyZRlVQDafuNb44QGeXTba4bmNfBmjYomX1Ck"
                           />
                           <div className="mt-8">
                              <h3 className="font-headline font-bold text-2xl text-primary">
                                 SNTE Premium Basmati
                              </h3>
                              <p className="text-on-surface-variant font-body mt-2">
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
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary transition-colors duration-300">
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
                           <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg shadow-secondary/20 group-hover:rotate-12 transition-transform duration-300">
                              02
                           </div>
                        </div>
                        <div className="pt-2">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-secondary text-3xl">
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
                           <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg shadow-primary/20 group-hover:-rotate-12 transition-transform duration-300">
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
                           <div className="w-16 h-16 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-headline font-black text-3xl italic shadow-lg group-hover:bg-primary transition-colors duration-300">
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

         {/* CTA Section */}
         <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
               <div className="relative bg-zinc-900 rounded-2xl p-12 md:p-24 overflow-hidden">
                  {/* Background texture */}
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
                        Ready to <span className="text-secondary-container">Ignite</span>{" "}
                        Your Rewards?
                     </h2>
                     <p className="text-zinc-400 text-lg md:text-xl font-body mb-12">
                        Don't let your code sit idle. Register now and join thousands of
                        winners who are fueling their lifestyle with SNTE Rice.
                     </p>
                     <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <button className="w-full md:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-12 py-5 rounded-xl font-headline font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary/40 scale-100 hover:scale-105 active:scale-95 transition-all">
                           Register Now
                        </button>
                        <button className="w-full md:w-auto bg-white/10 text-white backdrop-blur-md px-12 py-5 rounded-xl font-headline font-black text-xl uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">
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
