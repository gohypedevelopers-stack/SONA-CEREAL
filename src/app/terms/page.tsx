"use client";

import React from "react";

export default function TermsPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative min-h-[480px] flex items-center bg-primary-container overflow-hidden editorial-skew pt-16">
        {/* Sunburst Effect */}
        <div className="absolute inset-0 hero-rays opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-4xl">
            <span className="inline-block bg-secondary-container text-on-secondary-fixed-variant px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              Official Rules
            </span>
            <h1 className="font-headline font-black text-white text-6xl md:text-8xl italic uppercase leading-[0.85] tracking-tighter editorial-text-shadow">
              Terms &amp; <br />
              <span className="text-secondary-container">Conditions</span>
            </h1>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-1 w-20 bg-secondary-container"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/90 font-headline">
                Last Updated: October 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20 -mt-10 relative z-20">
        <div className="bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden">
          <div className="p-8 md:p-12 space-y-16">
            {/* Introduction */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  01
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Introduction
                  </h2>
                  <p className="text-body-md leading-relaxed text-on-surface-variant mb-4">
                    Welcome to the Sona Cereal Rewards program. By participating
                    in this promotion, you agree to be bound by these Terms and
                    Conditions. This loyalty program is designed to reward our
                    dedicated members for their continued support and engagement
                    with our premium rice products.
                  </p>
                  <p className="text-body-md leading-relaxed text-on-surface-variant">
                    Please read these terms carefully. If you do not agree with
                    any part of these terms, you must refrain from
                    participating in the rewards campaign.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  02
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Eligibility
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-on-surface-variant">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>
                        Must be a registered member of Sona Cereal with a valid
                        membership ID.
                      </span>
                    </li>
                    <li className="flex items-center gap-4 text-on-surface-variant">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>
                        Participants must be at least 18 years of age at the
                        time of entry.
                      </span>
                    </li>
                    <li className="flex items-center gap-4 text-on-surface-variant">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>Legal residents of the promotion territory only.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Promotion Period */}
            <div className="group hover:bg-zinc-50/50 transition-all duration-500 -mx-8 md:-mx-12 p-8 md:p-12 rounded-3xl">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  03
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Promotion Period
                  </h2>
                  <p className="text-body-md leading-relaxed text-on-surface-variant">
                    The Sona Cereal Rewards campaign commences on{" "}
                    <span className="font-bold text-primary">
                      November 1, 2024
                    </span>{" "}
                    and concludes on{" "}
                    <span className="font-bold text-primary">
                      January 31, 2025
                    </span>
                    . All points must be redeemed before the final date. Any
                    unused vouchers or points remaining after the closing date
                    will be forfeited without liability.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Participate */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  04
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    How to Participate
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-surface-container rounded-lg">
                      <h4 className="font-headline font-bold uppercase text-sm mb-3 text-primary">
                        Step A: Purchase
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Buy any participating Sona Cereal Premium Rice packs
                        (5kg or 10kg) from authorized retailers during the
                        campaign period.
                      </p>
                    </div>
                    <div className="p-6 bg-surface-container rounded-lg">
                      <h4 className="font-headline font-bold uppercase text-sm mb-3 text-primary">
                        Step B: Scan &amp; Register
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Locate the unique QR code inside the packaging. Scan the
                        code and log in to your Rewards account to credit
                        points.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prizes */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  05
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Prizes &amp; Rewards
                  </h2>
                  <p className="text-body-md leading-relaxed text-on-surface-variant mb-6">
                    Rewards are non-transferable and cannot be exchanged for
                    cash or credit. The tiered reward structure includes:
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-secondary-container/10 border-l-4 border-secondary-container">
                      <span className="font-bold">
                        Exclusive Kitchenware Sets
                      </span>
                      <span className="text-xs font-bold uppercase text-secondary">
                        Tier 3
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary-container/10 border-l-4 border-secondary-container">
                      <span className="font-bold">Grocery Gift Vouchers</span>
                      <span className="text-xs font-bold uppercase text-secondary">
                        Tier 2
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary-container/10 border-l-4 border-secondary-container">
                      <span className="font-bold">
                        Premium Appliance Sweepstakes
                      </span>
                      <span className="text-xs font-bold uppercase text-secondary">
                        Tier 1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Conditions */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  06
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    General Conditions
                  </h2>
                  <p className="text-body-md leading-relaxed text-on-surface-variant">
                    Sona Cereal reserves the right to disqualify any participant
                    found to be tampering with the entry process or acting in
                    violation of these terms. We reserve the right to modify or
                    cancel the promotion should any unforeseen technical or
                    legal circumstances arise that compromise the integrity of
                    the campaign.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-200 group-hover:text-secondary transition-colors leading-none">
                  07
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Privacy &amp; Data Use
                  </h2>
                  <p className="text-body-md leading-relaxed text-on-surface-variant">
                    By participating, you consent to the collection and use of
                    your personal data for the purposes of administering the
                    Sona Cereal Rewards program. We are committed to protecting
                    your privacy in accordance with our Global Privacy Policy.
                    Your data will never be sold to third-party marketing
                    entities without your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top action */}
        <div className="mt-12 text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 bg-surface-container-high px-8 py-4 rounded-full font-headline font-bold uppercase tracking-wider text-on-surface hover:bg-primary hover:text-on-primary transition-all group"
          >
            <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">
              arrow_upward
            </span>
            Return to Top
          </button>
        </div>
      </section>
    </>
  );
}
