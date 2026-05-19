"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
   type LoginMethod = 'email_otp' | 'password';
   type RegisterMethod = 'password' | 'email_otp';

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
   const [loginMethod, setLoginMethod] = React.useState<LoginMethod>('email_otp');
   const [loginIdentifier, setLoginIdentifier] = React.useState("");
   const [loginPassword, setLoginPassword] = React.useState("");
   const [loginOtp, setLoginOtp] = React.useState("");
   const [loginStep, setLoginStep] = React.useState<'email' | 'otp'>('email');
   const [registerMethod, setRegisterMethod] = React.useState<RegisterMethod>('password');
   const [emailOtp, setEmailOtp] = React.useState("");
   const [emailOtpStatus, setEmailOtpStatus] = React.useState("");
   const [emailOtpVerified, setEmailOtpVerified] = React.useState(false);
   const [showEmailOtpToast, setShowEmailOtpToast] = React.useState(false);

   // Dashboard form data
   const [formData, setFormData] = React.useState({
      name: "",
      shopName: "",
      phone: "+91 ",
      city: "",
      email: "",
      password: "",
      confirmPassword: ""
   });

   const [aadharFront, setAadharFront] = React.useState<File | null>(null);
   const [aadharBack, setAadharBack] = React.useState<File | null>(null);
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

   React.useEffect(() => {
      if (!showEmailOtpToast) return;
      const timer = setTimeout(() => setShowEmailOtpToast(false), 4500);
      return () => clearTimeout(timer);
   }, [showEmailOtpToast]);

   // Handle smooth scroll to form
   const scrollToRegistration = () => {
      const element = document.getElementById("registration-section");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === 'phone') {
         if (!value.startsWith('+91 ')) return;
      }
      if (name === 'email') {
         setEmailOtpVerified(false);
         setEmailOtpStatus("");
         setShowEmailOtpToast(false);
      }
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user types and if validation passes for phone
      if (fieldErrors[name]) {
         if (name === 'phone' && value.length < 14) return;
         setFieldErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
         });
      }
   };

   const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

   const handlePasswordLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         setLoginError("");
         const res = await fetch("/api/auth/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword })
         });
         const data = await res.json();

         if (data.success) {
            localStorage.setItem("current_user_phone", data.user.phone);
            window.location.href = "/invoice-details";
            return;
         }

         setLoginError(data.message || "Invalid credentials.");
      } catch (err) {
         setLoginError("Connection error.");
      }
   };

   const handleSendEmailOtp = async () => {
      if (!validateEmail(formData.email)) {
         setFieldErrors(prev => ({ ...prev, email: "Valid email is required." }));
         return;
      }

      try {
         setRegisterError("");
         setEmailOtpStatus("Sending verification code...");
         const res = await fetch("/api/auth/email-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email.trim().toLowerCase() })
         });
         const data = await res.json();

         if (data.success) {
            setEmailOtpStatus(data.message || "OTP sent to your email.");
            return;
         }

         setEmailOtpStatus("");
         setRegisterError(data.message || "Failed to send email OTP.");
      } catch (err) {
         setEmailOtpStatus("");
         setRegisterError("Failed to send email OTP.");
      }
   };

   const handleVerifyEmailOtp = async () => {
      if (emailOtp.trim().length !== 6) {
         setRegisterError("Enter the 6-digit email OTP.");
         return;
      }

      try {
         setRegisterError("");
         const res = await fetch("/api/auth/email-otp", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email.trim().toLowerCase(), otp: emailOtp.trim() })
         });
         const data = await res.json();

         if (data.success) {
            setEmailOtpVerified(true);
            setEmailOtpStatus("Email verified.");
            setShowEmailOtpToast(true);
            return;
         }

         setEmailOtpVerified(false);
         setShowEmailOtpToast(false);
         setRegisterError(data.message || "Invalid OTP.");
      } catch (err) {
         setEmailOtpVerified(false);
         setShowEmailOtpToast(false);
         setRegisterError("Verification failed.");
      }
   };

   const handleSendLoginOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      const normalizedEmail = loginIdentifier.trim().toLowerCase();
      if (!validateEmail(normalizedEmail)) {
         setLoginError("Enter a valid registered email.");
         return;
      }

      try {
         setLoginError("");
         const res = await fetch("/api/auth/email-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: normalizedEmail, purpose: "login" })
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
      const errors: Record<string, string> = {};
      if (formData.phone.trim().length < 14) {
         errors.phone = "Phone number must be exactly 10 digits (+91 00000 00000).";
      }
      if (!formData.name.trim()) errors.name = "Proprietor name is required.";
      if (!formData.shopName.trim()) errors.shopName = "Firm name is required.";
      if (!formData.city.trim()) errors.city = "City/Region is required.";
      if (!validateEmail(formData.email)) errors.email = "Valid email is required.";
      if (registerMethod === 'password') {
         if (formData.password.length < 8 || !/[A-Za-z]/.test(formData.password) || !/\d/.test(formData.password)) {
            errors.password = "Password must be 8+ chars with letters and numbers.";
         }
         if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
         }
      }
      if (registerMethod === 'email_otp' && !emailOtpVerified) {
         errors.emailOtp = "Verify your email OTP before continuing.";
      }

      if (Object.keys(errors).length > 0) {
         setFieldErrors(errors);
         return;
      }

      try {
         setIsSubmitting(true);
         const params = new URLSearchParams({
            phone: formData.phone,
            email: formData.email.trim().toLowerCase()
         });
         const res = await fetch(`/api/register?${params.toString()}`);
         const data = await res.json();
         if (data.phoneExists) {
            setRegisterError("PhoneAlreadyRegistered");
            return;
         }
         if (data.emailExists) {
            setRegisterError("EmailAlreadyRegistered");
            return;
         }
         setRegisterError("");
         setStep(2);
      } catch (err) {
         setRegisterError("Verification failed.");
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         const res = await fetch("/api/auth/email-otp", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: loginIdentifier.trim().toLowerCase(), otp: loginOtp, purpose: "login" })
         });
         const data = await res.json();

         if (data.success) {
            localStorage.setItem("current_user_phone", data.user?.phone || "");
            window.location.href = "/invoice-details";
         } else {
            setLoginError(data.message || "Invalid OTP.");
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
         if (key !== 'confirmPassword') {
            data.append(key, value);
         }
      });
      data.append('authMethod', registerMethod);
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
            setLoginStep(registerMethod === 'password' ? 'email' : 'email');
            setLoginMethod(registerMethod === 'password' ? 'password' : 'email_otp');
            setLoginIdentifier(formData.email.trim().toLowerCase());
            setStep(0);
            setEmailOtp("");
            setEmailOtpStatus("");
            setEmailOtpVerified(false);
          } else {
            setRegisterError(result.error || "Failed to submit.");
          }
      } catch (err) {
         setRegisterError("Network error. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="bg-white">
         {showEmailOtpToast && (
            <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-2xl">
               <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600">verified</span>
                  <div className="space-y-1">
                     <p className="text-sm font-black uppercase tracking-widest text-zinc-900">Email verified successfully</p>
                     <p className="text-xs text-zinc-600">Use the Next button below to continue.</p>
                  </div>
               </div>
            </div>
         )}
         {/* Optimized Responsive Hero Carousel */}
         <section className="relative h-[220px] md:min-h-[90vh] md:h-auto overflow-hidden bg-white select-none">
            <div className="absolute inset-0 z-0">
               {/* Slides Mapping */}
               {slides.map((slide, idx) => (
                  <div
                     key={idx}
                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
                         ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                     <img
                        src={slide.desktop}
                        className="w-full h-full object-cover hidden md:block" 
                        alt={`Sona Cereal Banner ${idx + 1}`}
                     />
                     <img
                        src={slide.mobile}
                        className="w-full h-full object-cover object-center md:hidden block"
                        alt={`Banner Mobile ${idx + 1}`}
                     />
                  </div>
               ))}
            </div>

            {/* Subdued Navigation Layer */}
            <div className="absolute inset-0 z-20 flex items-center justify-between px-2 md:px-4 group pointer-events-none">
               <button
                  onClick={prevSlide}
                  className="hidden md:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-black/5 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-black/10 pointer-events-auto"
               >
                  <span className="material-symbols-outlined text-zinc-900 text-xl md:text-2xl">arrow_back_ios_new</span>
               </button>
               <button
                  onClick={nextSlide}
                  className="hidden md:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-black/5 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-black/10 pointer-events-auto"
               >
                  <span className="material-symbols-outlined text-zinc-900 text-xl md:text-2xl">arrow_forward_ios</span>
               </button>
            </div>

            {/* Minimal Indicators */}
            <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
               {slides.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => setActiveSlide(i)}
                     className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${i === activeSlide ? 'bg-zinc-900 scale-125' : 'bg-zinc-400'}`}
                  />
               ))}
            </div>
         </section>

         {/* Essential Milestone Snapshot */}
         <section className="py-2 md:py-12 bg-white flex justify-center border-t border-zinc-100 relative z-20">
            <div className="flex gap-12 md:gap-32 items-center overflow-x-auto px-6 no-scrollbar py-2 w-full justify-start md:justify-center">
               {[
                  { label: "Active Retailers", val: "10K+" },
                  { label: "Rewards Tier", val: "Elite" },
                  { label: "Validation", val: "Instant" }
               ].map(stat => (
                  <div key={stat.label} className="text-center shrink-0 min-w-[120px]">
                     <span className="block text-3xl md:text-4xl font-headline font-black text-zinc-900 italic tracking-tighter leading-none mb-1">{stat.val}</span>
                     <span className="text-[9px] font-black text-[#CBA35C] uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
               ))}
            </div>
         </section>

         {/* Entry Section */}
         <section id="registration-section" className="py-6 md:py-24 bg-zinc-50 border-y border-zinc-100 scroll-mt-24">
            <div className="container mx-auto px-0 md:px-6">
               <div className="grid lg:grid-cols-12 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] md:rounded-[4rem] overflow-hidden bg-white border border-zinc-200">

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

                  <div className="lg:col-span-8 p-6 md:p-24 bg-white relative flex flex-col justify-center min-h-[500px] md:min-h-[600px]">

                     {mode === 'selection' ? (
                        <div className="space-y-12 text-center animate-in fade-in duration-700 slide-in-from-bottom-8">
                           <div className="space-y-4">
                              <h3 className="text-2xl md:text-5xl font-headline font-black uppercase text-zinc-900 leading-none italic">
                                 CHOOSE YOUR <br className="md:hidden" /> <span className="text-[#CBA35C]">ENTRY.</span>
                              </h3>
                              <p className="text-zinc-500 text-sm md:text-lg font-medium italic px-4">Welcome to the Sona Cereal Official Infrastructure.</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto pt-4 md:pt-8">
                              <button onClick={() => { setMode('login'); setLoginMethod('email_otp'); setLoginStep('email'); setLoginError(""); }} className="group p-6 md:p-10 bg-zinc-900 rounded-[2rem] md:rounded-[3rem] border border-white/10 text-white hover:scale-105 transition-all shadow-2xl relative overflow-hidden text-center flex items-center justify-center md:flex-col gap-6 md:gap-0">
                                 <div className="absolute top-0 right-0 w-32 h-22 bg-[#CBA35C]/20 rounded-full blur-3xl group-hover:bg-[#CBA35C]/40 transition-all"></div>
                                 <span className="material-symbols-outlined text-3xl md:text-5xl text-[#CBA35C] group-hover:rotate-12 transition-transform">login</span>
                                 <div className="text-left md:text-center relative z-10">
                                    <h4 className="text-xl md:text-2xl font-headline font-black uppercase italic leading-none mb-1 md:mb-2 text-white">LOGIN</h4>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Retailer Portal</p>
                                 </div>
                              </button>

                              <button onClick={() => { setMode('register'); setStep(1); setRegisterMethod('password'); setRegisterError(""); }} className="group p-6 md:p-10 bg-zinc-50 rounded-[2rem] md:rounded-[3rem] border border-zinc-100 text-zinc-900 hover:scale-105 transition-all shadow-xl relative overflow-hidden text-center flex items-center justify-center md:flex-col gap-6 md:gap-0">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#CBA35C]/5 rounded-full blur-3xl group-hover:bg-[#CBA35C]/10 transition-all"></div>
                                 <span className="material-symbols-outlined text-3xl md:text-5xl text-zinc-400 group-hover:rotate-12 transition-transform">how_to_reg</span>
                                 <div className="text-left md:text-center relative z-10">
                                    <h4 className="text-xl md:text-2xl font-headline font-black uppercase italic leading-none mb-1 md:mb-2 text-zinc-900">REGISTER</h4>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">New Partner Portal</p>
                                 </div>
                              </button>
                           </div>
                        </div>
                     ) : mode === 'login' ? (
                        <div className="space-y-10 animate-in fade-in duration-700 slide-in-from-right-8">
                           <div className="text-left space-y-4">
                              <button onClick={() => setMode('selection')} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                 <span className="material-symbols-outlined">west</span> Back to Choices
                              </button>
                              <h3 className="text-2xl md:text-5xl font-headline font-black uppercase text-zinc-900 leading-none italic">
                                 SECURE <span className="text-[#CBA35C]">LOGIN.</span>
                              </h3>
                               <p className="text-zinc-400 text-sm md:text-lg font-medium italic">
                                  {loginMethod === 'email_otp'
                                     ? (loginStep === 'email' ? 'Enter your registered email to receive a secure code.' : 'Enter the 6-digit code sent to your email.')
                                     : 'Use your registered email or phone number with the password you created.'}
                               </p>
                            </div>

                            <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-1 w-fit">
                               <button
                                  type="button"
                                  onClick={() => { setLoginMethod('email_otp'); setLoginStep('email'); setLoginError(""); }}
                                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${loginMethod === 'email_otp' ? 'bg-zinc-900 text-white' : 'text-zinc-500'}`}
                               >
                                  Email OTP
                               </button>
                              <button
                                 type="button"
                                 onClick={() => { setLoginMethod('password'); setLoginError(""); }}
                                 className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${loginMethod === 'password' ? 'bg-zinc-900 text-white' : 'text-zinc-500'}`}
                              >
                                 Password
                              </button>
                           </div>

                            <form onSubmit={loginMethod === 'email_otp' ? (loginStep === 'email' ? handleSendLoginOtp : handleLoginSubmit) : handlePasswordLogin} className="space-y-6 max-w-md">
                              {loginMethod === 'email_otp' ? (
                                 loginStep === 'email' ? (
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Registered Email</label>
                                       <input
                                          type="email"
                                          value={loginIdentifier}
                                          onChange={(e) => setLoginIdentifier(e.target.value)}
                                          placeholder="name@example.com"
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
                                          placeholder="Enter 6-digit OTP"
                                          className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-medium text-center text-3xl tracking-[0.5em]"
                                          maxLength={6}
                                          required
                                       />
                                       <button type="button" onClick={() => setLoginStep('email')} className="text-[10px] font-black uppercase tracking-widest text-[#CBA35C] hover:underline mt-2">Change Email</button>
                                    </div>
                                 )
                              ) : (
                                 <>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Registered Email</label>
                                       <input
                                          type="email"
                                          value={loginIdentifier}
                                          onChange={(e) => setLoginIdentifier(e.target.value)}
                                          placeholder="name@example.com"
                                          className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-medium"
                                          required
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Password</label>
                                       <input
                                          type="password"
                                          value={loginPassword}
                                          onChange={(e) => setLoginPassword(e.target.value)}
                                          placeholder="Enter your password"
                                          className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-medium"
                                          required
                                       />
                                    </div>
                                 </>
                              )}

                              {loginError && (
                                 <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
                                    {loginMethod === 'email_otp' && loginError === "This email is not registered." ? (
                                       <div className="flex flex-col gap-3 items-start">
                                          <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                             This email is not registered in our retailer database.
                                          </p>
                                          <button
                                             type="button"
                                             onClick={() => { setMode('register'); setStep(1); setRegisterMethod('password'); setLoginError(""); setFormData(prev => ({ ...prev, email: loginIdentifier })); }}
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
                                 {loginMethod === 'email_otp'
                                    ? (loginStep === 'email' ? 'GENERATE SECURE CODE' : 'VALIDATE & ACCESS PORTAL')
                                    : 'LOGIN WITH PASSWORD'}
                                 <span className="material-symbols-outlined">
                                    {loginMethod === 'email_otp' ? (loginStep === 'email' ? 'send' : 'verified_user') : 'key'}
                                 </span>
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
                                 <span className="text-[#CBA35C] font-black uppercase tracking-widest text-[10px] md:text-xs text-left block">Phase {step} of 3</span>
                                 <h3 className="text-2xl md:text-5xl font-headline font-black uppercase text-zinc-900 mt-2 leading-none italic text-left">
                                    {step === 1 ? "PROFILE" : step === 2 ? "IDENTITY" : "VALIDATE"}
                                 </h3>
                                 <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[#CBA35C] mt-4 md:mt-6"></div>
                              </div>
                           </div>

                           <form className="space-y-8 md:space-y-10" onSubmit={step === 3 ? handleFinalSubmit : (e) => e.preventDefault()}>
                              {step === 1 && (
                                 <div className="space-y-6 md:space-y-10">
                                    <div className="space-y-4 text-left">
                                       <label className="text-[10px] mr-4 font-black uppercase tracking-widest text-zinc-500 italic">Registration Method</label>
                                       <div className="mt-2 inline-flex rounded-full border-2 border-zinc-200 bg-white p-2 shadow-sm gap-2">
                                          <button
                                             type="button"
                                             onClick={() => { setRegisterMethod('password'); setEmailOtpVerified(false); setEmailOtpStatus(""); setRegisterError(""); }}
                                             className={`px-5 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-widest transition-all ${registerMethod === 'password' ? 'bg-zinc-900 text-white shadow-lg' : 'bg-white text-zinc-700'}`}
                                          >
                                             Password Signup
                                          </button>
                                          <button
                                             type="button"
                                             onClick={() => { setRegisterMethod('email_otp'); setRegisterError(""); }}
                                             className={`px-5 py-2.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-widest transition-all ${registerMethod === 'email_otp' ? 'bg-zinc-900 text-white shadow-lg' : 'bg-white text-zinc-700'}`}
                                          >
                                             Email OTP Signup
                                          </button>
                                       </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 text-left">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">person</span> Propriertor Name
                                          </label>
                                          <input
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}
                                             className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.name ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                             placeholder="Full name"
                                             type="text"
                                             required
                                          />
                                          {fieldErrors.name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.name}</p>}
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">storefront</span> Shop / Entity Name
                                          </label>
                                          <input
                                             name="shopName"
                                             value={formData.shopName}
                                             onChange={handleInputChange}
                                             className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.shopName ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                             placeholder="Firm name"
                                             type="text"
                                             required
                                          />
                                          {fieldErrors.shopName && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.shopName}</p>}
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">smartphone</span> Primary Contact
                                          </label>
                                          <input
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleInputChange}
                                             className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.phone ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                             placeholder="+91 00000 00000"
                                             type="tel"
                                             required
                                          />
                                          {fieldErrors.phone && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.phone}</p>}
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">mail</span> Business Email
                                          </label>
                                          <input
                                             name="email"
                                             value={formData.email}
                                             onChange={handleInputChange}
                                             className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.email ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                             placeholder="retailer@example.com"
                                             type="email"
                                             required
                                          />
                                          {fieldErrors.email && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                             <span className="material-symbols-outlined text-sm text-[#CBA35C]">location_on</span> City / Region
                                          </label>
                                          <input
                                             name="city"
                                             value={formData.city}
                                             onChange={handleInputChange}
                                             className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.city ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                             placeholder="City, State"
                                             type="text"
                                             required
                                          />
                                          {fieldErrors.city && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.city}</p>}
                                        </div>
                                     </div>

                                     {registerMethod === 'password' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 text-left">
                                           <div className="space-y-2">
                                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                                 <span className="material-symbols-outlined text-sm text-[#CBA35C]">key</span> Create Password
                                              </label>
                                              <input
                                                 name="password"
                                                 value={formData.password}
                                                 onChange={handleInputChange}
                                                 className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.password ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                                 placeholder="Minimum 8 characters"
                                                 type="password"
                                                 required
                                              />
                                              {fieldErrors.password && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.password}</p>}
                                           </div>
                                           <div className="space-y-2">
                                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                                                 <span className="material-symbols-outlined text-sm text-[#CBA35C]">verified</span> Confirm Password
                                              </label>
                                              <input
                                                 name="confirmPassword"
                                                 value={formData.confirmPassword}
                                                 onChange={handleInputChange}
                                                 className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-zinc-50 border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-zinc-100'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors`}
                                                 placeholder="Re-enter password"
                                                 type="password"
                                                 required
                                              />
                                              {fieldErrors.confirmPassword && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.confirmPassword}</p>}
                                           </div>
                                        </div>
                                     ) : (
                                        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 md:p-8 text-left space-y-5">
                                           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                              <div>
                                                 <h4 className="text-lg font-headline font-black uppercase italic text-zinc-900">Verify Email OTP</h4>
                                                 <p className="text-zinc-500 text-xs">Send a 6-digit code to the business email and verify it before moving ahead.</p>
                                              </div>
                                              <button type="button" onClick={handleSendEmailOtp} className="px-6 py-3.5 rounded-full bg-zinc-900 text-white text-[11px] md:text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#CBA35C] hover:text-black transition-all">
                                                 Send OTP
                                              </button>
                                           </div>
                                           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                                              <div className="space-y-2">
                                                 <input
                                                    value={emailOtp}
                                                    onChange={(e) => { setEmailOtp(e.target.value); setEmailOtpVerified(false); }}
                                                    className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-white border ${fieldErrors.emailOtp ? 'border-red-500' : 'border-zinc-200'} font-medium focus:border-[#CBA35C] outline-none text-base md:text-lg text-zinc-900 placeholder:text-zinc-400 transition-colors tracking-[0.25em] text-center`}
                                                    placeholder="000000"
                                                    type="text"
                                                    maxLength={6}
                                                 />
                                                 {fieldErrors.emailOtp && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest italic">{fieldErrors.emailOtp}</p>}
                                                 {emailOtpStatus && (
                                                    <p className={`text-[11px] md:text-xs font-black uppercase tracking-widest ${emailOtpVerified ? 'text-green-700' : 'text-zinc-500'}`}>
                                                       {emailOtpStatus}
                                                    </p>
                                                 )}
                                                 {emailOtpVerified && (
                                                    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-green-700">
                                                       <span className="material-symbols-outlined text-base">check_circle</span>
                                                       Email verified
                                                    </div>
                                                 )}
                                              </div>
                                              <button type="button" onClick={handleVerifyEmailOtp} className="px-6 py-4 rounded-full border-2 border-zinc-900 bg-white text-zinc-900 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] shadow-sm hover:border-[#CBA35C] hover:text-[#CBA35C] transition-all">
                                                 Verify OTP
                                              </button>
                                           </div>
                                        </div>
                                     )}

                                     {registerError && (
                                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in mt-4 text-left">
                                          {registerError === "PhoneAlreadyRegistered" ? (
                                             <div className="flex flex-col gap-3 items-start">
                                                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                                   This number is already registered for another business.
                                                </p>
                                                <button
                                                   type="button"
                                                   onClick={() => { setMode('login'); setLoginMethod('email_otp'); setLoginStep('email'); setRegisterError(""); setLoginIdentifier(formData.email.trim().toLowerCase()); }}
                                                   className="text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-white px-4 py-2 rounded-lg border border-red-200 hover:bg-zinc-50 transition-all flex items-center gap-2"
                                                >
                                                   GO TO LOGIN <span className="material-symbols-outlined text-sm">mail</span>
                                                </button>
                                             </div>
                                          ) : registerError === "EmailAlreadyRegistered" ? (
                                             <div className="flex flex-col gap-3 items-start">
                                                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                                   This email is already registered in the retailer database.
                                                </p>
                                                <button
                                                   type="button"
                                                   onClick={() => { setMode('login'); setLoginMethod('password'); setRegisterError(""); setLoginIdentifier(formData.email.trim().toLowerCase()); }}
                                                   className="text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-white px-4 py-2 rounded-lg border border-red-200 hover:bg-zinc-50 transition-all flex items-center gap-2"
                                                >
                                                   LOGIN WITH PASSWORD <span className="material-symbols-outlined text-sm">key</span>
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
                                 <div className="space-y-6 md:space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                                       <div className="border-2 border-dashed border-zinc-200 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center flex flex-col items-center gap-4 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                             <span className="material-symbols-outlined text-3xl md:text-5xl text-[#CBA35C] font-black">badge</span>
                                          </div>
                                          <div className="space-y-1 md:space-y-2">
                                             <h4 className="text-lg md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">ID FRONT</h4>
                                             <p className="text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Aadhar Front Side</p>
                                          </div>
                                          <label className={`px-8 md:px-10 py-3 md:py-4 ${aadharFront ? 'bg-green-500' : 'bg-zinc-900'} text-white rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all`}>
                                             {aadharFront ? 'FILE SELECTED' : 'CLICK TO SELECT'}
                                             <input type="file" className="hidden" onChange={(e) => setAadharFront(e.target.files?.[0] || null)} />
                                          </label>
                                       </div>

                                       <div className="border-2 border-dashed border-zinc-200 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-center flex flex-col items-center gap-4 md:gap-8 bg-zinc-50 hover:bg-zinc-100/50 transition-all group/upload">
                                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                                             <span className="material-symbols-outlined text-3xl md:text-5xl text-[#CBA35C] font-black">receipt_long</span>
                                          </div>
                                          <div className="space-y-1 md:space-y-2">
                                             <h4 className="text-lg md:text-2xl font-headline font-black uppercase tracking-tight text-zinc-900 italic">ID BACK</h4>
                                             <p className="text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Aadhar Back Side</p>
                                          </div>
                                          <label className={`px-8 md:px-10 py-3 md:py-4 ${aadharBack ? 'bg-green-500' : 'bg-zinc-900'} text-white rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#CBA35C] hover:text-black transition-all`}>
                                             {aadharBack ? 'FILE SELECTED' : 'CLICK TO SELECT'}
                                             <input type="file" className="hidden" onChange={(e) => setAadharBack(e.target.files?.[0] || null)} />
                                          </label>
                                       </div>
                                    </div>
                                    {fieldErrors.aadhar && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest italic text-center mb-6">{fieldErrors.aadhar}</p>}
                                    <div className="flex items-center justify-between pt-10 border-t border-zinc-100">
                                       <button type="button" onClick={() => { setStep(step - 1); setFieldErrors({}); }} className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-all p-4 active:scale-90">
                                          <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-all">
                                             <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                                          </div>
                                          <span className="font-headline font-black text-sm uppercase tracking-widest italic">Back</span>
                                       </button>
                                       <button 
                                          type="button" 
                                          onClick={() => {
                                             if (!aadharFront || !aadharBack) {
                                                setFieldErrors({ aadhar: "Please upload both front and back sides of Aadhar ID." });
                                                return;
                                             }
                                             setFieldErrors({});
                                             setStep(3);
                                          }} 
                                          className="group flex items-center gap-4 text-zinc-900 hover:text-[#CBA35C] transition-all p-4 active:scale-90"
                                       >
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
