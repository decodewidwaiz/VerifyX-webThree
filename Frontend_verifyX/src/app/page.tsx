"use client";

import HeroGeometric from "@/components/ui/modern-hero-section";
import CapabilityGrid from "@/components/ui/dark-grid";
import { NeoMinimalFooter } from "@/components/ui/neo-minimal-footer";
import { Navbar } from "@/components/layout/Navbar";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <HeroGeometric />
      
      {/* Capabilities Section */}
      <CapabilityGrid />

      {/* Trust Statement */}
      <section className="py-32 relative overflow-hidden border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-10 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            <ShieldCheck className="w-4 h-4" /> Trusted Infrastructure
          </div>
          <p className="text-4xl md:text-5xl font-light text-white/90 max-w-5xl mx-auto leading-tight italic tracking-tight">
            "Standardizing global academic recognition through the power of 
            <span className="text-white font-bold not-italic px-2"> decentralized cryptographic proofs.</span>"
          </p>
        </div>
      </section>

      {/* Footer */}
      <NeoMinimalFooter />
    </main>
  );
}
