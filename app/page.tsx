"use client";

import dynamic from "next/dynamic";

// Import Background3D secara dynamic agar berjalan lancar di client-side
const Background3D = dynamic(() => import("./components/Background3D"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* 1. BACKGROUND GAMBAR LAMPION TANGLED */}
      <img
        src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
        alt="Tangled Floating Lanterns"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none opacity-60 scale-105"
        style={{ zIndex: 0 }}
      />

      {/* 2. OVERLAY DARK TRANSPARAN */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 backdrop-blur-[1px]"
        style={{ zIndex: 1 }}
      />

      {/* 3. ANIMASI LAMPION TERBANG 4D */}
      <Background3D />

      {/* 4. KONTEN UTAMA */}
      <div
        className="relative max-w-xl mx-auto px-5 py-16 md:py-24"
        style={{ zIndex: 10 }}
      >
        {/* Header Badges & Title */}
        <header className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/50 text-xs font-mono text-emerald-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SYIF.APK_16
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Syif.apk_16
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
            Suka kata-kata, tapi lebih suka ngetik daripada nulis. Bukan
            motivator, hanya merangkai rasa menjadi kata.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-xs text-slate-200 transition-all backdrop-blur-md"
            >
              Instagram ↗
            </a>
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-xs text-slate-200 transition-all backdrop-blur-md"
            >
              Copy Link 📋
            </button>
          </div>
        </header>

        {/* Recent Logs Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>RECENT LOGS</span>
            <span>8 entries</span>
          </div>

          <article className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <time>2026-08-01</time>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                #Tamparan
              </span>
            </div>
            <p className="text-slate-200 italic leading-relaxed">
              "Antara malu atau terharu, Tuhan masih mendengarkan Doaku seakan
              tidak peduli dengan Dosaku"
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <time>2026-07-31</time>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                #Tamparan
              </span>
            </div>
            <p className="text-slate-200 italic leading-relaxed">
              "Sampaikan ide terbaikmu yang membuat orang lain menjadi lebih
              baik"
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
