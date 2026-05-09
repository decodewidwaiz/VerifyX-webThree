"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { extractOcrText, validateOcr } from "@/lib/api";
import { AlertTriangle, FileScan, Loader2, ShieldCheck, Upload } from "lucide-react";
import { useState } from "react";

export default function DocumentCheckPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const checkDocument = async () => {
    setStatus("");
    setScore(null);
    setIsChecking(true);
    try {
      let extracted = text;
      if (file) {
        const response = await extractOcrText(file);
        extracted = response.ocr.text || "";
        setText(extracted);
      }
      const validation = await validateOcr({ ocrText: extracted, claimedMetadata: {} });
      setScore(validation.validation.score);
      setStatus("Document scan complete. Review the confidence score before trusting this file.");
    } catch (error: any) {
      setStatus("We could not analyze this document right now. Try another file or paste readable document text.");
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
            Upload a certificate, result, or academic document to check for suspicious signals before you trust it.
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
                  accept="application/pdf,image/*"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                  className="border-white/10 bg-white/5 pl-10 file:border-0 file:bg-transparent file:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/50">Document text</Label>
              <Textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste readable document text here, or upload a file above."
                className="min-h-36 border-white/10 bg-white/5"
              />
            </div>
            <Button disabled={isChecking || (!file && !text)} onClick={checkDocument} className="h-12 w-full rounded-full bg-primary font-bold text-white hover:bg-primary/90">
              {isChecking ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check Authenticity"}
            </Button>
          </div>

          {(score !== null || status) && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                {score !== null && score >= 70 ? <ShieldCheck className="mt-0.5 h-5 w-5 text-success" /> : <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-400" />}
                <div>
                  <p className="font-bold">{score !== null ? `${score}% confidence` : "Scan unavailable"}</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">{status}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}
