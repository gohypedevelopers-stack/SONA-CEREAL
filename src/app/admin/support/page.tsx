"use client";

import React, { useState, useEffect } from "react";

export default function AdminSupportPage() {
   const [tickets, setTickets] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchTickets = async () => {
      try {
         const res = await fetch("/api/admin/support");
         if (res.ok) {
            const data = await res.json();
            setTickets(data);
         }
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const updateStatus = async (id: string, currentStatus: string) => {
      const nextStatus = currentStatus === "pending" ? "resolved" : "pending";
      try {
         const res = await fetch("/api/admin/support", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: nextStatus }),
         });
         if (res.ok) {
            fetchTickets();
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchTickets();
   }, []);

   return (
      <div className="p-8 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <h1 className="font-headline font-black text-4xl md:text-7xl italic uppercase text-zinc-900 leading-[0.85] tracking-tighter">
                  SUPPORT <br />
                  <span className="text-[#CBA35C]">MESSAGES.</span>
               </h1>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mt-4">Partner Relations Command Center</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-white/5 flex gap-12 text-white">
               <div>
                  <span className="block text-[8px] font-black uppercase tracking-widest text-[#CBA35C] mb-1">Total Queries</span>
                  <span className="text-3xl font-headline font-black italic">{tickets.length}</span>
               </div>
               <div className="border-l border-white/10 pl-12">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Pending Responses</span>
                  <span className="text-3xl font-headline font-black italic text-rose-500">
                     {tickets.filter(t => t.status === 'pending').length}
                  </span>
               </div>
            </div>
         </div>

         {loading ? (
            <div className="py-24 text-center">
               <div className="w-12 h-12 border-4 border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin mx-auto"></div>
            </div>
         ) : tickets.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-zinc-200 rounded-[3rem] p-24 text-center">
               <p className="text-zinc-400 font-headline font-black text-3xl uppercase italic tracking-tighter">No Messages Found.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-6">
               {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                     <div className={`absolute top-0 right-0 w-2 h-full ${ticket.status === 'pending' ? 'bg-rose-500' : 'bg-green-500'}`}></div>
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-3">
                           <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Partner Credential</span>
                           <h3 className="text-2xl font-headline font-black text-zinc-900 italic uppercase leading-none">{ticket.phone}</h3>
                           <div className="mt-2 inline-flex items-center gap-2 bg-[#CBA35C]/10 px-3 py-1 rounded-full border border-[#CBA35C]/20">
                              <span className="text-[9px] font-black uppercase tracking-widest text-[#CBA35C]">{ticket.category}</span>
                           </div>
                        </div>
                        <div className="lg:col-span-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                           <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-2 italic">Partner Transmission:</span>
                           <p className="text-zinc-600 font-medium text-sm leading-relaxed">{ticket.message}</p>
                        </div>
                        <div className="lg:col-span-3 flex flex-col items-end gap-4">
                           <div className="text-right">
                              <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Time Logged</span>
                              <span className="text-xs font-black uppercase italic text-zinc-900">{new Date(ticket.createdAt).toLocaleString()}</span>
                           </div>
                           <button 
                              onClick={() => updateStatus(ticket.id, ticket.status)}
                              className={`w-full py-4 rounded-2xl font-headline font-black uppercase text-xs tracking-widest transition-all ${ticket.status === 'pending' ? 'bg-zinc-900 text-white hover:bg-rose-600' : 'bg-green-500 text-white hover:bg-zinc-900'}`}
                           >
                              {ticket.status === 'pending' ? 'Mark Resolved' : 'Re-open Ticket'}
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
