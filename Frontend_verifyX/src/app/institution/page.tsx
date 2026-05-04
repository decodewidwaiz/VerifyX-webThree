"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { InfoCard } from "@/components/shared/InfoCard";
import { Card } from "@/components/ui/card";
import { 
  PlusCircle, 
  Users, 
  FileCheck, 
  ArrowUpRight, 
  History, 
  ShieldCheck,
  Zap,
  Clock,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function InstitutionOverview() {
  const recentActivity = [
    { id: 1, action: "Credential Issued", recipient: "Alex Rivera", degree: "M.S. Robotics", time: "2m ago" },
    { id: 2, action: "Verification Successful", recipient: "Sarah Chen", degree: "B.S. Physics", time: "15m ago" },
    { id: 3, action: "Batch Upload Initiated", recipient: "Spring 2024 Graduates", degree: "124 Records", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
      <DashboardSidebar role="institution" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Authority Portal</span>
            </div>
            <h1 className="text-4xl font-bold font-headline gradient-text">Institution Overview</h1>
            <p className="text-white/40 text-lg font-light mt-1">Stanford University Registrar Hub</p>
          </div>
          <Link href="/institution/issue">
            <Button className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8 gap-2 font-bold shadow-lg shadow-primary/20">
              <PlusCircle className="w-4 h-4" /> Issue New Record
            </Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <InfoCard label="Total Records" value="12,402" icon={FileCheck} trend="+12%" trendDirection="up" className="glass-panel" />
          <InfoCard label="Graduates" value="8,920" icon={Users} trend="+5%" trendDirection="up" className="glass-panel" />
          <InfoCard label="Global Verifications" value="34,102" icon={ShieldCheck} trend="+24%" trendDirection="up" className="glass-panel" />
          <InfoCard label="Protocol Score" value="99.9%" icon={Zap} trend="stable" trendDirection="up" className="glass-panel" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                <History className="w-4 h-4" /> Real-time Activity
              </h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Full Logs</button>
            </div>
            <Card className="glass-panel divide-y divide-white/5 overflow-hidden">
              {recentActivity.map((activity, i) => (
                <motion.div 
                  key={activity.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <Clock className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90">{activity.action}</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">{activity.recipient} • {activity.degree}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/20 group-hover:text-white/40 transition-colors">{activity.time}</span>
                </motion.div>
              ))}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 glass-panel border-primary/20 bg-primary/[0.03]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" /> Authority Tools
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between border-white/10 bg-white/[0.02] hover:bg-white/5 h-12 rounded-xl text-sm group">
                  Batch Minting (CSV)
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Button>
                <Button variant="outline" className="w-full justify-between border-white/10 bg-white/[0.02] hover:bg-white/5 h-12 rounded-xl text-sm group">
                  Monthly Integrity Report
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Button>
                <Button variant="outline" className="w-full justify-between border-white/10 bg-white/[0.02] hover:bg-white/5 h-12 rounded-xl text-sm group">
                  Node Audit History
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 glass-panel">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">Network Integrity</h4>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-bold text-white/80">Protocol Node Active</span>
              </div>
              <p className="text-[10px] text-white/30 mt-4 leading-relaxed uppercase tracking-wider">
                Average Latency: 2.1s <br />
                Network: Polygon Mainnet
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}