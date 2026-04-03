"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function InvoiceDetailsPage() {
   const [phone, setPhone] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formData, setFormData] = useState({
      date: "",
      invoiceNo: "",
      capacity: ""
   });

   useEffect(() => {
      const storedPhone = localStorage.getItem("current_user_phone");
      if (storedPhone) {
         setPhone(storedPhone);
      } else {
         window.location.href = "/";
      }
   }, []);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const res = await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               phone,
               invoiceNo: formData.invoiceNo,
               invoiceDate: formData.date,
               capacity: formData.capacity
            })
         });
         const result = await res.json();
         if (result.success) {
            alert("Voucher details submitted successfully!");
            window.location.href = "/redeem";
         } else {
            alert("Error: " + (result.error || "Failed to submit."));
         }
      } catch (err) {
         alert("Network error.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="bg-white min-h-screen font-body">
         {/* HEADER */}
         <section className="pt-32 pb-12 bg-white text-center">
            <div className="container mx-auto px-6">
               <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-1.5 rounded-full border border-white/10 mb-8">
                  <span className="w-1.5 h-1.5 bg-[#CBA35C] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Submission Portal</span>
               </div>
               <h2 className="font-headline font-black text-4xl md:text-7xl italic uppercase text-zinc-900 leading-none tracking-tighter mb-4">
                  INVOICE <br />
                  <span className="text-[#CBA35C]">DETAILS.</span>
               </h2>
               <p className="text-zinc-400 font-medium italic text-lg uppercase tracking-widest">Submit your performance records for validation.</p>
            </div>
         </section>

         {/* FORM SECTION */}
         <section className="pb-24 bg-white">
            <div className="container mx-auto px-6 max-w-2xl">
               <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 md:p-16 rounded-[4rem] border border-zinc-100 shadow-2xl space-y-10">
                  <div className="grid gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-[#CBA35C]">calendar_month</span> Invoice Date
                        </label>
                        <input
                           name="date"
                           value={formData.date}
                           onChange={handleInputChange}
                           className="w-full p-6 rounded-3xl bg-white border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 shadow-inner"
                           type="date"
                           required
                        />
                     </div>
                     
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-[#CBA35C]">description</span> Invoice Number
                        </label>
                        <input
                           name="invoiceNo"
                           value={formData.invoiceNo}
                           onChange={handleInputChange}
                           className="w-full p-6 rounded-3xl bg-white border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 shadow-inner"
                           placeholder="INV-00000"
                           type="text"
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-[#CBA35C]">reorder</span> Quantity (Qtl)
                        </label>
                        <input
                           name="capacity"
                           value={formData.capacity}
                           onChange={handleInputChange}
                           className="w-full p-6 rounded-3xl bg-white border border-zinc-100 font-medium focus:border-[#CBA35C] outline-none text-lg text-zinc-900 shadow-inner"
                           placeholder="Enter quantity (e.g. 189.9)"
                           type="text"
                           required
                        />
                     </div>

                  </div>

                  <div className="pt-8 space-y-6">
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zinc-900 text-white py-8 rounded-[2.5rem] font-headline font-black uppercase text-xl hover:bg-[#CBA35C] hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 group"
                     >
                        {isSubmitting ? 'PROCESSING...' : 'SUBMIT RECORDS'}
                        <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">rocket_launch</span>
                     </button>
                     
                     <Link href="/dashboard" className="block text-center text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-zinc-900 transition-colors underline">
                        Skip for now, view dashboard
                     </Link>
                  </div>
               </form>
            </div>
         </section>
      </div>
   );
}
