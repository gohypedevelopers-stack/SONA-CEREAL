"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
