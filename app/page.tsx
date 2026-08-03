"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import untuk Background 3D (agar tidak berat saat loading awal)
const Background3D = dynamic(() => import("./components/Background3D"), {
  ssr: false,
});

export default function Home() {
  const [words, setWords] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data Portofolio (Bisa kamu ubah/tambah sesuai keinginan)
  const portfolioItems = [
    {
      id: 1,
      title: "Syif.apk_16 Web Journal",
      category: "Web Development & Design",
      description:
        "Website jurnal pribadi terintegrasi otomatis dengan Notion API dan efek 3D interaktif.",
      link: "#",
      tag: "Next.js • Notion API • Tailwind",
    },
    {
      id: 2,
      title: "Digital Content Creation",
      category: "Instagram & TikTok",
      description:
        "Merangkai rasa menjadi kata lewat konten visual bertema estetik dan relatable.",
      link: "https://instagram.com/syif.apk_16",
      tag: "Social Media • Storytelling",
    },
  ];

  useEffect(() => {
    async function fetchNotionData() {
      try {
        const res = await fetch("/api/words");
        if (res.ok) {
          const data = await res.json();
          setWords(data);
        }
      } catch (err) {
        console.error("Failed to load words:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotionData();
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen w-full text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden bg-slate-950">
      {/* 1. BACKGROUND GAMBAR LAMPION TANGLED */}
      <img
        src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
        alt="Tangled Floating Lanterns"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none opacity-60 scale-105"
        style={{ zIndex: 0 }}
      />

      {/* 2. OVERLAY DARK TRANSPARAN AGAR TEKS TETAP DIBACA DENGAN JELAS */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70 backdrop-blur-[1px]"
        style={{ zIndex: 1 }}
      />

      {/* 3. EFEK LAMPION TERBANG 4D */}
      <Background3D />

      {/* 4. KONTEN UTAMA (Teks & Card - z-index 10) */}
      <div
        className="relative max-w-xl mx-auto px-5 py-16 md:py-24"
        style={{ zIndex: 10 }}
      >
        {/* HEADER SECTION */}
        <header className="mb-14 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/40 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-mono text-[11px] tracking-wider text-slate-300 font-medium uppercase">
              syif.apk_16
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3 font-mono">
            Syif.apk_16
          </h1>

          <p className="text-slate-300/90 text-sm md:text-base leading-relaxed font-light max-w-md mx-auto">
            Suka kata-kata, tapi lebih suka ngetik daripada nulis. Bukan
            motivator, hanya merangkai rasa menjadi kata.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://instagram.com/syif.apk_16"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-xs font-mono backdrop-blur-md"
            >
              Instagram ↗
            </a>

            <button
              onClick={handleCopyLink}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-xs font-mono backdrop-blur-md cursor-pointer"
            >
              {copied ? "Copied! ✨" : "Copy Link 📋"}
            </button>
          </div>
        </header>

        {/* SECTION 1: LOG KATA-KATA */}
        <section className="space-y-4 mb-16">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400/80 px-1 mb-2">
            <span className="tracking-widest uppercase text-[10px] text-emerald-400/80 font-medium">
              Recent Logs
            </span>
            <span className="text-[11px] text-slate-400">
              {words.length} entries
            </span>
          </div>

          {loading ? (
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-white/10 text-center font-mono text-xs text-slate-400 backdrop-blur-md">
              Memuat log kata...
            </div>
          ) : words.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-white/10 text-center font-mono text-xs text-slate-400 backdrop-blur-md">
              Belum ada log kata tersimpan.
            </div>
          ) : (
            words.map((item: any) => (
              <article
                key={item.id}
                className="group relative p-6 rounded-2xl bg-slate-900/35 border border-white/10 backdrop-blur-lg hover:border-emerald-500/30 hover:bg-slate-900/50 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="text-[11px] text-slate-400 font-light">
                    {item.date || "Log"}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/20 text-[10px] font-medium">
                    #{item.category}
                  </span>
                </div>

                <p className="text-slate-100 text-base md:text-lg leading-relaxed font-serif italic tracking-wide group-hover:text-white transition-colors">
                  "{item.word}"
                </p>
              </article>
            ))
          )}
        </section>

        {/* SECTION 2: PORTOFOLIO / KARYA */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400/80 px-1 mb-2">
            <span className="tracking-widest uppercase text-[10px] text-emerald-400/80 font-medium">
              Selected Works & Projects
            </span>
            <span className="text-[11px] text-slate-400">Portfolio</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-lg hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="text-[10px] font-mono text-emerald-400 mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg inline-block border border-white/5">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 pt-6 border-t border-white/5 text-center font-mono text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Syif.apk_16 • Minimalist Journal &
            Portfolio
          </p>
        </footer>
      </div>
    </main>
  );
}
