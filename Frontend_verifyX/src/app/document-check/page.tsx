"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { detectDocumentTampering, type OcrDetectionResult } from "@/lib/api";
import { AlertTriangle, FileScan, Loader2, ShieldCheck, Upload } from "lucide-react";
import { useState } from "react";

export default function DocumentCheckPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<OcrDetectionResult | null>(null);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const checkDocument = async () => {
    if (!file) return;
    setError("");
    setResult(null);
    setIsChecking(true);
    try {
      const response = await detectDocumentTampering(file);
      setResult(response.ocr);
    } catch (error: any) {
      setError(error.message || "We could not analyze this document right now. Try another image file.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-20 pt-32 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            <FileScan className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Open Document Check</span>
          </div>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">Reality check for any certificate.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
            Upload a certificate image to run Error Level Analysis and spot suspicious tampering regions before you trust it.
          </p>
        </div>

        <Card className="glass-panel border-white/5 p-6">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-white/50">Upload document</Label>
              <div className="relative">
                <Upload className="absolute left-3 top-3 h-4 w-4 text-white/35" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFile(event.target.files?.[0] || null);
                    setResult(null);
                    setError("");
                  }}
                  className="border-white/10 bg-white/5 pl-10 file:border-0 file:bg-transparent file:text-white"
                />
              </div>
            </div>
            <Button disabled={isChecking || !file} onClick={checkDocument} className="h-12 w-full rounded-full bg-primary font-bold text-white hover:bg-primary/90">
              {isChecking ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check Authenticity"}
            </Button>
          </div>

          {(result || error) && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                {result && !result.isSuspicious ? <ShieldCheck className="mt-0.5 h-5 w-5 text-success" /> : <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-400" />}
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {result ? `Tampering scale ${result.tamperingScale}/10` : "Scan unavailable"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/50">{result?.verdict || error}</p>
                  {result && (
                    <div className="mt-4 grid gap-3 text-xs text-white/50">
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                        <span>Suspicious</span>
                        <span className={result.isSuspicious ? "text-yellow-300" : "text-success"}>{result.isSuspicious ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                        <span>Regions detected</span>
                        <span>{result.suspiciousRegions.length}</span>
                      </div>
                      {result.suspiciousRegions.length > 0 && (
                        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <p className="mb-2 font-bold text-white/70">Suspicious regions</p>
                          <div className="space-y-1 font-mono text-[10px]">
                            {result.suspiciousRegions.map((region, index) => (
                              <p key={`${region.x}-${region.y}-${index}`}>
                                #{index + 1}: x {region.x}, y {region.y}, w {region.w}, h {region.h}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                      {result.elaImageUrl && (
                        <a href={result.elaImageUrl} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          <img src={result.elaImageUrl} alt="Error level analysis output" className="max-h-64 w-full object-contain" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}
