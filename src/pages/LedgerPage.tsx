import React, { useEffect, useRef, useState } from 'react';
import type { ScreenType } from '../types';
import { INITIAL_LEDGER_BLOCKS } from '../data/mockData';

interface LedgerPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LedgerPage: React.FC<LedgerPageProps> = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<number>(42107);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Canvas-based Ambient Floating Cryptographic Hash Particles & Luminous Bubbles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth - (window.innerWidth >= 1024 ? 288 : 0));
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth - (window.innerWidth >= 1024 ? 288 : 0);
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const fragments = [
      '0x7ffd',
      'SHA-256',
      'e3b0c4',
      'prev_hash',
      '1f8e2a',
      '0xFD4',
      '0101',
      'b4c5d6',
      'malloc',
      '0x9b2d',
      'evp_md',
      '0x4d91',
      'node->prev',
    ];

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.3 + Math.random() * 0.6),
      size: Math.random() * 2.5 + 1.2,
      text: fragments[Math.floor(Math.random() * fragments.length)],
      opacity: Math.random() * 0.45 + 0.15,
      isBubble: Math.random() > 0.45,
      bubbleRadius: Math.random() * 18 + 8,
      colorHue: Math.random() > 0.4 ? 45 : 36, // warm gold & champagne
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.isBubble) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.bubbleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.colorHue}, 80%, 65%, ${p.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.bubbleRadius);
          grad.addColorStop(0, `hsla(${p.colorHue}, 80%, 70%, ${p.opacity * 0.08})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `hsla(${p.colorHue}, 85%, 75%, ${p.opacity * 0.75})`;
          ctx.fillText(p.text, p.x - p.text.length * 2.8, p.y + 3);
          ctx.restore();
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.colorHue}, 90%, 65%, ${p.opacity})`;
          ctx.shadowColor = `hsl(${p.colorHue}, 90%, 60%)`;
          ctx.shadowBlur = 8;
          ctx.fill();

          if (Math.random() > 0.85) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = `hsla(${p.colorHue}, 80%, 75%, ${p.opacity * 0.6})`;
            ctx.fillText(p.text, p.x + 6, p.y + 3);
          }
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const selectedBlock =
    INITIAL_LEDGER_BLOCKS.find((b) => b.index === selectedBlockId) || INITIAL_LEDGER_BLOCKS[1];

  const handleRunAudit = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      showToast('Sequential pointer audit completed: 42,109 / 42,109 nodes verified 100% sound!');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      {/* Canvas Layer: Ambient Floating Cryptographic Hash Particles & Luminous Bubbles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 pl-72"
        id="ambientCryptoCanvas"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#2a2a2d] shadow-2xl flex items-center gap-3 text-[#e4e1e6] font-mono text-xs border border-[#f2ca50]/50 transition-all">
          <span className="material-symbols-outlined text-[#acdaa6] text-[20px]">
            verified
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="relative px-6 lg:px-8 py-8 flex flex-col gap-8 max-w-7xl mx-auto w-full z-10">
        {/* Dynamic Ambient Backing Glow */}
        <div className="absolute -top-12 left-1/3 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#e1c384]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* 1. Header & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2a2a2d] text-[#f2ca50] font-mono text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-[#f2ca50]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-ping" />
                CRYPTOGRAPHIC AUDIT LEDGER
              </span>
              <span className="font-mono text-xs text-[#99907c]">
                • Singly Linked-List Data Structure (C Backend)
              </span>
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] tracking-tight">
              Hash-Linked Audit Ledger
            </h1>
            <p className="font-body-md text-sm text-[#d0c5af] leading-relaxed">
              Chronological pointer-based hash chain tracking document registration and verification
              events. Local high-assurance audit ledger computed via OpenSSL SHA-256.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleRunAudit}
              className="px-4 py-2 rounded-lg bg-[#2a2a2d] hover:bg-[#39393c] text-[#e1c384] font-mono text-xs transition-all flex items-center gap-2 shadow-md border border-[#4d4635]/30 hover:border-[#f2ca50]/40 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">link</span>
              <span>{isValidating ? 'Validating...' : 'Validate Ledger'}</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Audit trail exported as SHA-256 authenticated log')}
              className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] font-semibold text-xs shadow-lg shadow-[#d4af37]/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export Audit Trail</span>
            </button>
          </div>
        </div>

        {/* 2. Metrics Overview (4 Key Metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#1b1b1e] backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden group border border-[#4d4635]/30 anim-float-1">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="font-mono text-[10px] uppercase tracking-wider">
                TOTAL LEDGER ENTRIES
              </span>
              <span className="material-symbols-outlined text-[20px] text-[#f2ca50] group-hover:rotate-12 transition-transform">
                receipt_long
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline-md text-2xl text-[#e4e1e6] font-semibold tracking-tight">
                42,109
              </span>
              <span className="font-mono text-xs text-[#acdaa6] font-medium">+28 today</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
              <span className="font-mono text-[11px] text-[#d0c5af] truncate">
                Sequential blocks chained
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1b1b1e] backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden group border border-[#4d4635]/30 anim-float-2">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="font-mono text-[10px] uppercase tracking-wider">
                CHAIN VALIDATION STATUS
              </span>
              <span className="material-symbols-outlined text-[20px] text-[#acdaa6] group-hover:scale-110 transition-transform">
                verified
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline-md text-2xl text-[#acdaa6] font-semibold tracking-tight">
                VALID
              </span>
              <span className="font-mono text-[10px] text-[#99907c] uppercase">100% Consistent</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-full bg-[#353438] rounded-full h-1 overflow-hidden">
                <div className="bg-[#acdaa6] h-full rounded-full w-full shadow-[0_0_8px_#acdaa6]" />
              </div>
              <span className="font-mono text-[10px] text-[#acdaa6]">PASS</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1b1b1e] backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden group border border-[#4d4635]/30 anim-float-3">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="font-mono text-[10px] uppercase tracking-wider">
                LATEST BLOCK INDEX
              </span>
              <span className="material-symbols-outlined text-[20px] text-[#e1c384] group-hover:scale-110 transition-transform">
                tag
              </span>
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-headline-md text-2xl text-[#e4e1e6] font-semibold tracking-tight">
                #42,109
              </span>
              <span className="font-mono text-xs text-[#e1c384]">Current Head Node</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[#d0c5af] font-mono text-[10px]">
              <span>Memory pointer</span>
              <span className="text-[#acdaa6]">0x7ffd...c090</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1b1b1e] backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden group border border-[#4d4635]/30 anim-float-1">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="font-mono text-[10px] uppercase tracking-wider">
                LATEST BLOCK HASH
              </span>
              <span className="material-symbols-outlined text-[20px] text-[#f2ca50] group-hover:scale-110 transition-transform">
                fingerprint
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-headline-md text-2xl text-[#f2ca50] font-semibold tracking-tight font-mono">
                e3b0c442...
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#d0c5af]">Digest Algorithm</span>
              <span className="text-[#e1c384] font-medium">OpenSSL SHA-256</span>
            </div>
          </div>
        </div>

        {/* 3. Search & Filter Toolbar */}
        <div className="p-3 rounded-xl bg-[#1b1b1e] backdrop-blur-md shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-[#4d4635]/30">
          <div className="flex-1 flex items-center gap-2 bg-[#0e0e11] px-3.5 py-2 rounded-lg border border-[#4d4635]/30 focus-within:border-[#f2ca50]/50 transition-colors">
            <span className="material-symbols-outlined text-[#99907c] text-[20px]">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[#e4e1e6] placeholder:text-[#99907c] font-mono text-xs outline-none"
              placeholder="Filter by Block ID (#42107) or Document Name..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'ALL BLOCKS (42,109)' },
              { id: 'registration', label: 'REGISTRATION EVENTS' },
              { id: 'verification', label: 'VERIFICATION CHECKS' },
              { id: 'modified', label: 'FLAGGED MODIFICATIONS (3)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  filter === f.id
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-sm'
                    : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Sequential Hash-Linked Pipeline Visualizer */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">linear_scale</span>
              <span className="font-headline-sm text-base text-[#e4e1e6] font-semibold">
                Sequential Pointer Hash Chain
              </span>
              <span className="font-mono text-xs text-[#e1c384] px-2 py-0.5 rounded bg-[#2a2a2d] border border-[#4d4635]/30">
                struct ledger_node *prev
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#d0c5af] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse shadow-[0_0_6px_#f2ca50]" />
              <span>AUTOSCROLL LOCKED (HEAD #42,109)</span>
            </div>
          </div>

          {/* Interactive Horizontal Chain Visualizer */}
          <div className="relative w-full rounded-2xl bg-[#0e0e11] p-6 overflow-x-auto shadow-2xl flex items-center justify-between min-h-[300px] border border-[#4d4635]/40">
            <div className="flex items-center gap-4 relative z-10 mx-auto min-w-[1080px] justify-between px-4 py-2">
              {/* Block 42,106 */}
              <div
                onClick={() => setSelectedBlockId(42106)}
                className={`cursor-pointer transform hover:-translate-y-2 transition-all duration-300 w-60 rounded-xl bg-[#1b1b1e] shadow-xl p-4 flex flex-col gap-1.5 relative group border ${
                  selectedBlockId === 42106
                    ? 'border-[#f2ca50] anim-active-glow'
                    : 'border-[#4d4635]/30 hover:border-[#99907c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#99907c]">BLOCK</span>
                  <span className="text-sm text-[#e4e1e6] font-bold">#42,106</span>
                </div>
                <div className="py-1 px-2 rounded bg-[#1f1f22] text-[#acdaa6] font-mono text-[10px] uppercase flex items-center gap-1 border border-[#acdaa6]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] animate-pulse" />
                  REGISTRATION
                </div>
                <div className="font-mono text-xs text-[#e4e1e6] font-medium truncate mt-1">
                  security_policy_v2.pdf
                </div>
                <div className="mt-2 pt-2 bg-[#0e0e11] rounded p-1.5 flex flex-col gap-1 font-mono text-[10px] border border-[#4d4635]/20">
                  <span className="text-[#f2ca50] truncate">H: 9b2d14f2...102e</span>
                  <span className="text-[#99907c] truncate">P: 4f12ac08...8811</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-[#99907c] font-mono">
                  <span>malloc 128B</span>
                  <span>13:58:04 UTC</span>
                </div>
              </div>

              {/* Pointer Connector 1 */}
              <div className="flex flex-col items-center justify-center font-mono text-[9px] text-[#e1c384] relative px-2 py-1">
                <span className="text-[#99907c] text-[10px] font-mono">prev_hash</span>
                <div className="relative w-16 h-6 flex items-center justify-center my-0.5">
                  <svg className="w-full h-4 overflow-visible" viewBox="0 0 64 16">
                    <path d="M 0 8 L 56 8" fill="none" stroke="#4d4635" strokeWidth="2" />
                    <path className="flowing-dash-line stroke-primary" d="M 0 8 L 56 8" fill="none" strokeWidth="2" />
                    <path d="M 52 4 L 60 8 L 52 12" fill="none" stroke="#f2ca50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[8px] text-[#acdaa6] font-bold tracking-wider">MATCHED</span>
              </div>

              {/* Block 42,107 */}
              <div
                onClick={() => setSelectedBlockId(42107)}
                className={`cursor-pointer transition-all duration-300 w-64 rounded-xl bg-[#2a2a2d] shadow-2xl p-4 flex flex-col gap-1.5 relative border ${
                  selectedBlockId === 42107
                    ? 'border-[#f2ca50] anim-active-glow -translate-y-2'
                    : 'border-[#4d4635]/40 hover:border-[#f2ca50]/50'
                }`}
              >
                {selectedBlockId === 42107 && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] font-mono text-[10px] font-bold tracking-widest shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3c2f00] animate-ping" />
                    INSPECTING
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#e1c384]">INSPECTED BLOCK</span>
                  <span className="text-base text-[#f2ca50] font-bold">#42,107</span>
                </div>
                <div className="py-1 px-2 rounded bg-[#1f1f22] text-[#e1c384] font-mono text-[10px] uppercase flex items-center gap-1 font-semibold border border-[#e1c384]/30">
                  <span className="w-2 h-2 rounded-full bg-[#e1c384] animate-pulse" />
                  REGISTRATION
                </div>
                <div className="font-mono text-xs text-[#e4e1e6] font-semibold truncate mt-1">
                  customer_support_kb_v9.json
                </div>
                <div className="mt-2 pt-2 bg-[#0e0e11] rounded p-2 flex flex-col gap-1 font-mono text-[11px] border border-[#4d4635]/40">
                  <span className="text-[#f2ca50] truncate">H: 1f8e2a3b...0e1f</span>
                  <span className="text-[#e1c384] truncate">P: 9b2d14f2...102e</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[#d0c5af] font-mono text-[10px]">
                  <span className="text-[#acdaa6] font-bold flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6]" />
                    POINTER OK
                  </span>
                  <span>14:02:19 UTC</span>
                </div>
              </div>

              {/* Pointer Connector 2 */}
              <div className="flex flex-col items-center justify-center font-mono text-[9px] text-[#e1c384] relative px-2 py-1">
                <span className="text-[#99907c] text-[10px] font-mono">prev_hash</span>
                <div className="relative w-16 h-6 flex items-center justify-center my-0.5">
                  <svg className="w-full h-4 overflow-visible" viewBox="0 0 64 16">
                    <path d="M 0 8 L 56 8" fill="none" stroke="#4d4635" strokeWidth="2" />
                    <path className="flowing-dash-line stroke-primary" d="M 0 8 L 56 8" fill="none" strokeWidth="2" />
                    <path d="M 52 4 L 60 8 L 52 12" fill="none" stroke="#f2ca50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[8px] text-[#acdaa6] font-bold tracking-wider">MATCHED</span>
              </div>

              {/* Block 42,108 (Alert Modification) */}
              <div
                onClick={() => setSelectedBlockId(42108)}
                className={`cursor-pointer transform hover:-translate-y-2 transition-all duration-300 w-60 rounded-xl bg-[#1b1b1e] shadow-xl p-4 flex flex-col gap-1.5 relative border ${
                  selectedBlockId === 42108
                    ? 'border-[#ffb4ab] anim-alert-pulse -translate-y-2'
                    : 'border-[#ffb4ab]/40 hover:border-[#ffb4ab]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#99907c]">BLOCK</span>
                  <span className="text-sm text-[#e4e1e6] font-bold">#42,108</span>
                </div>
                <div className="py-1 px-2 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] uppercase flex items-center gap-1 border border-[#ffb4ab]/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping" />
                  MODIFICATION ALERT
                </div>
                <div className="font-mono text-xs text-[#ffb4ab] font-medium truncate mt-1">
                  kb_article_7029.md
                </div>
                <div className="mt-2 pt-2 bg-[#0e0e11] rounded p-1.5 flex flex-col gap-1 font-mono text-[10px] border border-[#4d4635]/20">
                  <span className="text-[#ffb4ab] truncate">H: 7c4e5a2d...338c</span>
                  <span className="text-[#e1c384] truncate">P: 1f8e2a3b...0e1f</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-[#99907c] font-mono">
                  <span>DIFF: +3 lines</span>
                  <span>14:15:33 UTC</span>
                </div>
              </div>

              {/* Pointer Connector 3 */}
              <div className="flex flex-col items-center justify-center font-mono text-[9px] text-[#f2ca50] relative px-2 py-1">
                <span className="text-[#99907c] text-[10px] font-mono">prev_hash</span>
                <div className="relative w-16 h-6 flex items-center justify-center my-0.5">
                  <svg className="w-full h-4 overflow-visible" viewBox="0 0 64 16">
                    <path d="M 0 8 L 56 8" fill="none" stroke="#4d4635" strokeWidth="2" />
                    <path className="flowing-dash-line stroke-primary" d="M 0 8 L 56 8" fill="none" strokeWidth="2" />
                    <path d="M 52 4 L 60 8 L 52 12" fill="none" stroke="#f2ca50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <span className="font-bold text-[9px] text-[#f2ca50] tracking-wider flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#f2ca50] animate-ping" />
                  CHAIN HEAD
                </span>
              </div>

              {/* Block 42,109 (Head) */}
              <div
                onClick={() => setSelectedBlockId(42109)}
                className={`cursor-pointer transform hover:-translate-y-2 transition-all duration-300 w-60 rounded-xl bg-[#1b1b1e] shadow-xl p-4 flex flex-col gap-1.5 relative border ${
                  selectedBlockId === 42109
                    ? 'border-[#f2ca50] anim-active-glow -translate-y-2'
                    : 'border-[#4d4635]/30 hover:border-[#f2ca50]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse" />
                    <span className="font-mono text-xs text-[#99907c]">HEAD NODE</span>
                  </div>
                  <span className="text-sm text-[#e4e1e6] font-bold">#42,109</span>
                </div>
                <div className="py-1 px-2 rounded bg-[#1f1f22] text-[#f2ca50] font-mono text-[10px] uppercase flex items-center gap-1 border border-[#f2ca50]/20 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
                  VERIFICATION
                </div>
                <div className="font-mono text-xs text-[#e4e1e6] font-medium truncate mt-1">
                  finance_terms_2026.docx
                </div>
                <div className="mt-2 pt-2 bg-[#0e0e11] rounded p-1.5 flex flex-col gap-1 font-mono text-[10px] border border-[#4d4635]/20">
                  <span className="text-[#f2ca50] truncate">H: e3b0c442...98fc</span>
                  <span className="text-[#e1c384] truncate">P: 7c4e5a2d...338c</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-[#99907c] font-mono">
                  <span>SEALED</span>
                  <span>14:28:44 UTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Panels: Left (Inspection) & Right (Validation Engine) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Block Inspection (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#1b1b1e] shadow-xl flex flex-col gap-4 border border-[#4d4635]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 bg-[#0e0e11]/50 p-3.5 rounded-xl border border-[#4d4635]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 flex items-center justify-center text-[#f2ca50] border border-[#d4af37]/30 shadow-inner">
                  <span className="material-symbols-outlined text-[24px]">data_object</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-base text-[#e4e1e6] font-semibold">
                      {selectedBlock.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                        selectedBlock.badgeType === 'verified'
                          ? 'bg-[#acdaa6] text-[#103813]'
                          : selectedBlock.badgeType === 'modified'
                          ? 'bg-[#93000a] text-[#ffdad6]'
                          : 'bg-[#d4af37] text-[#3c2f00]'
                      }`}
                    >
                      {selectedBlock.badge}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#99907c]">
                    Target File: {selectedBlock.file}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#e1c384]">
                Index: {selectedBlock.index.toLocaleString()} of 42,109
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1 border border-[#4d4635]/20">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">DOCUMENT IDENTIFIER</span>
                <div className="flex items-center gap-1.5 text-[#f2ca50] font-mono text-xs truncate">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  <span className="truncate">{selectedBlock.docId}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1 border border-[#4d4635]/20">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">FILE SIZE</span>
                <div className="flex items-center gap-1.5 text-[#e4e1e6] font-mono text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e1c384]">storage</span>
                  <span>{selectedBlock.size}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1 border border-[#4d4635]/20">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">EVENT / INGESTION TYPE</span>
                <div className="flex items-center gap-1.5 text-[#e4e1e6] font-mono text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e1c384]">memory</span>
                  <span>{selectedBlock.event}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1 border border-[#4d4635]/20">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">COMMIT TIMESTAMP</span>
                <div className="flex items-center gap-1.5 text-[#e4e1e6] font-mono text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#e1c384]">schedule</span>
                  <span>{selectedBlock.time}</span>
                </div>
              </div>

              {/* Current Block SHA-256 */}
              <div className="md:col-span-2 p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1.5 border border-[#4d4635]/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#99907c] uppercase">
                    CURRENT BLOCK SHA-256
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedBlock.currHash);
                      showToast('Current block SHA-256 copied to clipboard!');
                    }}
                    className="text-[#e1c384] hover:text-[#f2ca50] transition-colors flex items-center gap-1 font-mono text-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy Hash</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-[#0e0e11] font-mono text-xs text-[#f2ca50] break-all select-all border border-[#4d4635]/30">
                  {selectedBlock.currHash}
                </div>
              </div>

              {/* Previous Block Pointer */}
              <div className="md:col-span-2 p-3.5 rounded-lg bg-[#1f1f22] flex flex-col gap-1.5 border border-[#4d4635]/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#99907c] uppercase">
                    PREVIOUS BLOCK POINTER (prev_hash)
                  </span>
                  <span className="font-mono text-xs text-[#acdaa6]">
                    {selectedBlock.prevStatus}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#0e0e11] font-mono text-xs text-[#e1c384] break-all select-all border border-[#4d4635]/30">
                  {selectedBlock.prevHash}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#d0c5af] mt-1">
                  <span className="material-symbols-outlined text-[14px] text-[#acdaa6]">
                    check_circle
                  </span>
                  <span>
                    Pointer Continuity Status: Verified 32-byte cryptographic reference to predecessor node
                  </span>
                </div>
              </div>
            </div>

            {/* Document Event Log in this Block */}
            {selectedBlock.events && selectedBlock.events.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-sm text-[#e4e1e6] font-semibold">
                    Ledger Entry Chronological Audit Log ({selectedBlock.events.length})
                  </span>
                  <span className="font-mono text-xs text-[#99907c]">Trace: node-&gt;events</span>
                </div>
                <div className="flex flex-col gap-2">
                  {selectedBlock.events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] transition-colors flex items-center justify-between gap-3 border border-[#4d4635]/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
                          <span className="material-symbols-outlined text-[16px]">{evt.icon}</span>
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-xs text-[#e4e1e6] font-semibold truncate">
                            {evt.title}
                          </span>
                          <span className="font-mono text-[11px] text-[#99907c] truncate">
                            {evt.detail}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded bg-[#2a2a2d] whitespace-nowrap ${evt.statusColor}`}
                      >
                        {evt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Validation Engine & C Architecture Spec (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Sequential Pointer Validation */}
            <div className="p-6 rounded-2xl bg-[#1b1b1e] shadow-xl flex flex-col gap-4 border border-[#4d4635]/30">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold text-[#f2ca50] uppercase tracking-wider">
                  VALIDATION ENGINE
                </span>
                <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">
                  account_tree
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-headline-sm text-base text-[#e4e1e6] font-semibold">
                  Sequential Pointer Validation
                </h2>
                <p className="font-body-md text-xs text-[#d0c5af] leading-snug">
                  Traverse singly linked list nodes from Head to Genesis, verifying
                  node[i]-&gt;prev_hash matches node[i-1]-&gt;curr_hash.
                </p>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-xl bg-[#0e0e11] flex flex-col gap-3 border border-[#4d4635]/30">
                <div className="w-full p-2.5 rounded-lg bg-[#1f1f22] flex items-center justify-between text-[#acdaa6] font-mono text-xs border border-[#4d4635]/20">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#acdaa6]">
                      verified
                    </span>
                    <span className="font-bold">CHAIN VALID</span>
                  </div>
                  <span className="text-[11px] text-[#acdaa6]">42,109 Nodes Continuous</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-[#1f1f22] flex flex-col border border-[#4d4635]/20">
                    <span className="text-[#99907c]">Pointer Consistency</span>
                    <span className="text-[#acdaa6] font-bold text-xs">100% MATCH</span>
                  </div>
                  <div className="p-2 rounded bg-[#1f1f22] flex flex-col border border-[#4d4635]/20">
                    <span className="text-[#99907c]">Broken Pointers</span>
                    <span className="text-[#acdaa6] font-bold text-xs">0 Detected</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#99907c]">
                  <span>Last Scan: 12 seconds ago</span>
                  <span>Full Traversal</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunAudit}
                className="w-full py-2.5 rounded-lg bg-[#2a2a2d] hover:bg-[#39393c] text-[#f2ca50] font-mono text-xs transition-all flex items-center justify-center gap-2 shadow-md border border-[#f2ca50]/30 hover:border-[#f2ca50] active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>{isValidating ? 'Traversing Chain...' : 'Run Sequential Pointer Audit'}</span>
              </button>
            </div>

            {/* C Architecture Specification */}
            <div className="p-5 rounded-2xl bg-[#1b1b1e] shadow-xl flex flex-col gap-2 border border-[#4d4635]/30">
              <div className="flex items-center justify-between text-[#99907c]">
                <span className="font-mono text-[10px] uppercase font-semibold">
                  C ARCHITECTURE SPECIFICATION
                </span>
                <span className="font-mono text-[10px] text-[#e1c384]">ledger_node.h</span>
              </div>
              <p className="font-body-sm text-xs text-[#d0c5af]">
                Singly linked-list node definition with OpenSSL 32-byte digests and reverse pointer:
              </p>
              <div className="mt-1 p-3 rounded bg-[#0e0e11] font-mono text-[11px] text-[#e1c384] leading-relaxed overflow-x-auto select-all border border-[#4d4635]/30">
                <pre>{`typedef struct ledger_node {
    uint32_t index;
    uint8_t  curr_hash[32];
    uint8_t  prev_hash[32];
    char     doc_id[64];
    uint64_t timestamp;
    struct ledger_node *prev;
} ledger_node_t;`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
