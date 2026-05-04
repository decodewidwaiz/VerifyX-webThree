"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  GraduationCap, 
  User, 
  Mail, 
  Hash, 
  Calendar as CalendarIcon,
  CheckCircle2,
  Loader2,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function IssueCredential() {
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "Credential Issued",
        description: "The credential has been cryptographically signed and minted to the blockchain.",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="institution" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-headline mb-1">Issue New Credential</h1>
          <p className="text-muted-foreground">Mint secure, tamper-proof academic records directly to the blockchain.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <Card className="xl:col-span-2 p-8 border-white/5 glass-panel">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Recipient Information
            </h2>

            <form className="space-y-8" onSubmit={handleMint}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="student-name" className="text-muted-foreground">Full Legal Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/50" />
                    <Input id="student-name" placeholder="Johnathan Doe" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email" className="text-muted-foreground">Institutional Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/50" />
                    <Input id="student-email" type="email" placeholder="j.doe@stanford.edu" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree" className="text-muted-foreground">Degree Title / Achievement</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/50" />
                  <Input id="degree" placeholder="Master of Science in Computer Science" className="pl-10 bg-white/5 border-white/10" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="issue-date" className="text-muted-foreground">Graduation Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/50" />
                    <Input id="issue-date" type="date" className="pl-10 bg-white/5 border-white/10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-wallet" className="text-muted-foreground">Target Wallet (Optional)</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/50" />
                    <Input id="student-wallet" placeholder="0x..." className="pl-10 bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isMinting}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold"
              >
                {isMinting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Minting Credential...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Mint to Blockchain
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 border-white/5 bg-white/5">
              <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-muted-foreground">Protocol Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-mono text-xs">Polygon POS</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Cost per unit</span>
                  <span className="font-mono text-xs">0.00 MATIC</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-success font-bold text-xs uppercase tracking-widest">Connected</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-white/5 bg-primary/5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Immutable Trust
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By minting this credential, you are providing a cryptographic signature that will last forever on-chain. VerifyX ensures your institution's legacy is preserved with zero chance of forgery.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
