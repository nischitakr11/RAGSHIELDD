import React, { useEffect, useState } from 'react';
import { EntryThreeScene } from '../components/three/EntryThreeScene';

interface EntryPageProps {
  onAccessPlatform: () => void;
}

export const EntryPage: React.FC<EntryPageProps> = ({ onAccessPlatform }) => {
  const [stageBadge, setStageBadge] = useState(false);
  const [stageTagline, setStageTagline] = useState(false);
  const [stageCta, setStageCta] = useState(false);

  useEffect(() => {
    // Sequential entrance reveal
    const t1 = setTimeout(() => setStageBadge(true), 400);
    const t2 = setTimeout(() => setStageTagline(true), 1100);
    const t3 = setTimeout(() => setStageCta(true), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStageChange = (stage: string) => {
    if (stage === 'cta' || stage === 'ledger') {
      setStageCta(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060608] text-slate-200 antialiased selection:bg-gold-500 selection:text-black">
      {/* 1. Real Three.js Interactive 3D Scene */}
      <EntryThreeScene
        onAccessPlatform={onAccessPlatform}
        onStageChange={handleStageChange}
      />

      {/* 2. Ambient radial gold illumination */}
      <div className="pointer-events-none absolute inset-0 ambient-radial-gold z-[1]" />

      {/* 3. Main Interactive UI Overlay Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between pointer-events-none">
        {/* Main Hero Section */}
        <main
          className="relative flex flex-1 flex-col items-center justify-between px-4 pt-10 pb-6 sm:px-6 lg:px-8"
          data-purpose="hero-main-container"
        >
          {/* Centered Branding and Value Proposition */}
          <section
            className="mx-auto flex max-w-4xl flex-col items-center text-center mt-2"
            data-purpose="brand-hero-header"
          >
            {/* Cryptographic Monogram Protocol Badge */}
            <div
              className={`stage-anim-badge mb-3.5 flex items-center justify-center transition-all duration-1000 ${
                stageBadge ? 'stage-active' : ''
              }`}
            >
              <div className="relative flex items-center space-x-2 rounded-full border border-[#d4af37]/35 bg-[#120F0A]/80 px-4 py-1 text-[11px] font-mono tracking-widest text-[#f3e5ab] shadow-[0_0_20px_rgba(197,160,89,0.2)] backdrop-blur-md">
                <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-[#e6c983]" />
                <span className="uppercase">CRYPTOGRAPHIC INTEGRITY PROTOCOL</span>
              </div>
            </div>

            {/* 1. Brand Title: RAGSHIELD. in large serif typography */}
            <h1
              className={`stage-anim-title font-serifBrand text-6xl font-black tracking-[0.24em] sm:text-7xl md:text-8xl lg:text-9xl text-gold-metallic select-none transition-all duration-1000 ${
                stageBadge ? 'stage-active' : ''
              }`}
            >
              RAGSHIELD.
            </h1>

            {/* 2. Tagline: Elegant italicized serif */}
            <p
              className={`stage-anim-tagline mt-2 font-serifTagline text-2xl sm:text-3xl md:text-4xl italic text-slate-300 tracking-wide font-normal transition-all duration-1000 ${
                stageTagline ? 'stage-active' : ''
              }`}
            >
              Trust the Source.{' '}
              <span className="font-semibold text-gold-subtle not-italic">
                Verify the Knowledge.
              </span>
            </p>

            {/* 3. Subtitle / Value Proposition */}
            <p
              className={`stage-anim-sub mt-4 max-w-2xl font-sans text-sm sm:text-base font-light tracking-wide text-slate-400 px-4 transition-all duration-1000 ${
                stageTagline ? 'stage-active' : ''
              }`}
            >
              A cryptographic framework for RAG knowledge base integrity and poisoning detection.
            </p>

            {/* 4. Interactive Floating 3D "ACCESS PLATFORM →" CTA */}
            <div
              className={`stage-anim-cta mt-8 pointer-events-auto transition-all duration-1000 ${
                stageCta ? 'stage-active' : ''
              }`}
            >
              <button
                type="button"
                onClick={onAccessPlatform}
                className="btn-3d-access group relative inline-flex items-center gap-3.5 overflow-hidden rounded-lg border border-[#e6c983]/80 bg-gradient-to-b from-[#2E2413] via-[#1E170C] to-[#120D06] px-9 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#FFF6D6] backdrop-blur-md cursor-pointer select-none"
                data-purpose="primary-hero-cta"
              >
                {/* Metallic specular highlight facet */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#f7ecc8] to-transparent" />
                <span className="relative z-10 font-mono font-bold tracking-[0.22em] text-[#fdf8ec] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  ACCESS PLATFORM
                </span>
                <svg
                  className="relative z-10 h-4 w-4 text-[#f3e5ab] transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Shimmer light sweep */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </section>

          {/* Sleek Minimal Typographic Labels beneath corresponding 3D Object Node zones */}
          <section
            className={`stage-anim-nodes relative mx-auto mb-2 w-full max-w-5xl pointer-events-auto transition-all duration-1000 ${
              stageCta ? 'stage-active' : ''
            }`}
            data-purpose="node-typographic-labels"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 text-center">
              {/* Node 1: Document Stack */}
              <div className="group flex flex-col items-center">
                <div className="w-full max-w-[220px] rounded-xl border border-[#d4af37]/25 bg-[#0B0A0E]/85 px-4 py-3 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#e6c983]/60 hover:bg-[#141219]/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-[#e6c983]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                      DOCUMENT
                    </span>
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-slate-400">
                    Upload &amp; Register
                  </div>
                </div>
              </div>

              {/* Node 2: SHA-256 Fingerprint */}
              <div className="group flex flex-col items-center">
                <div className="w-full max-w-[230px] rounded-xl border border-[#e6c983]/50 bg-[#16120B]/90 px-4 py-3 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 hover:border-[#f3e5ab] hover:bg-[#201A0E] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-[#f3e5ab]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                    </svg>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f7ecc8]">
                      HASH GENERATION
                    </span>
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-slate-300">
                    SHA-256 Fingerprint
                  </div>
                </div>
              </div>

              {/* Node 3: Hash-Linked Ledger */}
              <div className="group flex flex-col items-center">
                <div className="w-full max-w-[240px] rounded-xl border border-[#d4af37]/25 bg-[#0B0A0E]/85 px-4 py-3 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#e6c983]/60 hover:bg-[#141219]/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-[#e6c983]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                      HASH-LINKED LEDGER
                    </span>
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-slate-400">
                    Fingerprint Tracking &amp; Change Detection
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Cryptographic Telemetry Bar */}
        <footer
          className="relative w-full border-t border-[#d4af37]/15 bg-black/85 backdrop-blur-md py-3.5 pointer-events-auto"
          data-purpose="ambient-telemetry-footer"
        >
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-400 sm:flex-row sm:px-10 lg:px-12">
            {/* Local SHA-256 Audit Integrity Status */}
            <div className="flex items-center space-x-2.5 font-mono text-[11px] tracking-wide">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
              <span className="text-slate-300">
                DEMO INTERFACE • LOCAL SHA-256 AUDIT ARCHITECTURE
              </span>
            </div>
            {/* Cryptographic Architecture Indicators */}
            <div className="flex items-center space-x-6 font-mono text-[11px] tracking-widest text-slate-400">
              <span>SHA-256 SPECIFICATION</span>
              <span className="text-[#d4af37]/40">•</span>
              <span>LOCAL HASH-LINKED LEDGER</span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="font-semibold text-[#f2ca50]">RAGSHIELD v2.4 (DEMO MODE)</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
