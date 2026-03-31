"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-white relative overflow-hidden pt-24 pb-12">
      {/* Giant Watermark Background */}
      <div className="absolute -bottom-10 -left-10 text-[18vw] font-headline font-black italic text-white/[0.03] leading-none pointer-events-none select-none uppercase tracking-tighter">
        SONA PORTAL
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <img
                src="/logo-blank.png"
                alt="Sona Cereal Logo"
                className="h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-headline font-black italic uppercase leading-none text-white">
                  SONA CEREAL
                </span>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
                  Pure Rice From Indian Soil
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">
              Defining the next generation of consumer rewards through
              high-performance grains and seamless digital redemption. Join the
              Sona Cereal elite circle today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="X (formerly Twitter)"
              >
                {/* FontAwesome icons would need to be added, using a placeholder for now or standard SVG */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                Portal
              </span>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Registration
                </Link>
                <Link
                  href="/redeem"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  How to Redeem
                </Link>
                <Link
                  href="/helpdesk"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Helpcenter
                </Link>
              </nav>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                Legal
              </span>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/terms"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Terms of Use
                </Link>
                <Link
                  href="/terms"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Cookie Control
                </Link>
              </nav>
            </div>
            <div className="space-y-6 col-span-2 md:col-span-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                Support
              </span>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                  Stuck on a voucher or grain query? Our elite team is ready.
                </p>
                <Link
                  href="/helpdesk"
                  className="inline-flex items-center gap-2 text-sm font-black uppercase italic text-primary hover:gap-3 transition-all"
                >
                  Open Ticket{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            &copy; {new Date().getFullYear()} SONA CEREAL PVT LTD. ALL RIGHTS
            RESERVED.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-primary transition-colors italic">
              Back to summit
            </span>
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-sm group-hover:-translate-y-1 transition-transform">
                arrow_upward
              </span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
