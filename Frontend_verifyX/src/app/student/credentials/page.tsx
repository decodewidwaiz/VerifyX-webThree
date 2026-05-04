"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/Badge";
import { 
  ShieldCheck, 
  Calendar, 
  Search, 
  Filter,
  Download,
  ExternalLink,
  MoreVertical
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentCredentials() {
  const credentials = [
    {
      id: "1",
      title: "Bachelor of Computer Science",
      institution: "Stanford University",
      date: "May 24, 2023",
      status: "verified" as const,
      hash: "0x3f7a6b2c9e1d8f4a0c2b4d6e8f0a2c4e6b8d0f2a"
    },
    {
      id: "2",
      title: "Advanced AI Ethics Certification",
      institution: "MIT Professional Education",
      date: "Dec 12, 2023",
      status: "verified" as const,
      hash: "0x88c12f45b67d890a12b34c56d78e90f12a34b56c"
    },
    {
      id: "3",
      title: "Google UX Professional Certificate",
      institution: "Coursera / Google",
      date: "Jan 05, 2024",
      status: "pending" as const,
      hash: "0xf922572b8441a123456789abcdef0123456789ab"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="student" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-headline mb-1">My Credentials</h1>
          <p className="text-muted-foreground">Detailed repository of your academic achievements and certificates.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search certificates..." className="pl-10 bg-white/5 border-white/10" />
          </div>
          <Button variant="outline" className="border-white/10 gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <Card className="border-white/5 glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  <th className="px-6 py-4">Credential</th>
                  <th className="px-6 py-4">Institution</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {credentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-primary/10 text-primary">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm">{cred.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{cred.institution}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{cred.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={cred.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/credential/${cred.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
