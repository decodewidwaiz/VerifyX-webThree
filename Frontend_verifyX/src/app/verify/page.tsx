"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, QrCode, Upload, CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/components/shared/Badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<"verified" | "not-found" | null>(null);

  const handleVerify = () => {
    if (!hash) return;
    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setResult(hash === "valid" || hash.length > 30 ? "verified" : "not-found");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#030303] relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Public Verifier</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 gradient-text">Instant Proof</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-light leading-relaxed">
            Verify academic credentials issued on the VerifyX Protocol using cryptographic hashes.
          </p>
        </div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 glass-panel shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <Input 
                    placeholder="Enter Credential Hash (0x...)" 
                    className="h-14 pl-12 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 text-white placeholder:text-white/20 transition-all"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleVerify} 
                  disabled={isVerifying || !hash}
                  className="h-14 px-10 bg-primary hover:bg-primary/90 rounded-2xl font-bold text-white shadow-lg shadow-primary/20 transition-all"
                >
                  {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Access"}
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8">
                <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Record
                </button>
                <div className="w-px h-3 bg-white/10" />
                <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">
                  <QrCode className="w-3.5 h-3.5" />
                  Scan QR
                </button>
              </div>
            </Card>
          </motion.div>

          <AnimatePresence>
            {result === "verified" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="p-10 border-success/20 bg-success/[0.03] glass-panel text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-success/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-3xl" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-8 border border-success/30">
                      <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="text-3xl font-bold font-headline mb-2 text-success">Authenticated Record</h2>
                    <p className="text-white/60 mb-10 max-w-md">Cryptographic proof confirms this record was issued by <span className="text-white font-bold">Stanford University</span>.</p>
                    
                    <div className="w-full max-w-md bg-white/[0.02] rounded-2xl p-6 border border-white/5 text-left space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Holder</span>
                        <span className="font-bold">Johnathan Fitzgerald Doe</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Credential</span>
                        <span className="font-bold">M.S. in AI</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Status</span>
                        <StatusBadge status="verified" />
                      </div>
                    </div>

                    <Link href="/credential/demo-id">
                      <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 px-8">View Blockchain Proof</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )}

            {result === "not-found" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-10 border-error/20 bg-error/[0.03] glass-panel text-center">
                  <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-8 border border-error/30">
                    <XCircle className="w-10 h-10 text-error" />
                  </div>
                  <h2 className="text-3xl font-bold font-headline mb-2 text-error">Validation Failed</h2>
                  <p className="text-white/60 mb-10">No record matches this hash on the blockchain. Verification unsuccessful.</p>
                  <Button variant="outline" onClick={() => setHash("")} className="rounded-full border-white/10 hover:bg-white/5">Try New Search</Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}