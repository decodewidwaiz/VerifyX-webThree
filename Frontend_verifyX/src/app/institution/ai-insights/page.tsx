"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { 
  BrainCircuit, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Fingerprint,
  Zap,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const insights = [
  {
    id: 1,
    title: "Duplicate Record Detection",
    description: "System found 3 credentials with overlapping metadata issued within a 2-hour window. Potentially an automated error.",
    risk: 45,
    icon: Fingerprint,
    action: "Review Batches"
  },
  {
    id: 2,
    title: "Suspicious Verification Source",
    description: "Unusually high verification traffic (200+ requests/min) detected from an unidentified IP range in Eastern Europe.",
    risk: 88,
    icon: AlertTriangle,
    action: "Enable Firewall"
  },
  {
    id: 3,
    title: "Credential Trust Enhancement",
    description: "98% of your credentials have been verified at least once. Your institution's collective trust score is increasing.",
    risk: 5,
    icon: ShieldCheck,
    action: "View Report"
  }
];

export default function AIInsights() {
  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="institution" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold font-headline mb-1 flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-primary" />
              AI Fraud Intelligence
            </h1>
            <p className="text-muted-foreground">Predictive analysis and security monitoring for your credentials.</p>
          </div>
          <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">System Online</span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Active Intelligence Logs</h2>
            {insights.map((insight) => (
              <Card key={insight.id} className="p-6 border-white/5 glass-panel subtle-lift">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <insight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{insight.description}</p>
                    </div>
                  </div>
                  <RiskBadge score={insight.risk} />
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">{insight.action} →</button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-white/5 glass-panel">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Network Trust Quotient
              </h3>
              <div className="text-center mb-8">
                <span className="text-5xl font-bold font-headline">94.2%</span>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">Optimized Integrity</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Issuance Authenticity</span>
                    <span>99%</span>
                  </div>
                  <Progress value={99} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Verifier Reputation</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Anomaly Mitigation</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-1.5" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-white/5 bg-primary/5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm mb-2">How it works</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    VerifyX uses federated learning to detect patterns of academic fraud across the network without compromising student privacy. All AI decisions are explainable and logged for compliance.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
