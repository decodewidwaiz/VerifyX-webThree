"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { 
  Bell, 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  Zap,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "issue",
    title: "New Credential Issued",
    message: "Stanford University has successfully minted your 'Master of Science in AI' degree.",
    time: "2 hours ago",
    unread: true,
    icon: ShieldCheck,
    color: "text-primary bg-primary/10"
  },
  {
    id: 2,
    type: "verify",
    title: "Credential Verified",
    message: "Google Recruitment has verified your credentials for the position of Senior AI Engineer.",
    time: "5 hours ago",
    unread: true,
    icon: CheckCircle2,
    color: "text-success bg-success/10"
  },
  {
    id: 3,
    type: "security",
    title: "Security Alert",
    message: "New login detected from a Chrome browser on Windows in San Francisco, CA.",
    time: "Yesterday",
    unread: false,
    icon: AlertTriangle,
    color: "text-warning bg-warning/10"
  },
  {
    id: 4,
    type: "update",
    title: "System Update",
    message: "VerifyX Protocol v2.4 is now live. Faster verification and improved privacy controls.",
    time: "2 days ago",
    unread: false,
    icon: Zap,
    color: "text-primary bg-primary/10"
  }
];

export default function StudentNotifications() {
  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="student" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-headline mb-1">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your academic journey and security status.</p>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">Mark all as read</button>
        </header>

        <div className="max-w-4xl space-y-4">
          {notifications.map((notif) => (
            <Card 
              key={notif.id} 
              className={cn(
                "p-5 border-white/5 glass-panel transition-all hover:bg-white/5 flex gap-5 items-start",
                notif.unread && "border-primary/20 bg-primary/5"
              )}
            >
              <div className={cn("p-3 rounded-xl shrink-0", notif.color)}>
                <notif.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{notif.title}</h3>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{notif.message}</p>
              </div>
              <button className="text-muted-foreground hover:text-white p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </Card>
          ))}
          
          <div className="text-center py-10 opacity-40">
            <Bell className="w-10 h-10 mx-auto mb-4" />
            <p className="text-sm font-medium">You're all caught up!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
