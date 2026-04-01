"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sona_user_session");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, []);

  const navLinks = [
    { name: "Register", href: "/" },
    { name: "Slabs", href: "/milestones" },
    { name: "Redeem", href: "/redeem" },
    { name: "Terms", href: "/terms" },
    { name: "Helpdesk", href: "/helpdesk" },
  ];

  return (
    <>
      <header
        id="mainNav"
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 transition-all duration-500 ${isScrolled ? "py-2" : "py-6"
          }`}
      >
        <div className="max-w-[1440px] mx-auto bg-white/90 backdrop-blur-2xl border border-zinc-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-6 md:px-10 py-3 flex items-center justify-between relative transition-all duration-500">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group min-w-0 flex-1 md:flex-none">
            <img src="/logo-blank.png" alt="Sona Cereal" className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs md:text-xl font-headline font-black italic uppercase leading-none text-zinc-900 group-hover:text-primary transition-colors truncate">
                SONA CEREAL
              </span>
              <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-primary/70 transition-colors">
                Pure Rice From Indian Soil
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative py-2 group">
                  <span
                    className={`text-sm font-headline font-black uppercase tracking-wider transition-colors ${isActive
                      ? "text-primary italic"
                      : "text-zinc-500 hover:text-zinc-900"
                      }`}
                  >
                    {link.name}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-full transition-all duration-300"
              title="Logout Partner Session"
            >
              <span className="material-symbols-outlined text-2xl">logout</span>
            </button>
            <Link
              href="/dashboard"
              className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 shadow-xl group/dashboard border border-zinc-100/50 ${pathname === "/dashboard"
                  ? "bg-[#CBA35C] text-black"
                  : "bg-zinc-900 text-white hover:bg-[#CBA35C] hover:text-black hover:scale-110 active:scale-95"
                }`}
            >
              <span className="material-symbols-outlined text-2xl">account_circle</span>
            </Link>

            {/* Mobile Trigger */}
            <button onClick={toggleMobileMenu} className="md:hidden flex flex-col gap-1.5 p-2 group">
              <span
                className={`w-6 h-0.5 bg-zinc-900 rounded-full transition-all ${isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              ></span>
              <span
                className={`w-4 h-0.5 bg-zinc-900 rounded-full transition-all ${isOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-zinc-900 rounded-full transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/90 backdrop-blur-md z-[200] transition-all duration-500 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`absolute top-0 right-0 w-[85%] h-full bg-white shadow-2xl border-l border-zinc-100 transition-transform duration-500 p-8 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <img src="/logo-blank.png" alt="Sona Cereal" className="h-10 w-auto" />
              <span className="text-xl font-headline font-black italic uppercase text-zinc-900">
                SONA MENU
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center active:scale-90 transition-transform border border-zinc-100"
            >
              <span className="material-symbols-outlined text-zinc-900">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isActive
                    ? "bg-primary/5 border-primary/20"
                    : "hover:bg-zinc-50 border-transparent group"
                    }`}
                >
                  <span
                    className={`text-4xl font-headline font-black uppercase italic ${isActive ? "text-primary" : "text-zinc-300 group-hover:text-zinc-900"
                      }`}
                  >
                    {link.name}
                  </span>
                  <span
                    className={`material-symbols-outlined ${isActive
                      ? "text-primary"
                      : "text-zinc-200 group-hover:text-primary -translate-x-2 group-hover:translate-x-0 transition-all"
                      }`}
                  >
                    arrow_forward
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-4 text-center">
            <Link
              href="/dashboard"
              onClick={toggleMobileMenu}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-headline font-black uppercase text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-[#CBA35C] hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">account_circle</span>
              PARTNER DASHBOARD
            </Link>
            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[.25em] pt-4">
              Sona Cereal Ecosystem
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
