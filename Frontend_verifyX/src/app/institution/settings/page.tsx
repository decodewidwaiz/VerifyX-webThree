"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Building2, 
  ShieldCheck, 
  Key, 
  Users, 
  Bell, 
  Lock,
  Globe,
  Mail,
  Smartphone
} from "lucide-react";

export default function InstitutionSettings() {
  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="institution" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-headline mb-1">Institution Settings</h1>
          <p className="text-muted-foreground">Configure your authority profile and security protocols.</p>
        </header>

        <div className="max-w-4xl space-y-8">
          {/* Profile Section */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Authority Profile
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Institution Name</Label>
                  <Input defaultValue="Stanford University" className="bg-white/5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Official Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/40" />
                    <Input defaultValue="https://stanford.edu" className="pl-10 bg-white/5" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Admin Contact Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/40" />
                  <Input defaultValue="registrar@stanford.edu" className="pl-10 bg-white/5" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">Update Profile</Button>
            </Card>
          </section>

          {/* API & Blockchain Section */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <Key className="w-4 h-4" /> API & Blockchain Integration
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Master Signing Key (Wallet)</Label>
                <Input value="0x8b2A...F921" readOnly className="bg-white/5 font-mono text-xs opacity-60" />
                <p className="text-[10px] text-muted-foreground">This is your institution's cryptographic identity on the Polygon network.</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Verify Requests</Label>
                    <p className="text-sm text-muted-foreground">Instantly approve verification requests from white-listed organizations.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">IPFS Content pinning</Label>
                  <p className="text-sm text-muted-foreground">Automatically pin certificate metadata to IPFS for permanent storage.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
          </section>

          {/* Security & Access */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Security & Access Control
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Multi-Sig Approval Required</p>
                      <p className="text-xs text-muted-foreground">Requires 2/3 admin signatures for bulk issuance.</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Configure</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Login Alert Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify all admins when a new login session is detected.</p>
                </div>
                <Switch />
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
