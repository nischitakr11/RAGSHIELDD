import React, { useState } from 'react';
import type { DocumentItem, ScreenType } from '../types';

interface DashboardPageProps {
  documents: DocumentItem[];
  onNavigate: (screen: ScreenType) => void;
  onSelectDoc?: (doc: DocumentItem) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  documents,
  onNavigate,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 gap-8 relative">
      {/* Toast Notification */}
      {copiedHash && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-[#2a2a2d] shadow-2xl flex items-center gap-2.5 text-[#e4e1e6] font-mono text-xs border border-[#f2ca50]/40 transition-all">
          <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">
            content_copy
          </span>
          <span>SHA-256 Fingerprint copied to clipboard</span>
        </div>
      )}

      {/* Subtle ambient radial warm glow */}
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#e1c384]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Contextual Identity & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-[11px] font-semibold text-[#e1c384] tracking-widest uppercase">
              Cryptographic Integrity System
            </span>
            <span className="text-[#99907c] text-sm">•</span>
            <span className="font-mono text-xs text-[#d0c5af]">DEMO ENVIRONMENT</span>
            <span className="text-[#99907c] text-sm">•</span>
            <span className="font-mono text-xs text-[#acdaa6]">Seeded Sample Dataset</span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] tracking-tight">
            Workspace Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('verification')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2d] text-[#e1c384] hover:text-[#e4e1e6] hover:bg-[#39393c] transition-all shadow-sm border border-[#4d4635]/30 hover:border-[#e1c384]/50 cursor-pointer text-xs font-mono"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Run Verification</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('documents')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4af37] text-[#3c2f00] font-semibold hover:brightness-110 shadow-[0_0_24px_rgba(212,175,55,0.25)] hover:shadow-[0_0_32px_rgba(212,175,55,0.45)] transition-all cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Register Document</span>
          </button>
        </div>
      </div>

      {/* 1. Executive Metrics Bar (4 Obsidian Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="stat-card-motion relative overflow-hidden rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-5 shadow-xl flex flex-col justify-between border border-[#4d4635]/20 hover:border-[#f2ca50]/40 group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-[#99907c] uppercase tracking-wider">
                Total Registered Documents
              </span>
              <span className="font-headline-md text-2xl sm:text-3xl text-[#e4e1e6] font-semibold">
                14,892
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#353438]/80 text-[#e1c384] transition-colors group-hover:bg-[#d4af37]/20 group-hover:text-[#f2ca50]">
              <span className="material-symbols-outlined text-[20px]">folder_data</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#acdaa6] text-[16px]">
                trending_up
              </span>
              <span className="font-mono text-xs text-[#acdaa6] font-semibold">+128</span>
              <span className="text-xs text-[#d0c5af]">this week</span>
            </div>
            <svg className="w-20 h-6 text-[#f2ca50] overflow-visible" fill="none" viewBox="0 0 80 24">
              <path
                className="sparkline-animated"
                d="M0 18 Q 15 14, 30 16 T 55 8 T 80 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <path
                d="M0 18 Q 15 14, 30 16 T 55 8 T 80 4 L 80 24 L 0 24 Z"
                fill="currentColor"
                fillOpacity="0.08"
              />
            </svg>
          </div>
          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-[#99907c]">Seeded sample documents</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="stat-card-motion relative overflow-hidden rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-5 shadow-xl flex flex-col justify-between border border-[#4d4635]/20 hover:border-[#acdaa6]/40 group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-[#99907c] uppercase tracking-wider">
                Verified Documents
              </span>
              <span className="font-headline-md text-2xl sm:text-3xl text-[#e4e1e6] font-semibold">
                14,845
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#353438]/80 text-[#acdaa6] transition-colors group-hover:bg-[#91be8c]/30">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2a2a2d] border border-[#4d4635]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
              <span className="font-mono text-[10px] text-[#acdaa6] font-semibold uppercase">
                DEMO PASS RATE
              </span>
            </div>
            <span className="font-mono text-xs text-[#acdaa6] font-semibold">99.7%</span>
          </div>
          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-[#99907c]">Demo baseline match</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="stat-card-motion relative overflow-hidden rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-5 shadow-xl flex flex-col justify-between border border-[#ffb4ab]/20 hover:border-[#ffb4ab]/50 group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-[#99907c] uppercase tracking-wider">
                Modified Documents
              </span>
              <span className="font-headline-md text-2xl sm:text-3xl text-[#ffb4ab] font-semibold">
                3
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#93000a] text-[#ffdad6] shadow-[0_0_12px_rgba(255,180,171,0.2)]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#93000a]/60 border border-[#ffb4ab]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] beacon-red-pulse" />
              <span className="font-mono text-[10px] text-[#ffb4ab] font-semibold uppercase">
                SAMPLE DIVERGENCE (DEMO)
              </span>
            </div>
            <span className="font-mono text-xs text-[#ffb4ab]">Flagged for review</span>
          </div>
          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-[#99907c]">Sample divergence flagged</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="stat-card-motion relative overflow-hidden rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-5 shadow-xl flex flex-col justify-between border border-[#4d4635]/20 hover:border-[#e1c384]/40 group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-[#99907c] uppercase tracking-wider">
                Total Ledger Entries
              </span>
              <span className="font-headline-md text-2xl sm:text-3xl text-[#e4e1e6] font-semibold">
                42,109
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#353438]/80 text-[#e1c384] transition-colors group-hover:bg-[#d4af37]/20">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#e1c384] text-[16px]">
                sync_saved_locally
              </span>
              <span className="font-mono text-xs text-[#e1c384]">Synchronized (Demo)</span>
            </div>
            <span className="font-mono text-[11px] text-[#d0c5af]">Chain Intact</span>
          </div>
          <div className="mt-2 text-right">
            <span className="font-mono text-[10px] text-[#99907c]">Seeded sample ledger blocks</span>
          </div>
        </div>
      </div>

      {/* 2. Two-Column Analytical Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          {/* Ledger Integrity Status Card */}
          <div className="rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-6 shadow-xl flex flex-col gap-4 border border-[#4d4635]/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">
                    verified_user
                  </span>
                  <h2 className="font-headline-sm text-lg text-[#e4e1e6] font-semibold">
                    Ledger Integrity Status (Demo Specification)
                  </h2>
                </div>
                <p className="font-body-sm text-xs text-[#d0c5af]">
                  Cryptographic SHA-256 chain continuity and hash-linked audit verification model
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a2a2d] border border-[#4d4635]/30 beacon-green-breathe">
                <span className="w-2 h-2 rounded-full bg-[#acdaa6]" />
                <span className="font-mono text-[11px] text-[#acdaa6] font-semibold uppercase tracking-wider">
                  DEMO STATE: SPECIFICATION SOUND
                </span>
              </div>
            </div>

            {/* Metrics Subgrid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-[#0e0e11] flex flex-col gap-0.5 border border-[#4d4635]/15">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">Chain Continuity</span>
                <span className="text-base font-semibold text-[#f2ca50]">0 Divergence</span>
                <span className="font-mono text-[10px] text-[#acdaa6]">Genesis to Block #42,109</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0e0e11] flex flex-col gap-0.5 border border-[#4d4635]/15">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">Hash Verification</span>
                <span className="text-base font-semibold text-[#e4e1e6]">SHA-256</span>
                <span className="font-mono text-[10px] text-[#99907c]">Zero missing parent hashes</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0e0e11] flex flex-col gap-0.5 border border-[#4d4635]/15">
                <span className="font-mono text-[10px] text-[#99907c] uppercase">Audit Model</span>
                <span className="text-base font-semibold text-[#e1c384]">Sample Chain</span>
                <span className="font-mono text-[10px] text-[#99907c]">42,109 blocks modeled</span>
              </div>
            </div>

            {/* Recent Chain Blocks Row */}
            <div className="p-3 rounded-lg bg-[#0e0e11] flex flex-col gap-2 border border-[#4d4635]/20">
              <div className="flex items-center justify-between text-[#99907c] font-mono text-[11px] uppercase">
                <span>Recent Chain Blocks</span>
                <button
                  type="button"
                  onClick={() => onNavigate('ledger')}
                  className="text-[#e1c384] hover:text-[#f2ca50] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e1c384] beacon-gold-pulse" />
                  <span>Inspect Chain →</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '#42,109', prev: 'c91a...4801', count: '12 docs', isHead: true },
                  { id: '#42,108', prev: 'b83f...772d', count: '18 docs', isHead: false },
                  { id: '#42,107', prev: 'a19d...e32c', count: '8 docs', isHead: false },
                  { id: '#42,106', prev: '7f02...11a9', count: '24 docs', isHead: false },
                ].map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onNavigate('ledger')}
                    className="p-2.5 rounded bg-[#1f1f22] flex flex-col gap-1 border border-[#4d4635]/30 hover:border-[#f2ca50]/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[11px] font-semibold ${b.isHead ? 'text-[#f2ca50]' : 'text-[#e1c384]'}`}>
                        {b.id}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
                    </div>
                    <span className="font-mono text-[10px] text-[#d0c5af] truncate">prev: {b.prev}</span>
                    <span className="text-[10px] text-[#99907c]">{b.count} sealed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Document Registrations Table */}
          <div className="rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-6 shadow-xl flex flex-col gap-4 border border-[#4d4635]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e1c384] text-[20px]">
                  folder_shared
                </span>
                <h2 className="font-headline-sm text-lg text-[#e4e1e6] font-semibold">
                  Recent Document Registrations
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('documents')}
                className="font-mono text-[11px] text-[#e1c384] hover:text-[#f2ca50] transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer group"
              >
                <span>View All Documents</span>
                <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2a2a2d]/60 text-[#99907c] font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3 rounded-l-lg">Document Name</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Registered</th>
                    <th className="py-2.5 px-3">SHA-256 Fingerprint</th>
                    <th className="py-2.5 px-3 rounded-r-lg text-right">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2d]/20 text-xs">
                  {documents.slice(0, 5).map((doc) => (
                    <tr
                      key={doc.id}
                      className={`hover:bg-[#2a2a2d]/40 transition-colors cursor-pointer group ${
                        doc.status === 'MODIFIED' ? 'bg-[#93000a]/10' : ''
                      }`}
                      onClick={() => onNavigate('documents')}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[18px] ${
                            doc.status === 'MODIFIED' ? 'text-[#ffb4ab]' : 'text-[#e1c384]'
                          }`}>
                            {doc.status === 'MODIFIED' ? 'warning' : 'description'}
                          </span>
                          <span className={`font-mono font-medium ${
                            doc.status === 'MODIFIED' ? 'text-[#ffb4ab]' : 'text-[#e4e1e6] group-hover:text-[#f2ca50]'
                          }`}>
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[#99907c] uppercase">
                        {doc.mimeType.includes('pdf') ? 'PDF' : doc.mimeType.includes('json') ? 'JSON' : 'DOC'}
                      </td>
                      <td className="py-3 px-3 font-mono text-[#99907c]">{doc.timeAgo}</td>
                      <td className="py-3 px-3">
                        <div
                          className="flex items-center gap-1 group/hash cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(doc.sha256);
                          }}
                        >
                          <span className="font-mono text-[10px] text-[#d0c5af] px-1.5 py-0.5 rounded bg-[#0e0e11] border border-transparent group-hover/hash:border-[#4d4635]/40 transition-colors">
                            {doc.sha256.slice(0, 7)}...{doc.sha256.slice(-4)}
                          </span>
                          <span className="material-symbols-outlined text-[13px] text-[#99907c] opacity-0 group-hover/hash:opacity-100 transition-opacity">
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {doc.status === 'VERIFIED' ? (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#91be8c]/20 text-[#acdaa6] font-mono text-[10px] font-semibold"
                            title="Illustrative demo state until C backend is connected"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
                            DEMO: VERIFIED
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-bold"
                            title="Illustrative demo state until C backend is connected"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] beacon-red-pulse" />
                            DEMO: MODIFIED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-xl bg-[#1b1b1e]/90 backdrop-blur-md p-6 shadow-xl flex flex-col gap-5 border border-[#4d4635]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e1c384] text-[20px]">
                  history
                </span>
                <h3 className="font-headline-sm text-base text-[#e4e1e6] font-semibold">
                  Sample Verification Activity (Demo Log)
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#acdaa6] beacon-green-breathe" />
            </div>

            <div className="relative flex flex-col gap-5 pl-4">
              <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[#2a2a2d]" />

              {/* Activity 1 */}
              <div className="relative flex items-start gap-3 -ml-1.5">
                <div className="w-3 h-3 rounded-full bg-[#acdaa6] ring-4 ring-[#1b1b1e] -ml-[19px] mt-1 beacon-green-breathe" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#acdaa6] uppercase">
                    SAMPLE VERIFICATION PASS (DEMO)
                  </span>
                  <span className="font-mono text-xs text-[#e4e1e6] truncate">
                    financial_report_q3.pdf
                  </span>
                  <span className="font-mono text-[10px] text-[#99907c]">
                    Demo baseline match • Seeded record
                  </span>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="relative flex items-start gap-3 -ml-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab] ring-4 ring-[#1b1b1e] -ml-[19px] mt-1 beacon-red-pulse" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#ffb4ab] uppercase">
                    SAMPLE DIVERGENCE ALERT (DEMO)
                  </span>
                  <span className="font-mono text-xs text-[#ffb4ab] truncate">
                    customer_support_kb_v9.json
                  </span>
                  <span className="font-mono text-[10px] text-[#99907c]">
                    Content differs from baseline • Flagged for review
                  </span>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="relative flex items-start gap-3 -ml-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f2ca50] ring-4 ring-[#1b1b1e] -ml-[19px] mt-1 beacon-gold-pulse" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#e1c384] uppercase">
                    SAMPLE BLOCK SEALED (#42,109)
                  </span>
                  <span className="font-mono text-xs text-[#e4e1e6] truncate">
                    12 document hashes chained
                  </span>
                  <span className="font-mono text-[10px] text-[#99907c]">
                    Sample audit record • Demo dataset
                  </span>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="relative flex items-start gap-3 -ml-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ffe088] ring-4 ring-[#1b1b1e] -ml-[19px] mt-1 beacon-gold-pulse" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#e1c384] uppercase">
                    SAMPLE DOCUMENT FINGERPRINTED
                  </span>
                  <span className="font-mono text-xs text-[#e4e1e6] truncate">
                    api_architecture_v2.md
                  </span>
                  <span className="font-mono text-[10px] text-[#99907c]">
                    SHA-256 registered to sample ledger
                  </span>
                </div>
              </div>

              {/* Activity 5 */}
              <div className="relative flex items-start gap-3 -ml-1.5">
                <div className="w-3 h-3 rounded-full bg-[#acdaa6] ring-4 ring-[#1b1b1e] -ml-[19px] mt-1 beacon-green-breathe" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#acdaa6] uppercase">
                    SAMPLE AUDIT TRAVERSAL
                  </span>
                  <span className="font-mono text-xs text-[#e4e1e6] truncate">
                    All 42,109 blocks modeled
                  </span>
                  <span className="font-mono text-[10px] text-[#99907c]">
                    Pointer chain consistent • Demo state
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
