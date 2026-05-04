"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  ScrollText, 
  Settings, 
  PlusCircle,
  LogOut,
  Wallet,
  Bell,
  BarChart3,
  BrainCircuit,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarItem {
  icon: any;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  role: "student" | "institution";
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const studentItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Overview", href: "/student" },
    { icon: ScrollText, label: "My Credentials", href: "/student/credentials" },
    { icon: Bell, label: "Notifications", href: "/student/notifications" },
    { icon: UserCircle, label: "Public Profile", href: "/profile/0x71C" },
    { icon: Settings, label: "Settings", href: "/student/settings" },
  ];

  const institutionItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Overview", href: "/institution" },
    { icon: PlusCircle, label: "Issue Credential", href: "/institution/issue" },
    { icon: BarChart3, label: "Analytics", href: "/institution/analytics" },
    { icon: BrainCircuit, label: "AI Insights", href: "/institution/ai-insights" },
    { icon: Settings, label: "Settings", href: "/institution/settings" },
  ];

  const items = role === "student" ? studentItems : institutionItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#030303]/40 backdrop-blur-2xl border-r border-white/5 hidden md:flex flex-col z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white font-headline">VerifyX</span>
        </Link>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "text-primary"
                    : "text-white/40 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                  />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary" : "text-white/40 group-hover:text-white")} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5 space-y-6">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Connected</p>
              <p className="text-[10px] font-mono text-white/80 truncate">0x71C...3921</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/40 hover:bg-error/10 hover:text-error transition-all group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Log Out
        </button>
      </div>
    </aside>
  );
}