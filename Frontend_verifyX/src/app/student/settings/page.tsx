"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Lock, 
  Wallet, 
  Eye, 
  EyeOff, 
  Bell, 
  Shield, 
  Trash2,
  LogOut,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StudentSettings() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="student" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-headline mb-1">Account Settings</h1>
          <p className="text-muted-foreground">Manage your identity and privacy controls.</p>
        </header>

        <div className="max-w-4xl space-y-8">
          {/* Account Details */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Information
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Full Name</Label>
                  <Input defaultValue="Johnathan Fitzgerald Doe" className="bg-white/5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email Address</Label>
                  <Input defaultValue="john.doe@university.edu" className="bg-white/5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Web3 Wallet Address (Read-only)</Label>
                <div className="flex gap-2">
                  <Input value="0x71C...3921" readOnly className="bg-white/5 font-mono text-xs cursor-not-allowed opacity-60" />
                  <Button variant="outline" size="icon" className="shrink-0 border-white/10">
                    <Wallet className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </Card>
          </section>

          {/* Privacy Controls */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Privacy & Visibility
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Allow others to view your verified credentials with your wallet address.</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mask Detailed Grades</Label>
                  <p className="text-sm text-muted-foreground">Only show degree title and institution, hide specific GPAs or grades.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Anonymize Blockchain Metadata</Label>
                  <p className="text-sm text-muted-foreground">Encrypt sensitive transaction details when viewed on public explorers.</p>
                </div>
                <Switch />
              </div>
            </Card>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security
            </h2>
            <Card className="p-6 border-white/5 glass-panel space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">MacBook Pro - San Francisco, CA</p>
                      <p className="text-xs text-muted-foreground">Current session • Active 2m ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error hover:text-error hover:bg-error/10">Revoke</Button>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <Button variant="outline" className="border-white/10 hover:bg-white/5">Change Password</Button>
                <Button variant="outline" className="text-error border-error/20 hover:bg-error/10 hover:border-error/30 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign out of all devices
                </Button>
              </div>
            </Card>
          </section>

          {/* Danger Zone */}
          <section className="pt-8">
            <Card className="p-6 border-error/20 bg-error/5 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-error flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action is irreversible.</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete My Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-panel border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers. Your blockchain credentials will remain immutable but disconnected from this identity.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-error hover:bg-error/90">Delete Account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
