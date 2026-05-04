"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, MapPin, Link as LinkIcon, Share2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/Badge";
import Link from "next/link";

export default function PublicProfile({ params }: { params: { id: string } }) {
  const user = {
    name: "Johnathan Fitzgerald Doe",
    wallet: params.id,
    bio: "Senior AI Researcher specializing in Federated Learning and Privacy-Preserving Systems. Graduate of Stanford University.",
    location: "San Francisco, CA",
    email: "j.doe@example.com",
    credentials: [
      {
        id: "1",
        title: "Master of Science in Artificial Intelligence",
        institution: "Stanford University",
        date: "2023",
        status: "verified" as const
      },
      {
        id: "2",
        title: "Bachelor of Computer Science",
        institution: "Stanford University",
        date: "2021",
        status: "verified" as const
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        {/* Profile Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <Avatar className="w-32 h-32 border-2 border-primary/20 p-1">
              <AvatarImage src={`https://picsum.photos/seed/${params.id}/200`} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold font-headline mb-2">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {user.location}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                    {user.wallet}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{user.bio}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <Button variant="outline" className="border-white/10 gap-2 h-9 px-4 text-xs font-bold uppercase tracking-widest">
                  <Mail className="w-4 h-4" /> Contact
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2 h-9 px-4 text-xs font-bold uppercase tracking-widest">
                  <Share2 className="w-4 h-4" /> Share Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Achievements */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Verified Academic Records
          </h2>
          
          <div className="grid gap-6">
            {user.credentials.map((cred) => (
              <Card key={cred.id} className="p-6 border-white/5 glass-panel group subtle-lift">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 h-fit">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cred.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{cred.institution}</p>
                      <p className="text-xs text-muted-foreground">Class of {cred.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <StatusBadge status={cred.status} />
                    <Link href={`/credential/${cred.id}`}>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white flex items-center gap-1">
                        View Proof <LinkIcon className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Verified via VerifyX Protocol
          </p>
        </footer>
      </main>
    </div>
  );
}
