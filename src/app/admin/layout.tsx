"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
     const auth = localStorage.getItem("sona_admin_auth");
     if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
     e.preventDefault();
     if (password === "SONA@2026") {
        setIsAuthenticated(true);
        localStorage.setItem("sona_admin_auth", "true");
        setError("");
     } else {
        setError("Invalid Access Key");
     }
  };

  if (!isAuthenticated) {
     return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#CBA35C]/5 rounded-full blur-[150px]"></div>
           <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-white/5 rounded-full blur-[150px]"></div>
           
           <div className="max-w-md w-full relative z-10 space-y-12">
              <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <h1 className="text-4xl md:text-6xl font-headline font-black italic text-white leading-none tracking-tighter">
                    COMMAND <br />
                    <span className="text-[#CBA35C]">CENTER.</span>
                 </h1>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em] mt-4">Authorized Personnel Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6 bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl scale-in-center animate-in zoom-in-95 duration-500">
                 <div className="space-y-2">
                    <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Access Key</label>
                    <input 
                       type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••"
                       className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-white font-headline text-xl focus:ring-2 focus:ring-[#CBA35C] outline-none transition-all text-center tracking-widest"
                       autoFocus
                    />
                 </div>
                 {error && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}
                 <button type="submit" className="w-full bg-[#CBA35C] text-black py-4 md:py-6 rounded-2xl font-headline font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#CBA35C]/10">
                    Enter System
                 </button>
              </form>
              <div className="text-center pt-8">
                 <Link href="/" className="text-zinc-600 text-[8px] font-black uppercase tracking-widest hover:text-white transition-colors underline">Return to public portal</Link>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-body">
      {/* Sidebar - Fixed */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 text-white p-8 hidden lg:flex flex-col z-50">
        <div className="mb-12">
          <h1 className="text-2xl font-headline font-black italic">
            SONA <span className="text-[#CBA35C]">ADMIN</span>
          </h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Command Center 2026</p>
        </div>

        <nav className="space-y-4 flex-grow">
          <Link 
            href="/admin/submissions"
            className={`flex items-center gap-3 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${pathname === '/admin/submissions' ? 'bg-[#CBA35C] text-black shadow-xl shadow-[#CBA35C]/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">dashboard</span> Submissions
          </Link>
          
          <Link 
            href="/admin/registrations"
            className={`flex items-center gap-3 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${pathname === '/admin/registrations' ? 'bg-[#CBA35C] text-black shadow-xl shadow-[#CBA35C]/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">corporate_fare</span> Business Regs
          </Link>

          <Link 
            href="/admin/slabs"
            className={`flex items-center gap-3 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${pathname === '/admin/slabs' ? 'bg-[#CBA35C] text-black shadow-xl shadow-[#CBA35C]/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">emoji_events</span> Manage Slabs
          </Link>

          <Link 
            href="/admin/support"
            className={`flex items-center gap-3 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${pathname === '/admin/support' ? 'bg-[#CBA35C] text-black shadow-xl shadow-[#CBA35C]/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">support_agent</span> Support Queries
          </Link>
        </nav>

        <Link href="/" className="flex items-center gap-3 p-4 text-zinc-400 hover:text-white transition-colors font-black text-xs uppercase tracking-widest mt-auto">
          <span className="material-symbols-outlined">logout</span> View Portal
        </Link>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {children}
      </div>
    </div>
  );
}
