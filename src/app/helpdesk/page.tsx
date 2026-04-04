"use client";

import React, { useState } from "react";

export default function HelpdeskPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1); // Default item 2 open as in original

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const faqs = [
    {
      id: 0,
      question: "Where is my voucher code?",
      answer:
        "Your voucher code is sent via SMS within 5 minutes of a successful purchase. You can also find it in the 'My Rewards' section of your profile dashboard.",
    },
    {
      id: 1,
      question: "How long does UPI transfer take?",
      answer:
        "Standard UPI transfers are processed instantly but can take up to 24-48 business hours depending on bank server availability. If your payment is pending, please wait 2 hours before contacting support.",
    },
    {
      id: 2,
      question: "What is the daily jackpot?",
      answer:
        "The daily jackpot is a high-stakes draw happening every night at 9 PM. Every rice pack scan earns you 1 entry. The more you scan, the higher your odds!",
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
              Registration
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Account setup, phone verification, and profile updates.
            </p>
          </div>
          {/* Voucher Issues */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                confirmation_number
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              Voucher Issues
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Missing codes, expired vouchers, or redemption errors.
            </p>
          </div>
          {/* UPI Payments */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                account_balance_wallet
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              UPI Payments
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Cashback tracking, bank link issues, and payout times.
            </p>
          </div>
          {/* Prizes & Rewards */}
          <div className="bg-white border border-zinc-100 p-8 rounded-xl group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
            <div className="bg-primary group-hover:bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-3xl">
                military_tech
              </span>
            </div>
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-zinc-900 group-hover:text-black mb-2">
              Prizes &amp; Rewards
            </h3>
            <p className="text-zinc-500 group-hover:text-black/70 text-sm">
              Jackpot mechanics, physical prizes, and delivery status.
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
          {/* Right Side: Contact Form */}
          <div className="md:w-1/2 px-6 py-10 md:p-12 bg-zinc-900 text-white">
            <h3 className="font-headline font-black text-xl md:text-2xl uppercase tracking-widest mb-8 text-primary">
              SEND A MESSAGE
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  Issue Category
                </label>
                <select className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm text-white appearance-none">
                  <option>Select an option</option>
                  <option>Registration Issue</option>
                  <option>Voucher Not Received</option>
                  <option>Payment Failure</option>
                  <option>Other Query</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm"
                    placeholder="+91 00000 00000"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-zinc-400 mb-2">
                    Ticket ID (Optional)
                  </label>
                  <input
                    className="w-full bg-zinc-800 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm"
                    placeholder="#12345"
                    type="text"
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
                ></textarea>
              </div>
              <button
                className="w-full bg-primary text-black py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(203,163,92,0.4)] transition-all shadow-lg"
                type="submit"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
