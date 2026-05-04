"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { InfoCard } from "@/components/shared/InfoCard";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  FileCheck
} from "lucide-react";

const data = [
  { name: 'Jan', issued: 400, verified: 240 },
  { name: 'Feb', issued: 300, verified: 139 },
  { name: 'Mar', issued: 200, verified: 980 },
  { name: 'Apr', issued: 278, verified: 390 },
  { name: 'May', issued: 189, verified: 480 },
  { name: 'Jun', issued: 239, verified: 380 },
  { name: 'Jul', issued: 349, verified: 430 },
];

export default function InstitutionAnalytics() {
  return (
    <div className="min-h-screen bg-[#0A0D10]">
      <DashboardSidebar role="institution" />
      
      <main className="md:ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-headline mb-1">Performance Analytics</h1>
          <p className="text-muted-foreground">Data-driven insights into your credential ecosystem.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard 
            label="Total Issued" 
            value="12,402" 
            icon={FileCheck} 
            trend="+12%" 
            trendDirection="up" 
          />
          <InfoCard 
            label="Active Graduates" 
            value="11,890" 
            icon={Users} 
            trend="+5.4%" 
            trendDirection="up" 
          />
          <InfoCard 
            label="Verification Requests" 
            value="3,412" 
            icon={ShieldCheck} 
            trend="+24%" 
            trendDirection="up" 
          />
          <InfoCard 
            label="Fraud Alerts" 
            value="2" 
            icon={AlertCircle} 
            trend="-80%" 
            trendDirection="down" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 border-white/5 glass-panel">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Issuance vs Verifications
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#141A21', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="issued" fill="#3D8BFF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="verified" fill="#88888850" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 border-white/5 glass-panel">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Trust Score Stability
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#141A21', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="issued" stroke="#3D8BFF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
