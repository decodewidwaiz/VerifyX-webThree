"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/Badge";
import { 
  ShieldCheck, 
  Calendar, 
  Globe, 
  Hash, 
  Download, 
  Share2, 
  ExternalLink,
  History,
  Building2,
  Copy,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { QRShareModal } from "@/components/shared/QRShareModal";
import { motion } from "framer-motion";

export default function CredentialDetail({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const credential = {
    title: "Master of Science in AI",
    institution: "Stanford University",
    holder: "Johnathan Fitzgerald Doe",
    issueDate: "May 24, 2023",
    credentialId: `CERT-SF-2023-${params.id.slice(0, 5)}`,
    hash: "0x3f7a6b2c9e1d8f4a0c2b4d6e8f0a2c4e6b8d0f2a",
    txHash: "0x88c12f45b67d890a12b34c56d78e90f12a34b56c",
    network: "Polygon POS",
    status: "verified" as const
  };

  const copyHash = () => {
    navigator.clipboard.writeText(credential.hash);
    toast({
      title: "Proof Copied",
      description: "Cryptographic hash saved to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-[#030303] relative overflow-hidden">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto relative z-10">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <Link href="/student" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors flex items-center gap-2">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Identity Hub
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold font-headline gradient-text">{credential.title}</h1>
              <StatusBadge status={credential.status} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full border-white/10 bg-white/[0.02] hover:bg-white/5 h-12 px-6 gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8 gap-2 font-bold shadow-lg shadow-primary/20"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share2 className="w-4 h-4" /> Share Proof
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="p-16 glass-panel relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[600px] group border-white/5 hover:border-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-[80px] pointer-events-none transition-opacity" />
              
              <div className="relative z-10 space-y-12 w-full max-w-lg">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-20 h-20 text-primary/40 mb-10 animate-pulse" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Academic Record</h2>
                  <div className="w-20 h-px bg-white/10" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold font-headline leading-tight">{credential.title}</h3>
                  <p className="text-lg text-white/40 italic">In recognition of academic achievement awarded to</p>
                  <p className="text-3xl font-bold text-white">{credential.holder}</p>
                </div>
                
                <div className="pt-8 space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-primary" />
                      <span className="font-bold text-xl tracking-tight">{credential.institution}</span>
                    </div>
                    <p className="text-xs text-white/20 uppercase tracking-[0.2em] font-bold">{credential.issueDate}</p>
                  </div>
                </div>

                <div className="pt-10">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-bold uppercase tracking-[0.2em]">
                    <CheckCircle2 className="w-4 h-4" /> VerifyX Protocol Authenticated
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Metadata & Blockchain Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 glass-panel border-white/5">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Protocol Metadata</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Hash className="w-3 h-3" /> Record ID
                    </p>
                    <p className="font-mono text-sm font-bold text-white/80">{credential.credentialId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Issuance Timestamp
                    </p>
                    <p className="text-sm font-bold text-white/80">{credential.issueDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Building2 className="w-3 h-3" /> Authority
                    </p>
                    <p className="text-sm font-bold text-white/80">{credential.institution}</p>
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-0.5 rounded-lg bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-3 w-3" /> Verified Signer
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 glass-panel border-white/5">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Blockchain Evidence</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Tx Hash
                    </p>
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={copyHash}>
                      <p className="font-mono text-[10px] text-white/40 truncate max-w-[180px] group-hover:text-white transition-colors">{credential.txHash}</p>
                      <Copy className="w-3 h-3 text-white/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Hash className="w-3 h-3" /> Network
                    </p>
                    <p className="text-sm font-bold text-white/80">{credential.network}</p>
                  </div>
                  <div className="pt-6 space-y-3">
                    <Button variant="outline" className="w-full text-[10px] h-10 border-white/10 bg-white/[0.02] hover:bg-white/5 uppercase font-bold tracking-widest gap-2">
                      <ExternalLink className="w-3 h-3" /> Polygon Explorer
                    </Button>
                    <Link href={`/credential/${params.id}/timeline`} className="block">
                      <Button variant="ghost" className="w-full text-[10px] h-10 text-white/40 hover:text-white uppercase font-bold tracking-widest gap-2">
                        <History className="w-3 h-3" /> Audit History
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <QRShareModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          credentialId={params.id}
          title={credential.title}
        />
      </main>
    </div>
  );
}