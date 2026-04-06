"use client";

import React from "react";

export default function TermsPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative md:min-h-[480px] flex items-center bg-zinc-50 overflow-hidden editorial-skew pt-1 md:pt-16">

        <div className="container mx-auto px-6 relative z-10 py-4 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-block bg-secondary-container text-on-secondary-fixed-variant px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              Official Rules
            </span>
            <h1 className="font-headline font-black text-zinc-900 text-3xl md:text-8xl italic uppercase leading-[0.85] tracking-tighter editorial-text-shadow">
              Terms &amp; <br />
              <span className="text-primary">Conditions</span>
            </h1>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-1 w-20 bg-primary"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 font-headline">
                Last Updated: April 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20 mt-0 md:-mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="p-8 md:p-12 space-y-16">
            {/* Introduction */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-100 group-hover:text-primary transition-colors leading-none">
                  01
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Retailer Partnership
                  </h2>
                  <p className="text-body-md leading-relaxed text-zinc-600 mb-4">
                    Welcome to the Sona Cereal Elite Retailer Rewards Program.
                    This initiative is designed to recognize and reward our authorized partners
                    who achieve significant sales milestones within their territory.
                    By registering your business on this portal, you agree to comply with
                    all logistical and verification standards set forth by Sona Cereal.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="group">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-100 group-hover:text-primary transition-colors leading-none">
                  02
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Eligibility & Validation
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-zinc-600">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>Must be an authorized, registered retail entity of Sona Cereal products.</span>
                    </li>
                    <li className="flex items-center gap-4 text-zinc-600">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>Possession of a valid Aadhar ID for the primary proprietor is mandatory for account verification.</span>
                    </li>
                    <li className="flex items-center gap-4 text-zinc-600">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>Retailers must maintain active status throughout the promotion duration.</span>
                    </li>
                    <li className="flex items-center gap-4 text-zinc-600">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <span>Scheme Valid in - Maharashtra, Gujarat, Madhya Pradesh & Delhi.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Promotion Period */}
            <div className="group hover:bg-zinc-50 transition-all duration-500 -mx-8 md:-mx-12 p-8 md:p-12 rounded-3xl">
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black font-headline italic text-zinc-100 group-hover:text-primary transition-colors leading-none">
                  03
                </span>
                <div>
                  <h2 className="text-2xl font-black font-headline italic uppercase text-zinc-600 group-hover:text-primary transition-colors duration-300 mb-6">
                    Slab Campaign Duration
                  </h2>
                  <p className="text-body-md leading-relaxed text-zinc-600">
                    The current rewards campaign is active from 1st April to 31st August 2026.
                    All verified sales quantities (QTL) submitted through the portal
                    within this window will contribute to your final Slab calculation.
                    Rewards distribution will initiate strictly after the 5-month consolidation period.
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
                    Invoice Submission Workflow
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <h4 className="font-headline font-bold uppercase text-sm mb-3 text-primary">
                        Phase A: Digital Recording
                      </h4>
                      <p className="text-sm text-zinc-600">
                        Retailers must upload clear, legible copies of their authentic
                        purchase invoices. The system automatically extracts the
                        Quantity (QTL) and Invoice Number for validation.
                      </p>
                    </div>
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <h4 className="font-headline font-bold uppercase text-sm mb-3 text-primary">
                        Phase B: Manual Audit
                      </h4>
                      <p className="text-sm text-zinc-600">
                        Our internal verification team audits each submission.
                        Once accepted, the quantity is added to your total
                        Portfolio Achievement, moving you closer to the next Slab.
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
                    Slab Awards & Redemption
                  </h2>
                  <p className="text-body-md leading-relaxed text-zinc-600 mb-6">
                    Rewards are distributed based on your total achieved QTL.
                    Retailers can select one high-octane gift per milestone reached.
                    Current rewards include:
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-zinc-50 border-l-4 border-primary">
                      <span className="font-bold">Elite Luxury Assets (Apache, iPhone 16 Pro)</span>

                    </div>
                    <div className="flex justify-between items-center p-4 bg-zinc-50 border-l-4 border-zinc-200">
                      <span className="font-bold">Premium Appliances (Sony Smart TV, Refrigerator)</span>

                    </div>
                    <div className="flex justify-between items-center p-4 bg-zinc-50 border-l-4 border-zinc-200 text-zinc-400">
                      <span className="font-bold">Essential Tech (Microwave, JBL Speakers)</span>

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
            className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-headline font-bold uppercase tracking-wider text-zinc-900 hover:bg-primary hover:text-black transition-all group border border-zinc-200"
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
