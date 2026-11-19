import React from 'react';

interface HomePageProps {
  onLaunchWorkspace: () => void;
  onNavigateEntry?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onLaunchWorkspace,
  onNavigateEntry,
}) => {
  return (
    <div className="bg-[#131316] font-sans text-[#e4e1e6] antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e11]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-[#2a2a2d]/40 transition-colors duration-500">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onNavigateEntry}
              className="flex items-center gap-1 group text-left cursor-pointer"
            >
              <span className="font-serifBrand text-2xl font-bold tracking-tight text-[#f2ca50] transition-transform duration-300 group-hover:scale-[1.01]">
                RAGSHIELD<span className="text-[#e1c384]">.</span>
              </span>
            </button>
            <div className="hidden xl:flex items-center px-3 py-1 rounded-full bg-[#2a2a2d]/60 border border-[#4d4635]/30 transition-all duration-300 hover:border-[#f2ca50]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse mr-2" />
              <span className="font-mono text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider">
                DEMO MODE • SHA-256 / C LEDGER SPEC
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="transition-colors text-[#f2ca50] font-semibold text-sm nav-link-glow"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-sm text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow"
            >
              How It Works
            </a>
            <a
              href="#architecture"
              className="text-sm text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow"
            >
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onLaunchWorkspace}
              className="lux-btn hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f2ca50] via-[#d4af37] to-[#e1c384] text-[#3c2f00] font-semibold text-sm shadow-[0_0_24px_-4px_rgba(242,202,80,0.35)] hover:shadow-[0_0_32px_0px_rgba(242,202,80,0.55)] cursor-pointer"
            >
              Launch Workspace →
            </button>
            <div
              onClick={onLaunchWorkspace}
              className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center shadow-inner transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#3c2f00] text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 bg-[#131316] flex-1">
        <div className="flex flex-col w-full" id="home">
          {/* AMBIENT GLOW BACKDROP */}
          <div className="relative w-full overflow-hidden">
            <div className="animate-ambient-top absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#f2ca50]/15 via-[#e1c384]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
            <div className="animate-orb-left absolute top-96 -left-32 w-80 h-80 bg-[#d4af37]/15 blur-3xl pointer-events-none rounded-full" />
            <div className="animate-orb-right absolute top-[800px] -right-32 w-96 h-96 bg-[#e1c384]/15 blur-3xl pointer-events-none rounded-full" />

            {/* SECTION 1: HERO SECTION */}
            <section className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-20 flex flex-col items-center text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a2a2d]/80 border border-[#4d4635]/40 backdrop-blur-md mb-8 shadow-sm transition-all duration-300 hover:border-[#f2ca50]/50">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f2ca50]" />
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-widest text-[#f2ca50] uppercase">
                  CRYPTOGRAPHIC INTEGRITY FRAMEWORK • DEMO PREVIEW (PRE-BACKEND)
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-headline-lg text-4xl sm:text-6xl md:text-7xl max-w-4xl text-[#e4e1e6] tracking-tight leading-none mb-6">
                Integrity for{' '}
                <span className="bg-gradient-to-r from-[#f2ca50] via-[#e1c384] to-[#ffe088] bg-clip-text text-transparent italic">
                  RAG Knowledge Bases.
                </span>
              </h1>

              {/* Supporting Subtitle */}
              <p className="font-body-lg text-base sm:text-lg text-[#d0c5af] max-w-2xl mb-10 leading-relaxed">
                A cryptographic framework designed to protect document integrity through SHA-256
                fingerprinting and hash-linked verification.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <button
                  type="button"
                  onClick={onLaunchWorkspace}
                  className="lux-btn group relative px-8 py-3.5 rounded-lg bg-gradient-to-br from-[#f2ca50] via-[#d4af37] to-[#e1c384] text-[#3c2f00] font-semibold text-sm shadow-xl shadow-[#f2ca50]/20 hover:shadow-[#f2ca50]/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Workspace →</span>
                </button>
                <a
                  href="#architecture"
                  className="lux-btn px-8 py-3.5 rounded-lg bg-[#1f1f22]/70 border border-[#4d4635]/40 backdrop-blur-md text-[#e1c384] font-semibold text-sm hover:bg-[#2a2a2d] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#f2ca50] transition-transform duration-300 group-hover:rotate-6">
                    schema
                  </span>
                  <span>Explore Architecture</span>
                </a>
              </div>

              {/* 3D STEP PIPELINE HERO VISUAL */}
              <div className="w-full relative mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                  {/* Step 1: Document Registration */}
                  <div className="lux-card group relative flex flex-col p-6 rounded-xl bg-[#1b1b1e]/90 border border-[#4d4635]/30 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                        STAGE 01
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#353438] font-mono text-[11px] text-[#d0c5af]">
                        MIME: APPLICATION/PDF
                      </span>
                    </div>

                    <div className="relative h-44 rounded-lg bg-[#0e0e11] border border-[#4d4635]/20 flex flex-col p-4 overflow-hidden mb-4 justify-between transition-colors duration-300 group-hover:border-[#f2ca50]/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#f2ca50] text-[22px] transition-transform duration-300 group-hover:scale-110">
                            description
                          </span>
                          <span className="font-mono text-[13px] text-[#e4e1e6]">
                            security_policy.pdf
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#acdaa6]/20 text-[#acdaa6] font-mono text-[10px]">
                          RECORDED
                        </span>
                      </div>

                      <div className="space-y-1.5 py-2 font-mono text-[11px] text-left">
                        <div className="flex items-center justify-between text-[#d0c5af]">
                          <span>FILE SIZE:</span>
                          <span className="text-[#e4e1e6]">148.6 KB</span>
                        </div>
                        <div className="flex items-center justify-between text-[#d0c5af]">
                          <span>STORAGE PATH:</span>
                          <span className="text-[#e1c384]">workspace://docs/</span>
                        </div>
                        <div className="flex items-center justify-between text-[#d0c5af]">
                          <span>RECORD ID:</span>
                          <span className="text-[#f2ca50] font-mono">DOC_0x44B1</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[10px] text-[#d0c5af] pt-2 border-t border-[#2a2a2d]">
                        <span>Status: Ingested</span>
                        <span className="text-[#acdaa6]">MIME Validated</span>
                      </div>
                    </div>

                    <h3 className="font-headline-sm text-lg text-[#e4e1e6] text-left mb-1 font-semibold">
                      Document Registration
                    </h3>
                    <p className="font-body-sm text-xs text-[#d0c5af] text-left">
                      Deterministic document ingestion, metadata logging, and structured file persistence.
                    </p>
                  </div>

                  {/* Connector 1 */}
                  <div className="hidden lg:flex absolute top-1/2 left-[31%] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none items-center justify-center">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#f2ca50]/80 to-[#e1c384]/80 rounded-full animate-pulse" />
                  </div>

                  {/* Step 2: SHA-256 Fingerprinting */}
                  <div className="lux-card group relative flex flex-col p-6 rounded-xl bg-[#1f1f22]/90 border border-[#4d4635]/30 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] font-semibold text-[#e1c384] tracking-widest uppercase">
                        STAGE 02
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                        <span className="font-mono text-[11px] text-[#acdaa6]">OPENSSL CRYPTO</span>
                      </div>
                    </div>

                    <div className="relative h-44 rounded-lg bg-[#0e0e11] border border-[#4d4635]/20 p-4 overflow-hidden mb-4 flex flex-col justify-between transition-colors duration-300 group-hover:border-[#e1c384]/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2a2a2d] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">
                            fingerprint
                          </span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-mono text-[10px] text-[#d0c5af] uppercase">
                            OPENSSL SHA256()
                          </span>
                          <span className="font-mono text-[11px] text-[#e1c384] font-semibold">
                            256-BIT DIGEST ENGINE
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#1f1f22] font-mono text-[11px] text-left text-[#e4e1e6] space-y-1">
                        <div className="flex items-center justify-between text-[#d0c5af] text-[10px]">
                          <span>COMPUTED SHA-256</span>
                          <span className="text-[#acdaa6]">STANDARD RFC 6234</span>
                        </div>
                        <div className="truncate font-mono hash-shimmer-text">
                          5f94b128c7c91a382109e46a782b54432194ff0399d8e
                        </div>
                      </div>

                      <div className="w-full bg-[#353438] h-1 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#f2ca50] to-[#e1c384] h-full w-[100%] animate-pulse" />
                      </div>
                    </div>

                    <h3 className="font-headline-sm text-lg text-[#e4e1e6] text-left mb-1 font-semibold">
                      SHA-256 Fingerprinting
                    </h3>
                    <p className="font-body-sm text-xs text-[#d0c5af] text-left">
                      Generates unique cryptographic digests for document files using OpenSSL SHA-256.
                    </p>
                  </div>

                  {/* Connector 2 */}
                  <div className="hidden lg:flex absolute top-1/2 left-[64%] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none items-center justify-center">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#f2ca50]/80 to-[#e1c384]/80 rounded-full animate-pulse" />
                  </div>

                  {/* Step 3: Hash-Linked Ledger */}
                  <div className="lux-card group relative flex flex-col p-6 rounded-xl bg-[#1b1b1e]/90 border border-[#4d4635]/30 backdrop-blur-xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                        STAGE 03
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#353438] font-mono text-[11px] text-[#acdaa6]">
                        BLOCK #0042
                      </span>
                    </div>

                    <div className="relative h-44 rounded-lg bg-[#0e0e11] border border-[#4d4635]/20 p-4 overflow-hidden mb-4 flex flex-col justify-between transition-colors duration-300 group-hover:border-[#f2ca50]/30">
                      <div className="flex items-center justify-between text-left">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#e1c384] text-[22px] transition-transform duration-300 group-hover:rotate-12">
                            link
                          </span>
                          <span className="font-mono text-[13px] text-[#e4e1e6]">
                            Linked-List Node
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[#acdaa6] text-[18px] animate-pulse">
                          verified
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <div className="flex-1 p-2 rounded bg-[#2a2a2d] text-left transition-colors duration-300 group-hover:bg-[#1f1f22]">
                          <span className="text-[#d0c5af] block text-[9px]">PREV_HASH</span>
                          <span className="text-[#e1c384] truncate block">0x81b7e2..a91c</span>
                        </div>
                        <span className="text-[#f2ca50] text-xs">→</span>
                        <div className="flex-1 p-2 rounded bg-[#353438] text-left shadow-sm transition-colors duration-300 group-hover:border group-hover:border-[#f2ca50]/30">
                          <span className="text-[#f2ca50] block text-[9px]">CURR_HASH</span>
                          <span className="text-[#e4e1e6] truncate block">0x5f94b1..99d8</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[10px] text-[#d0c5af]">
                        <span>Structure: Pointer Chain</span>
                        <span className="text-[#acdaa6]">State: Verified</span>
                      </div>
                    </div>

                    <h3 className="font-headline-sm text-lg text-[#e4e1e6] text-left mb-1 font-semibold">
                      Hash-Linked Ledger
                    </h3>
                    <p className="font-body-sm text-xs text-[#d0c5af] text-left">
                      Maintains a pointer-based linked-list audit history chaining each document hash.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: CORE CAPABILITIES (2x2 Grid) */}
            <section
              className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col gap-12 border-t border-[#2a2a2d]/30"
              id="features"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                  <span className="font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                    CORE CAPABILITIES
                  </span>
                  <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] mt-2">
                    Four Pillars of Knowledge Protection
                  </h2>
                </div>
                <p className="font-body-md text-sm sm:text-base text-[#d0c5af] max-w-md">
                  A focused, practical cryptographic framework ensuring document baseline integrity,
                  auditability, and change detection for your knowledge bases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="lux-card p-8 rounded-2xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[28px]">folder_open</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-[#f2ca50] uppercase">
                        CAPABILITY 01 // INGESTION
                      </span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-[#e4e1e6] mb-2 font-semibold">
                      Document Registration
                    </h3>
                    <p className="font-body-md text-sm text-[#d0c5af] mb-6 leading-relaxed">
                      Register and manage knowledge-base documents. Each document is stored with structured metadata, MIME classification, and file-level access tracking.
                    </p>
                    <div className="p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[12px] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2a2a2d] pb-2">
                        <span className="text-[#e4e1e6] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">draft</span>
                          security_compliance_v2.pdf
                        </span>
                        <span className="text-[#acdaa6] font-mono text-[11px]">REGISTERED</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d0c5af]">
                        <div>MIME: <span className="text-[#e4e1e6]">application/pdf</span></div>
                        <div>Byte Size: <span className="text-[#e4e1e6]">428,190 bytes</span></div>
                        <div>Storage: <span className="text-[#e1c384]">workspace://docs/</span></div>
                        <div>Status: <span className="text-[#acdaa6]">Indexed</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#2a2a2d]/40 font-mono text-[11px] text-[#d0c5af]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                      PDF / DOCX / TXT / MD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
                      Structured Storage
                    </span>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="lux-card p-8 rounded-2xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#e1c384] transition-transform duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[28px]">fingerprint</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-[#e1c384] uppercase">
                        CAPABILITY 02 // CRYPTOGRAPHY
                      </span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-[#e4e1e6] mb-2 font-semibold">
                      SHA-256 Fingerprinting
                    </h3>
                    <p className="font-body-md text-sm text-[#d0c5af] mb-6 leading-relaxed">
                      Generate unique cryptographic fingerprints for documents. Computes a standard 256-bit collision-resistant digest using OpenSSL's trusted cryptographic library.
                    </p>
                    <div className="p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[12px] space-y-2.5">
                      <div className="flex items-center justify-between text-[#d0c5af] text-[11px]">
                        <span>OPENSSL EVP_DigestInit_ex(ctx, EVP_sha256())</span>
                        <span className="text-[#f2ca50] font-semibold">256-BIT</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#1f1f22] text-[#f2ca50] text-[11px] break-all leading-relaxed font-mono">
                        0xa94a8fe5ccb19ba61c4c0873d391e987982fbbd3d3b964c08e56a6521e84a22c
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#d0c5af] pt-1">
                        <span>Collision Probability: <span className="text-[#acdaa6]">Negligible</span></span>
                        <span className="text-[#acdaa6]">FIPS Compliant</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#2a2a2d]/40 font-mono text-[11px] text-[#d0c5af]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                      OpenSSL libcrypto
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
                      RFC 6234 Standard
                    </span>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="lux-card p-8 rounded-2xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[28px]">link</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-[#f2ca50] uppercase">
                        CAPABILITY 03 // AUDIT TRAIL
                      </span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-[#e4e1e6] mb-2 font-semibold">
                      Hash-Linked Ledger
                    </h3>
                    <p className="font-body-md text-sm text-[#d0c5af] mb-6 leading-relaxed">
                      Maintain a linked audit history of registered documents. Implements a pointer-based linked-list structure where every block encapsulates its previous hash pointer.
                    </p>
                    <div className="p-4 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[11px] space-y-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded bg-[#2a2a2d] border border-[#4d4635]/30 flex flex-col gap-1">
                          <div className="text-[#f2ca50] font-semibold">BLOCK #101</div>
                          <div className="text-[#d0c5af] text-[10px]">PREV: <span className="text-[#e1c384]">000000...0000</span></div>
                          <div className="text-[#d0c5af] text-[10px]">HASH: <span className="text-[#e4e1e6]">3c89b1...e412</span></div>
                        </div>
                        <div className="p-3 rounded bg-[#1f1f22] border border-[#f2ca50]/40 flex flex-col gap-1 relative shadow-sm">
                          <div className="text-[#f2ca50] font-semibold flex items-center justify-between">
                            <span>BLOCK #102</span>
                            <span className="text-[#acdaa6] text-[9px] uppercase animate-pulse">LATEST</span>
                          </div>
                          <div className="text-[#d0c5af] text-[10px]">PREV: <span className="text-[#e1c384]">3c89b1...e412</span></div>
                          <div className="text-[#d0c5af] text-[10px]">HASH: <span className="text-[#e4e1e6]">7f42d0...a991</span></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-[#d0c5af]">
                        <span>Pointer-linked: (node-&gt;prev_hash)</span>
                        <span className="text-[#e1c384]">Chronological Order</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#2a2a2d]/40 font-mono text-[11px] text-[#d0c5af]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                      Sequential Linked-List
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
                      Append-Only Audit
                    </span>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="lux-card p-8 rounded-2xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#acdaa6] transition-transform duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[28px]">fact_check</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-[#acdaa6] uppercase">
                        CAPABILITY 04 // VERIFICATION
                      </span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-[#e4e1e6] mb-2 font-semibold">
                      Integrity Verification
                    </h3>
                    <p className="font-body-md text-sm text-[#d0c5af] mb-6 leading-relaxed">
                      Detect document modifications through SHA-256 hash comparison. Compares newly computed runtime hashes against ledger records to confirm baseline consistency or flag divergence.
                    </p>
                    <div className="p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[11px] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#d0c5af]">LEDGER DIGEST:</span>
                        <span className="text-[#e1c384] font-mono">5f94b128...c7c9</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#d0c5af]">RUNTIME DIGEST:</span>
                        <span className="text-[#e1c384] font-mono">5f94b128...c7c9</span>
                      </div>
                      <div className="p-2 rounded bg-[#acdaa6]/10 border border-[#acdaa6]/30 flex items-center justify-between text-[#acdaa6] text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] animate-pulse">check_circle</span>
                          EVALUATION: MEMCMP MATCH
                        </span>
                        <span className="font-bold">STATUS: AUTHENTIC</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#2a2a2d]/40 font-mono text-[11px] text-[#d0c5af]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                      Byte-Exact Comparison
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
                      Immediate Divergence Alert
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: HOW IT WORKS WORKFLOW */}
            <section
              className="w-full bg-[#0e0e11] py-24 border-y border-[#2a2a2d]/30"
              id="how-it-works"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
                <div className="text-center max-w-3xl mb-16">
                  <span className="font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                    WORKFLOW SPECIFICATION
                  </span>
                  <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] mt-2 mb-4">
                    How RAGSHIELD Protects Knowledge Bases
                  </h2>
                  <p className="font-body-lg text-sm sm:text-base text-[#d0c5af]">
                    A clean 5-stage sequential verification pipeline ensuring document provenance.
                  </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
                  {/* Step 1 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center font-mono font-bold text-xs">
                        01
                      </span>
                      <span className="font-mono text-[10px] text-[#d0c5af] uppercase">STEP 1</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold mb-1">
                        Document Input
                      </h4>
                      <p className="font-body-sm text-xs text-[#d0c5af] mb-4">
                        Load document from knowledge base source and inspect file bytes.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[10px] text-[#e1c384] space-y-0.5">
                      <div>Source: Local / REST</div>
                      <div>File: knowledge.pdf</div>
                      <div className="text-[#acdaa6]">Loaded: OK</div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#e1c384]/20 text-[#e1c384] flex items-center justify-center font-mono font-bold text-xs">
                        02
                      </span>
                      <span className="font-mono text-[10px] text-[#d0c5af] uppercase">STEP 2</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold mb-1">
                        SHA-256 Generation
                      </h4>
                      <p className="font-body-sm text-xs text-[#d0c5af] mb-4">
                        Compute standard 256-bit cryptographic digest using OpenSSL.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[10px] text-[#f2ca50] space-y-0.5">
                      <div>Func: SHA256()</div>
                      <div>Length: 32 bytes</div>
                      <div className="text-[#acdaa6]">Digest: Generated</div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#ffe088]/20 text-[#ffe088] flex items-center justify-center font-mono font-bold text-xs">
                        03
                      </span>
                      <span className="font-mono text-[10px] text-[#d0c5af] uppercase">STEP 3</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold mb-1">
                        Hash-Linked Ledger
                      </h4>
                      <p className="font-body-sm text-xs text-[#d0c5af] mb-4">
                        Append block to chronological linked-list ledger with prev_hash pointer.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[10px] text-[#e4e1e6] space-y-0.5">
                      <div>Node: block_node_t</div>
                      <div>Link: prev_hash-&gt;hash</div>
                      <div className="text-[#e1c384]">Chain: Intact</div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#acdaa6]/20 text-[#acdaa6] flex items-center justify-center font-mono font-bold text-xs">
                        04
                      </span>
                      <span className="font-mono text-[10px] text-[#d0c5af] uppercase">STEP 4</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold mb-1">
                        Integrity Verification
                      </h4>
                      <p className="font-body-sm text-xs text-[#d0c5af] mb-4">
                        Re-compute hash on query and compare against ledger record.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[10px] text-[#acdaa6] space-y-0.5">
                      <div>Check: memcmp()</div>
                      <div>Input: Runtime doc</div>
                      <div className="text-[#acdaa6]">Compare: 0 diff</div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#acdaa6]/20 text-[#acdaa6] flex items-center justify-center font-mono font-bold text-xs">
                        05
                      </span>
                      <span className="font-mono text-[10px] text-[#d0c5af] uppercase">STEP 5</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold mb-1">
                        Verification Result
                      </h4>
                      <p className="font-body-sm text-xs text-[#d0c5af] mb-4">
                        Detect match or flag content divergence from registered fingerprint.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[10px] text-[#acdaa6] space-y-0.5">
                      <div>Status: Verified</div>
                      <div>Integrity: Pass</div>
                      <div className="text-[#acdaa6]">Decision: ALLOW</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: TECHNICAL ARCHITECTURE */}
            <section
              className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col"
              id="architecture"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                    SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] mt-2">
                    Engineered in C for High-Assurance Cryptography
                  </h2>
                </div>
                <p className="font-body-md text-sm sm:text-base text-[#d0c5af] max-w-md">
                  A focused, reliable architecture connecting a low-level C cryptographic core with
                  modern frontend interfaces.
                </p>
              </div>

              {/* Architecture Block Canvas */}
              <div className="w-full p-8 lg:p-10 rounded-2xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-2xl flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                  {/* Box 1: C Backend */}
                  <div className="lux-card p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">terminal</span>
                      <span className="font-mono text-[10px] text-[#f2ca50]">CORE</span>
                    </div>
                    <div>
                      <h5 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">C Backend</h5>
                      <p className="font-body-sm text-[12px] text-[#d0c5af] mt-1">High-performance core logic and direct memory management in pure C.</p>
                    </div>
                    <div className="mt-auto pt-2 font-mono text-[10px] text-[#e1c384]">
                      &gt; Low-level Reliability
                    </div>
                  </div>

                  {/* Box 2: OpenSSL SHA-256 */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col gap-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#e1c384] text-[24px]">lock</span>
                      <span className="font-mono text-[10px] text-[#e1c384]">CRYPTO</span>
                    </div>
                    <div>
                      <h5 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">OpenSSL SHA-256</h5>
                      <p className="font-body-sm text-[12px] text-[#d0c5af] mt-1">Standard OpenSSL crypto library for deterministic fingerprint generation.</p>
                    </div>
                    <div className="mt-auto pt-2 font-mono text-[10px] text-[#acdaa6]">
                      &gt; libcrypto Standard
                    </div>
                  </div>

                  {/* Box 3: Linked-List Data Structure */}
                  <div className="lux-card p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">account_tree</span>
                      <span className="font-mono text-[10px] text-[#f2ca50]">LEDGER</span>
                    </div>
                    <div>
                      <h5 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">Linked-List Ledger</h5>
                      <p className="font-body-sm text-[12px] text-[#d0c5af] mt-1">Pointer-based ledger chaining each block to the previous digest (`prev_hash`).</p>
                    </div>
                    <div className="mt-auto pt-2 font-mono text-[10px] text-[#e1c384]">
                      &gt; Pointer Chain
                    </div>
                  </div>

                  {/* Box 4: Storage & Verify */}
                  <div className="lux-card p-5 rounded-xl bg-[#1f1f22] border border-[#4d4635]/30 flex flex-col gap-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#acdaa6] text-[24px]">find_in_page</span>
                      <span className="font-mono text-[10px] text-[#acdaa6]">ENGINE</span>
                    </div>
                    <div>
                      <h5 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">Storage &amp; Verify</h5>
                      <p className="font-body-sm text-[12px] text-[#d0c5af] mt-1">Structured document storage and hash comparison engine detecting byte changes.</p>
                    </div>
                    <div className="mt-auto pt-2 font-mono text-[10px] text-[#acdaa6]">
                      &gt; Hash Comparison
                    </div>
                  </div>

                  {/* Box 5: REST API */}
                  <div className="lux-card p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[#e1c384] text-[24px]">api</span>
                      <span className="font-mono text-[10px] text-[#e1c384]">API</span>
                    </div>
                    <div>
                      <h5 className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">REST API</h5>
                      <p className="font-body-sm text-[12px] text-[#d0c5af] mt-1">Clean HTTP endpoints connecting the frontend interface with the C backend service.</p>
                    </div>
                    <div className="mt-auto pt-2 font-mono text-[10px] text-[#acdaa6]">
                      &gt; JSON HTTP Service
                    </div>
                  </div>
                </div>

                {/* Planned C Runtime Architecture Specification */}
                <div className="p-5 rounded-xl bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-[12px] space-y-2">
                  <div className="flex items-center justify-between text-[#d0c5af] text-[11px] pb-2 border-b border-[#2a2a2d]">
                    <span className="flex items-center gap-2 text-[#f2ca50]">
                      <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse" />
                      TARGET C RUNTIME SPECIFICATION — LOG FORMAT MODEL (DEMO)
                    </span>
                    <span className="text-[#d0c5af]">ENGINE TARGET: OpenSSL 3.x / C Core (Not Connected)</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[#d0c5af] hover:text-[#e4e1e6] transition-colors">
                      <span className="text-[#f2ca50]">[SPEC-INIT]</span> OpenSSL EVP SHA-256 context initialization model (EVP_MD_CTX)... Ready.
                    </div>
                    <div className="text-[#d0c5af] hover:text-[#e4e1e6] transition-colors">
                      <span className="text-[#f2ca50]">[SPEC-INGEST]</span> Ingestion interface: receives document buffer, computes deterministic SHA-256 digest.
                    </div>
                    <div className="text-[#e1c384] hover:text-[#ffe088] transition-colors">
                      <span className="text-[#f2ca50]">[SPEC-HASH]</span> Deterministic digest schema: 5f94b128c7c91a382109e46a782b54432194ff0399d8e.
                    </div>
                    <div className="text-[#e4e1e6] hover:text-[#f2ca50] transition-colors">
                      <span className="text-[#f2ca50]">[SPEC-LEDGER]</span> Append-only node chaining format: current block stores pointer to previous hash.
                    </div>
                    <div className="text-[#acdaa6] font-semibold hover:brightness-125 transition-all">
                      <span className="text-[#f2ca50]">[SPEC-VERIFY]</span> Hash comparison model: evaluates incoming document digest against registered baseline.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FINAL CALL TO ACTION */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
              <div className="p-10 lg:p-16 rounded-3xl bg-gradient-to-b from-[#1f1f22] to-[#1b1b1e] border border-[#4d4635]/40 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#f2ca50]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="w-16 h-16 rounded-2xl bg-[#2a2a2d] border border-[#4d4635]/30 flex items-center justify-center text-[#f2ca50] mb-6 shadow-md relative z-10 transition-transform duration-500 hover:scale-110">
                  <span className="material-symbols-outlined text-[36px]">verified_user</span>
                </div>
                <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] max-w-2xl mb-4 relative z-10">
                  Secure Your Knowledge Base.
                </h2>
                <p className="font-body-lg text-base text-[#d0c5af] max-w-xl mb-8 relative z-10">
                  Verify document integrity and maintain a traceable record of changes with RAGSHIELD.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                  <button
                    type="button"
                    onClick={onLaunchWorkspace}
                    className="lux-btn px-8 py-4 rounded-lg bg-gradient-to-r from-[#f2ca50] via-[#d4af37] to-[#e1c384] text-[#3c2f00] font-semibold text-sm shadow-xl shadow-[#f2ca50]/20 hover:shadow-[#f2ca50]/40 transition-all cursor-pointer"
                  >
                    Launch Workspace →
                  </button>
                  <a
                    href="#architecture"
                    className="lux-btn px-8 py-4 rounded-lg bg-[#2a2a2d] border border-[#4d4635]/40 text-[#e4e1e6] font-semibold text-sm hover:bg-[#39393c] transition-all cursor-pointer"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0e0e11] border-t border-[#2a2a2d]/40 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="font-serifBrand text-xl font-bold text-[#f2ca50]">
                RAGSHIELD<span className="text-[#e1c384]">.</span>
              </span>
              <span className="font-body-sm text-xs text-[#d0c5af] max-w-sm">
                Trust the Source. Verify the Knowledge.
              </span>
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <a href="#home" className="text-xs text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow">Home</a>
              <a href="#features" className="text-xs text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow">Features</a>
              <a href="#how-it-works" className="text-xs text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow">How It Works</a>
              <a href="#architecture" className="text-xs text-[#d0c5af] hover:text-[#e4e1e6] transition-colors nav-link-glow">Architecture</a>
            </div>
          </div>
          <div className="pt-4 border-t border-[#2a2a2d]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            <span className="font-mono text-[11px] text-[#d0c5af]/70">
              © 2025 RAGSHIELD. TRUST THE SOURCE. VERIFY THE KNOWLEDGE.
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#acdaa6] animate-pulse" />
              <span className="font-mono text-[11px] text-[#acdaa6]">
                SHA-256 / C LINKED LEDGER
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
