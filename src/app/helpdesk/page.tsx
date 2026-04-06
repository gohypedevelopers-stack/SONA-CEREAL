"use client";

import React, { useState } from "react";

export default function HelpdeskPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [formData, setFormData] = useState({
     category: "",
     phone: "+91 ",
     message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.category || formData.phone.length < 14 || !formData.message) {
         setSubmitError("Please fill all fields accurately.");
         return;
      }
      setLoading(true);
      setSubmitError("");
      try {
         const res = await fetch("/api/support", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (data.success) {
            setSuccess(true);
            setFormData({ category: "", phone: "+91 ", message: "" });
         } else {
            setSubmitError(data.error || "Submission failed.");
         }
      } catch (err) {
         setSubmitError("Connection error.");
      } finally {
         setLoading(false);
      }
   };

  const faqs = [
    {
      id: 0,
      question: "When will my submitted QTL be updated?",
      answer:
        "Standard invoice verification takes 24-48 hours. Once our audit team confirms the authenticity of the bill, the Quantity (QTL) will automatically sync to your dashboard and contribute to your Slab achievement.",
    },
    {
      id: 1,
      question: "Why was my invoice rejected?",
      answer:
        "Invoices are typically rejected if the image is blurry, the bill date falls outside the promotion window, or if it lacks a clear Sona Cereal itemized entry. We recommend re-uploading a high-resolution scan.",
    },
    {
      id: 2,
      question: "Can I redeem gifts multiple times?",
      answer:
        "Gifts can be selected once per Slab milestone. As you progress from 200 QTL to higher tiers (up to 1000 QTL), you unlock new gift selections. Final redemption happens at the end of the campaign period.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Helpdesk Hero Header */}
      <section className="relative md:min-h-[480px] flex items-center bg-zinc-50 overflow-hidden pt-14 md:pt-16 -skew-y-3 origin-left">

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center skew-y-3">
          <h1 className="font-headline font-black text-zinc-900 text-3xl md:text-8xl italic uppercase leading-[0.8] tracking-tighter mb-6 font-headline">
            Support <br />
            <span className="text-primary">Center</span>
          </h1>
          <p className="font-body text-xl text-zinc-600 max-w-2xl mx-auto font-medium">
            Fueling your journey to rewards. Find solutions fast or reach out to
            our pit crew.
          </p>
        </div>
      </section>

      {/* Search Section (Overlapping Hero) */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
        <div className="bg-white p-4 rounded-full shadow-2xl flex items-center gap-4 transition-all focus-within:ring-4 focus-within:ring-primary/20 border border-zinc-100">
          <span className="material-symbols-outlined text-primary text-3xl ml-4">
            search
          </span>
          <input
            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium placeholder:text-zinc-400 text-zinc-900"
            placeholder="Find answers instantly..."
            type="text"
          />
          <button className="hidden md:block bg-primary text-black font-headline font-black uppercase px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(203,163,92,0.4)] transition-all tracking-wider">
            Search
          </button>
        </div>
      </section>

      {/* FAQ Categories: Bento Grid Style */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Registration */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-black w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-black group-hover:text-primary text-3xl">
                person_add
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              Onboarding
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Retailer profile setup, business verification, and login help.
            </p>
          </div>
          {/* Redemption Support */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                military_tech
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              Redemptions
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Slab milestone rewards, gift selection, and logistics.
            </p>
          </div>
          {/* QTL Tracking */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                monitoring
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              QTL Tracking
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Invoice processing time, audit status, and sync issues.
            </p>
          </div>
          {/* Business Support */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                storefront
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              Business Ops
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Territory queries, sales policy, and partner guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Popular FAQs: Accordion Section */}
      <section className="bg-zinc-50 py-10 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-headline font-black text-4xl uppercase tracking-tighter mb-12 flex items-center gap-4 text-zinc-900">
            <span className="w-12 h-1 bg-primary"></span>
            Popular Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all border border-zinc-100 ${openFaq === faq.id ? "border-l-4 border-l-primary" : ""
                  }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openFaq === faq.id ? "bg-zinc-50" : "hover:bg-zinc-50"
                    }`}
                >
                  <span className="font-bold text-lg text-zinc-900">{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-primary transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""
                      }`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`px-6 text-zinc-600 text-sm border-t border-zinc-100 transition-all ${openFaq === faq.id ? "py-6 opacity-100 block" : "h-0 opacity-0 hidden"
                    }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section: High Contrast CTA */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-24">
        <div className="bg-white rounded-3xl overflow-hidden relative flex flex-col md:flex-row border border-zinc-100 shadow-xl">
          {/* Left Side: Visual/Headline */}
          <div className="md:w-1/2 px-6 py-12 md:p-12 bg-primary flex flex-col justify-center relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img
                className="w-full h-full object-cover"
                alt="Technical support professional"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGUmQSQ2L3zu-Dy0BY8h3orpwSecYq55k-R2vyy-aX5iOlRAML_rO_f-LL_lNSXcrcrl-TKu0GoKrfiZs4a-Q3CIFBUWf1mjx12fgc5sT-7S221fV64OS_QGuk1git7A73rJNo7L51i4doO2Kg7-0y_3tdtWX-yzVEsnoa5Rd8SEo0Llpq81VyVmSp83v_iNC-ROvumSjqIQK5AzXK-9jXfj5R7SaJmtFOSscYwimigYaFhiqWRv0PVeYiBn-I-3nY7JG-el0fBGc"
              />
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl text-black uppercase tracking-tighter leading-none mb-6 relative z-10">
              STILL STUCK IN THE PITS?
            </h2>
            <p className="text-zinc-600 text-base md:text-xl max-w-lg mb-10 font-medium relative z-10">
              Our dedicated support team is available 24/7 to assist you with
              any queries or concerns.
            </p>
            <div className="flex flex-wrap gap-4 relative z-10">
              <a
                className="bg-black text-primary flex items-center gap-2 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                href="https://wa.me/919012182182"
                target="_blank"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp
              </a>
              <a
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-2 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all text-sm md:text-base"
                href="mailto:garv@sonacereal.com"
              >
                <span className="material-symbols-outlined">mail</span>

              </a>
            </div>
          </div>
          <div className="md:w-1/2 px-6 py-10 md:p-12 bg-zinc-900 text-white">
            <h3 className="font-headline font-black text-xl md:text-2xl uppercase tracking-widest mb-8 text-primary">
              SEND A MESSAGE
            </h3>
            {success ? (
               <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center space-y-4">
                  <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                  <h4 className="font-headline font-black text-xl uppercase italic">Message Sent</h4>
                  <p className="text-zinc-400 text-sm">Our elite support team will reach out to you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="text-primary font-black text-[10px] uppercase tracking-widest underline pt-4">Send another message</button>
               </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  Issue Category
                </label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm text-white appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Registration Issue">Registration Issue</option>
                  <option value="Redemption Problem">Redemption Problem</option>
                  <option value="QTL Discrepancy">QTL Discrepancy</option>
                  <option value="Other Query">Other Query</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm"
                    placeholder="+91 00000 00000"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => {
                       if (e.target.value.startsWith('+91 ')) {
                          setFormData(prev => ({ ...prev, phone: e.target.value }));
                       }
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Tell us how we can help..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                ></textarea>
              </div>
              {submitError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{submitError}</p>}
              <button
                className="w-full bg-primary text-black py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(203,163,92,0.4)] transition-all shadow-lg disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Send Message'}
              </button>
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
