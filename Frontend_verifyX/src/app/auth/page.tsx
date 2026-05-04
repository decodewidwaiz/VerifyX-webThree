"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, GraduationCap, Building2, UserCircle2, Loader2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [role, setRole] = useState<"student" | "institution" | "verifier" | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) setAccount(accounts[0]);
        });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      toast({
        variant: "destructive",
        title: "MetaMask Required",
        description: "Please install MetaMask to connect your identity.",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAccount(accounts[0]);
      
      toast({
        title: "Authenticated Successfully",
        description: `Connected as ${role?.charAt(0).toUpperCase()}${role?.slice(1)}`,
      });

      setTimeout(() => {
        if (role === 'student') router.push('/student');
        else if (role === 'institution') router.push('/institution');
        else if (role === 'verifier') router.push('/verify');
      }, 1000);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <Card className="p-8 glass-panel shadow-2xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Secure Access</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">Select your role to access the protocol</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { id: "student", label: "Student / Alumnus", icon: UserCircle2 },
                { id: "institution", label: "Educational Institution", icon: GraduationCap },
                { id: "verifier", label: "Organization Verifier", icon: Building2 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id as any)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    role === item.id 
                      ? "bg-primary/10 border-primary/50 text-white shadow-lg shadow-primary/5" 
                      : "bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 ${role === item.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {role === item.id && <motion.div layoutId="check"><ShieldCheck className="w-4 h-4 text-primary" /></motion.div>}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                onClick={connectWallet}
                disabled={!role || isConnecting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-bold gap-2 group transition-all"
              >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Connect with Web3 Wallet
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-[#030303] px-2 text-muted-foreground">Verification Required</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-full border-white/10 bg-white/[0.02] hover:bg-white/5">Google</Button>
                <Button variant="outline" className="rounded-full border-white/10 bg-white/[0.02] hover:bg-white/5">LinkedIn</Button>
              </div>
            </div>

            <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
              By continuing, you agree to the <br /> 
              <a href="#" className="text-white hover:underline">Terms of Service</a> & <a href="#" className="text-white hover:underline">Privacy Policy</a>
            </p>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}