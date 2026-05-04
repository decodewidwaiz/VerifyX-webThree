"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/Badge";
import { ShieldCheck, Calendar, ExternalLink, Download, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const { toast } = useToast();
  
  const credentials = [
    {
      id: "1",
      title: "Bachelor of Computer Science",
      institution: "Stanford University",
      date: "May 2023",
      status: "verified" as const,
      hash: "0x3f7a...9e12"
    },
    {
      id: "2",
      title: "Advanced AI Ethics Certification",
      institution: "MIT Professional Education",
      date: "Dec 2023",
      status: "verified" as const,
      hash: "0x88c1...00bc"
    },
    {
      id: "3",
      title: "Google UX Professional Certificate",
      institution: "Coursera / Google",
      date: "Jan 2024",
      status: "pending" as const,
      hash: "0xf922...441a"
    }
  ];

  const handleDownload = (title: string) => {
    toast({
      title: "Secure Export",
      description: `Generating verifiable PDF for ${title}...`,
    });
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <DashboardSidebar role="student" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Student Hub</span>
            </div>
            <h1 className="text-4xl font-bold font-headline gradient-text">Academic Identity</h1>
            <p className="text-white/40 text-lg font-light mt-1">Manage your immutable blockchain credentials.</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/60 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            0x71C...3921
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-panel p-6 subtle-lift relative group overflow-hidden border-white/5 hover:border-primary/20 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                  <button 
                    onClick={() => handleDownload(cred.title)}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <Link href={`/credential/${cred.id}`}>
                    <button className="w-9 h-9 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center border border-primary/20 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <StatusBadge status={cred.status} />
                </div>

                <h3 className="text-xl font-bold font-headline mb-1 pr-12 text-white">{cred.title}</h3>
                <p className="text-white/40 text-sm mb-8">{cred.institution}</p>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Issuance
                    </span>
                    <span className="text-xs font-medium text-white/80">{cred.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Hash</span>
                    <span className="font-mono text-[10px] bg-white/[0.03] px-2 py-1 rounded-lg text-white/60">{cred.hash}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          <button className="border-2 border-dashed border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-white/20 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all group min-h-[280px]">
            <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <span className="block font-bold text-sm text-white/60 group-hover:text-primary">Request Credential</span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Direct protocol request</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

// Ensure PlusCircle is imported if not already
import { PlusCircle } from "lucide-react";