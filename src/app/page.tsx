"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
   const [step, setStep] = React.useState(0);
   const [mode, setMode] = React.useState<'selection' | 'login' | 'register'>('selection');
   const [activeSlide, setActiveSlide] = React.useState(0);

   const slides = [
      { desktop: '/G-Banner.png', mobile: '/G-Banner%20(1).png' },
      { desktop: '/RR-Banner.jpg', mobile: '/RR-Banner%20(1).jpg' }
   ];

   const nextSlide = () => setActiveSlide(prev => (prev + 1) % slides.length);
   const prevSlide = () => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length);

   React.useEffect(() => {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
   }, []);

   const totalSteps = 3;
   const progress = step === 0 ? 0 : (step / totalSteps) * 100;

   // Login/Register credential state
   const [loginError, setLoginError] = React.useState("");
   const [registerError, setRegisterError] = React.useState("");
   const [loginPhone, setLoginPhone] = React.useState("+91 ");
   const [loginOtp, setLoginOtp] = React.useState("");
   const [loginStep, setLoginStep] = React.useState<'phone' | 'otp'>('phone');

   // Dashboard form data
   const [formData, setFormData] = React.useState({
      name: "",
      shopName: "",
      phone: "+91 ",
      city: ""
   });

   const [aadharFront, setAadharFront] = React.useState<File | null>(null);
   const [aadharBack, setAadharBack] = React.useState<File | null>(null);
   const [isSubmitting, setIsSubmitting] = React.useState(false);

   // Handle smooth scroll to form
   const scrollToRegistration = () => {
      const element = document.getElementById("registration-section");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === 'phone' && !value.startsWith('+91 ')) {
         return;
      }
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSendOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (loginPhone.trim().length < 13) {
         setLoginError("Please enter a valid phone number.");
         return;
      }

      try {
         setLoginError("");
         const checkRes = await fetch(`/api/register?phone=${encodeURIComponent(loginPhone)}`);
         const checkData = await checkRes.json();

         if (!checkData.exists) {
            setLoginError("NotRegistered");
            return;
         }

         const res = await fetch("/api/auth/otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: loginPhone })
         });
         const data = await res.json();
         if (data.success) {
            setLoginStep('otp');
            setLoginError("");
         } else {
            setLoginError(data.message || "Failed to send OTP");
         }
      } catch (err) {
         setLoginError("Connection error. Try again.");
      }
   };

   const handleRegistrationStep1Next = async () => {
      if (formData.phone.trim().length < 13) {
         setRegisterError("Please enter a valid phone number.");
         return;
      }
      if (!formData.name || !formData.shopName || !formData.city) {
         setRegisterError("Please fill all fields.");
         return;
      }

      try {
         const res = await fetch(`/api/register?phone=${encodeURIComponent(formData.phone)}`);
         const data = await res.json();
         if (data.exists) {
            setRegisterError("AlreadyRegistered");
            return;
         }
         setRegisterError("");
         setStep(2);
      } catch (err) {
         setRegisterError("Verification failed.");
      }
   };

   const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         const res = await fetch("/api/auth/otp", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: loginPhone, otp: loginOtp })
         });
         const data = await res.json();

         if (data.success) {
            localStorage.setItem("current_user_phone", loginPhone);
            window.location.href = "/invoice-details";
         } else {
            setLoginError(data.message || "Invalid OTP. Use 1234 for testing.");
         }
      } catch (err) {
         setLoginError("Connection error.");
      }
   };

   const handleFinalSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
         data.append(key, value);
      });
      if (aadharFront) data.append('aadharFront', aadharFront);
      if (aadharBack) data.append('aadharBack', aadharBack);

      try {
         const res = await fetch("/api/register", {
            method: "POST",
            body: data
         });
         const result = await res.json();
         if (result.success) {
            alert("Business Registered Successfully!");
            setMode('login');
            setLoginStep('phone');
            setLoginPhone(formData.phone);
            setStep(0);
         } else {
            alert("Error: " + (result.error || "Failed to submit."));
         }
      } catch (err) {
         alert("Network error. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="bg-white">
         {/* Optimized Responsive Hero Carousel */}
         <section className="relative md:min-h-[90vh] h-auto overflow-hidden bg-white select-none">
            <div className="md:absolute md:inset-0 relative z-0">
               {/* Slides Mapping - Height Fix for Mobile */}
               {slides.map((slide, idx) => (
                  <div
                     key={idx}
                     className={`transition-opacity duration-1000 ease-in-out 
                         ${idx === activeSlide 
                           ? 'relative opacity-100' 
                           : 'absolute inset-0 opacity-0 pointer-events-none'}`}
                  >
                     {/* Desktop Image - Stays Exactly as It Is */}
                     <img
                        src={slide.desktop}
                        className="w-full h-full object-cover hidden md:block" 
                        alt={`Sona Cereal Banner ${idx + 1}`}
                     />
                     {/* Mobile Image - Natural Un-zoomed Fit */}
                     <img
                        src={slide.mobile}
                        className="w-full h-auto md:hidden block bg-white"
                        alt={`Banner Mobile ${idx + 1}`}
                     />
                  </div>
               ))}
            </div>

            {/* Subdued Navigation Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-between px-4 group">
               <button
                  onClick={prevSlide}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/10"
               >
                  <span className="material-symbols-outlined text-zinc-900">arrow_back_ios_new</span>
               </button>
               <button
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/10"
               >
                  <span className="material-symbols-outlined text-zinc-900">arrow_forward_ios</span>
               </button>
            </div>

            {/* Minimal Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
               {slides.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => setActiveSlide(i)}
                     className={`w-2 h-2 rounded-full transition-all ${i === activeSlide ? 'bg-zinc-900 scale-125' : 'bg-zinc-400'}`}
                  />
               ))}
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

         {/* Entry Section */}
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
                           <h3 className="text-3xl font-headline font-black uppercase leading-tight italic">
                              RETAILER <br />
                              <span className="text-[#CBA35C]">SYSTEMS.</span>
                           </h3>
                           <p className="text-zinc-400 font-medium text-sm">Secure data-driven validation for elite partners.</p>
                        </div>

                        <div className="space-y-8">
                           {[
                              { id: 0, label: "Security Entry", sub: mode === 'selection' ? 'Auth Choices' : 'Credentials' },
                              { id: 1, label: "Identity Check", sub: "Retailer Details" },
                              { id: 2, label: "Aadhar Upload", sub: "Verification" },
                              { id: 3, label: "Claim your reward", sub: "Final Certify" },
                           ].map((s) => (
                              <div key={s.id} className={`flex items-center gap-4 transition-all duration-500 ${step >= s.id ? 'opacity-100 translate-x-1' : 'opacity-30'}`}>
                                 <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black transition-all ${step > s.id ? 'bg-[#CBA35C] border-[#CBA35C] text-black' : step === s.id ? 'bg-white border-white text-black ring-4 ring-white/10' : 'border-white/20 text-white/50'}`}>
                                    {step > s.id && s.id !== 0 ? <span className="material-symbols-outlined text-base">check</span> : (s.id === 0 && step > 0) ? <span className="material-symbols-outlined text-base">lock_open</span> : `0${s.id}`}
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

                  <div className="lg:col-span-8 p-8 md:p-24 bg-white relative flex flex-col justify-center min-h-[600px]">

                     {mode === 'selection' ? (
                        <div className="space-y-12 text-center animate-in fade-in duration-700 slide-in-from-bottom-8">
                           <div className="space-y-4">
                              <h3 className="text-4xl md:text-5xl font-headline font-black uppercase text-zinc-900 leading-none italic">
                                 CHOOSE YOUR <span className="text-[#CBA35C]">ENTRY.</span>
                              </h3>
                              <p className="text-zinc-500 text-lg font-medium italic">Welcome to the Sona Cereal Official Infrastructure.</p>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-8">
                              <button onClick={() => { setMode('login'); setLoginStep('phone'); setLoginError(""); }} className="group p-10 bg-zinc-900 rounded-[3rem] border border-white/10 text-white hover:scale-105 transition-all shadow-2xl relative overflow-hidden text-center">
                                 <div className="absolute top-0 right-0 w-32 h-22 bg-[#CBA35C]/20 rounded-full blur-3xl group-hover:bg-[#CBA35C]/40 transition-all"></div>
                                 <span className="material-symbols-outlined text-5xl text-[#CBA35C] mb-6 block group-hover:rotate-12 transition-transform">login</span>
                                 <h4 className="text-2xl font-headline font-black uppercase italic leading-none mb-2 text-white">LOGIN</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Retailer Portal</p>
                              </button>

                              <button onClick={() => { setMode('register'); setStep(1); }} className="group p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 text-zinc-900 hover:scale-105 transition-all shadow-xl relative overflow-hidden text-center">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#CBA35C]/5 rounded-full blur-3xl group-hover:bg-[#CBA35C]/10 transition-all"></div>
                                 <span className="material-symbols-outlined text-5xl text-zinc-400 mb-6 block group-hover:rotate-12 transition-transform">how_to_reg</span>
                                 <h4 className="text-2xl font-headline font-black uppercase italic leading-none mb-2 text-zinc-900">REGISTER</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">New Partner Portal</p>
                              </button>
                           </div>
                        </div>
                     ) : mode === 'login' ? (
                        <div className="space-y-10 animate-in fade-in duration-700 slide-in-from-right-8">
                           <div className="text-left space-y-4">
                              <button onClick={() => setMode('selection')} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                 <span className="material-symbols-outlined">west</span> Back to Choices
                              </button>
                              <h3 className="text-4xl md:text-5xl font-headline font-black uppercase text-zinc-900 leading-none italic">
                                 SECURE <span className="text-[#CBA35C]">LOGIN.</span>
                              </h3>
                              <p className="text-zinc-400 text-lg font-medium italic">
                                 {loginStep === 'phone' ? 'Enter your registered phone number to receive a secure code.' : 'Enter the 4-digit code sent to your device.'}
                              </p>
                           </div>

                           <form onSubmit={loginStep === 'phone' ? handleSendOtp : handleLoginSubmit} className="space-y-6 max-w-md">
                              {loginStep === 'phone' ? (
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Registered Phone</label>
                                    <input
                                       type="tel"
                                       value={loginPhone}
                                       onChange={(e) => {
                                          if (e.target.value.startsWith('+91 ')) {
                                             setLoginPhone(e.target.value);
                                          }
                                       }}
                                       placeholder="+91 00000 00000"
                                       className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-medium"
                                       required
                                    />
                                    <p className="text-[9px] text-zinc-400 italic">Secure validation for authorized partners only.</p>
                                 </div>
                              ) : (
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Secure OTP Code</label>
                                    <input
                                       type="text"
                                       value={loginOtp}
                                       onChange={(e) => setLoginOtp(e.target.value)}
                                       placeholder="Enter 1234"
                                       className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-medium text-center text-3xl tracking-[0.5em]"
                                       maxLength={4}
                                       required
                                    />
                                    <button type="button" onClick={() => setLoginStep('phone')} className="text-[10px] font-black uppercase tracking-widest text-[#CBA35C] hover:underline mt-2">Change Number</button>
                                 </div>
                              )}

                              {loginError && (
                                 <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
                                    {loginError === "NotRegistered" ? (
                                       <div className="flex flex-col gap-3 items-start">
                                          <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                             This phone number is not registered in our retailer database.
                                          </p>
                                          <button
                                             type="button"
                                             onClick={() => { setMode('register'); setStep(1); setLoginError(""); setFormData(prev => ({ ...prev, phone: loginPhone })); }}
                                             className="text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-white px-4 py-2 rounded-lg border border-red-200 hover:bg-zinc-50 transition-all flex items-center gap-2"
                                          >
                                             REGISTER NOW <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                          </button>
                                       </div>
                                    ) : (
                                       <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{loginError}</p>
                                    )}
                                 </div>
                              )}

                              <button type="submit" className="w-full bg-zinc-900 text-white hover:bg-[#CBA35C] hover:text-black py-5 rounded-2xl font-headline font-black uppercase text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                                 {loginStep === 'phone' ? 'GENERATE SECURE CODE' : 'VALIDATE & ACCESS PORTAL'}
                                 <span className="material-symbols-outlined">{loginStep === 'phone' ? 'send' : 'verified_user'}</span>
                              </button>
                           </form>
                        </div>
                     ) : (
                        <div className="animate-in fade-in duration-700 slide-in-from-right-8 h-full flex flex-col justify-center">
                           <div className="mb-12 text-left space-y-4">
                              <button onClick={() => { setMode('selection'); setStep(0); }} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                 <span className="material-symbols-outlined">west</span> Back to Choices
                              </button>
                              <div>
                                 <span className="text-[#CBA35C] font-black uppercase tracking-widest text-xs">Phase {step} of 3</span>
                                 <h3 className="text-4xl md:text-5xl font-headline font-black uppercase text-zinc-900 mt-2 leading-none italic">
                                    {step === 1 ? "PROFILE" : step === 2 ? "IDENTITY" : "VALIDATE"}
                                 </h3>
                                 <div className="w-24 h-2 bg-[#CBA35C] mt-6"></div>
                              </div>
                           </div>

                           <form className="space-y-8 md:space-y-10" onSubmit={step === 3 ? handleFinalSubmit : (e) => e.preventDefault()}>
                              {step === 1 && (
                                 <div className="space-y-8 md:space-y-10">
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-10 text-left">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">person</span> Propriertor Name
                                          </label>
                                          <input
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}
                                             className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400"
                                             placeholder="Full name"
                                             type="text"
                                             required
                                          />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">storefront</span> Shop / Entity Name
                                          </label>
                                          <input
                                             name="shopName"
                                             value={formData.shopName}
                                             onChange={handleInputChange}
                                             className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400"
                                             placeholder="Firm name"
                                             type="text"
                                             required
                                          />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">smartphone</span> Primary Contact
                                          </label>
                                          <input
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleInputChange}
                                             className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400"
                                             placeholder="+91 00000 00000"
                                             type="tel"
                                             required
                                          />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">location_on</span> City / Region
                                          </label>
                                          <input
                                             name="city"
                                             value={formData.city}
                                             onChange={handleInputChange}
                                             className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 placeholder:text-zinc-400"
                                             placeholder="City, State"
                                             type="text"
                                             required
                                          />
                                       </div>
                                    </div>
                                    {registerError && (
                                       <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in mt-4 text-left">
                                          {registerError === "AlreadyRegistered" ? (
                                             <div className="flex flex-col gap-3 items-start">
                                                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                                   This number is already registered for another business.
                                                </p>
                                                <button
                                                   type="button"
                                                   onClick={() => { setMode('login'); setLoginStep('phone'); setRegisterError(""); setLoginPhone(formData.phone); }}
                                                   className="text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-white px-4 py-2 rounded-lg border border-red-200 hover:bg-zinc-50 transition-all flex items-center gap-2"
                                                >
                                                   GO TO LOGIN <span className="material-symbols-outlined text-sm">login</span>
                                                </button>
                                             </div>
                                          ) : (
                                             <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{registerError}</p>
                                          )}
                                       </div>
                                    )}

                                    <div className="flex items-center justify-end pt-10 border-t border-zinc-100">
                                       <button type="button" onClick={handleRegistrationStep1Next} className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90">
                                          <span className="font-headline font-black text-sm md:text-lg uppercase tracking-widest italic">Identity Step</span>
                                          <div className="w-16 h-16 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#CBA35C] group-hover:bg-[#CBA35C] group-hover:text-black transition-all">
                                             <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:translate-x-1">arrow_forward</span>
                                          </div>
                                       </button>
                                    </div>
                                 </div>
                              )}

                              {step === 2 && (
                                 <div className="space-y-8 md:space-y-10">
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                                       <div className="border-2 border-dashed border-zinc-200 rounded-[3rem] p-8 md:p-12 text-center flex flex-col items-center gap-6 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                             <span className="material-symbols-outlined text-4xl md:text-5xl text-[#CBA35C] font-black">badge</span>
                                          </div>
                                          <div className="space-y-2">
                                             <h4 className="text-xl md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">ID FRONT</h4>
                                             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Aadhar Front Side</p>
                                          </div>
                                          <label className={`px-10 py-4 ${aadharFront ? 'bg-green-500' : 'bg-zinc-900'} text-white rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all`}>
                                             {aadharFront ? 'FILE SELECTED' : 'CLICK TO SELECT'}
                                             <input type="file" className="hidden" onChange={(e) => setAadharFront(e.target.files?.[0] || null)} />
                                          </label>
                                       </div>

                                       <div className="border-2 border-dashed border-zinc-200 rounded-[3rem] p-8 md:p-12 text-center flex flex-col items-center gap-6 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                             <span className="material-symbols-outlined text-4xl md:text-5xl text-[#CBA35C] font-black">receipt_long</span>
                                          </div>
                                          <div className="space-y-2">
                                             <h4 className="text-xl md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">ID BACK</h4>
                                             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Aadhar Back Side</p>
                                          </div>
                                          <label className={`px-10 py-4 ${aadharBack ? 'bg-green-500' : 'bg-zinc-900'} text-white rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all`}>
                                             {aadharBack ? 'FILE SELECTED' : 'CLICK TO SELECT'}
                                             <input type="file" className="hidden" onChange={(e) => setAadharBack(e.target.files?.[0] || null)} />
                                          </label>
                                       </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-10 border-t border-zinc-100">
                                       <button type="button" onClick={() => setStep(step - 1)} className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-all p-4 active:scale-90">
                                          <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-all">
                                             <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                                          </div>
                                          <span className="font-headline font-black text-sm uppercase tracking-widest italic">Back</span>
                                       </button>
                                       <button type="button" onClick={() => setStep(3)} className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90">
                                          <span className="font-headline font-black text-sm md:text-lg uppercase tracking-widest italic">VALIDATE NOW</span>
                                          <div className="w-16 h-16 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#CBA35C] group-hover:bg-[#CBA35C] group-hover:text-black transition-all">
                                             <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:translate-x-1">arrow_forward</span>
                                          </div>
                                       </button>
                                    </div>
                                 </div>
                              )}

                              {step === 3 && (
                                 <div className="space-y-10 text-center py-12 bg-zinc-50 rounded-[4rem]">
                                    <div className="relative inline-block">
                                       <div className="w-32 h-32 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
                                          <span className="material-symbols-outlined text-6xl text-green-500 font-black">verified_user</span>
                                       </div>
                                    </div>
                                    <div className="space-y-4 max-w-sm mx-auto px-6">
                                       <h5 className="text-l font-headline font-black uppercase italic tracking-tight text-zinc-900 leading-none">Business Registered Successfully</h5>
                                       <p className="text-zinc-500 text-sm font-medium italic">Sell Sona Cereal slabs to hit our exclusive rewards tiers. Once you reach a milestoneof 200qtl+ claim your rewards instantly!</p>
                                    </div>
                                    <div className="pt-8 flex flex-col items-center gap-6">
                                       <button type="submit" disabled={isSubmitting} className="group bg-zinc-900 text-white px-12 py-6 rounded-full font-headline font-black text-lg uppercase tracking-widest hover:bg-[#CBA35C] hover:text-black transition-all shadow-2xl flex items-center gap-6 active:scale-95 disabled:opacity-50">
                                          {isSubmitting ? 'CERTIFYING...' : 'Claim your reward'}
                                          <span className="material-symbols-outlined text-3xl font-black transition-transform group-hover:scale-125">verified_user</span>
                                       </button>
                                       <button type="button" onClick={() => setStep(2)} className="text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-zinc-900 transition-colors underline">Back to Identity Check</button>
                                    </div>
                                 </div>
                              )}
                           </form>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
