import React, { useState } from 'react';
import type { ScreenType } from '../types';
import { VERIFICATION_PRESETS } from '../data/mockData';

interface VerificationPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({ onNavigate }) => {
  const [selectedKey, setSelectedKey] = useState<string>('kb_v9');
  const [activeMode, setActiveMode] = useState<'single' | 'batch' | 'stream'>('single');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationDone, setVerificationDone] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentPreset = VERIFICATION_PRESETS[selectedKey] || VERIFICATION_PRESETS.kb_v9;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRunVerify = () => {
    setIsVerifying(true);
    setVerificationDone(false);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationDone(true);
      if (currentPreset.match) {
        showToast(`Verification PASSED: ${currentPreset.docName} is Authentic!`);
      } else {
        showToast(`ALERT: Hash divergence detected in ${currentPreset.docName}!`);
      }
    }, 900);
  };

  // Split hashes into 8-character chunks for byte-level comparison view
  const formatChunks = (hex: string) => {
    const chunks: string[] = [];
    for (let i = 0; i < hex.length; i += 8) {
      chunks.push(hex.slice(i, i + 8));
    }
    return chunks;
  };

  const ledgerChunks = formatChunks(currentPreset.ledgerDigest);
  const runtimeChunks = formatChunks(currentPreset.runtimeDigest);

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#2a2a2d] shadow-2xl flex items-center gap-3 text-[#e4e1e6] font-mono text-xs border border-[#f2ca50]/50 transition-all">
          <span className={`material-symbols-outlined text-[20px] ${
            currentPreset.match ? 'text-[#acdaa6]' : 'text-[#ffb4ab]'
          }`}>
            {currentPreset.match ? 'check_circle' : 'warning'}
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Mode Switch */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-[#2a2a2d] font-mono text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
              CRYPTOGRAPHIC INTEGRITY PROTOCOL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="font-mono text-xs text-[#99907c]">OpenSSL SHA-256 Engine</span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] tracking-tight">
            Integrity Verification Engine
          </h1>
          <p className="font-body-md text-sm text-[#d0c5af] max-w-2xl">
            Verify document integrity by comparing newly computed SHA-256 digests against immutable
            records in the C-based linked-list ledger.
          </p>
        </div>

        {/* Mode Switch Pills */}
        <div className="flex items-center p-1 rounded-xl bg-[#0e0e11] shadow-md self-start lg:self-auto border border-[#4d4635]/20">
          <button
            type="button"
            onClick={() => setActiveMode('single')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'single'
                ? 'bg-[#2a2a2d] text-[#f2ca50] font-semibold shadow-sm'
                : 'text-[#d0c5af] hover:text-[#e4e1e6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">fingerprint</span>
            Single Document
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('batch')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'batch'
                ? 'bg-[#2a2a2d] text-[#f2ca50] font-semibold shadow-sm'
                : 'text-[#d0c5af] hover:text-[#e4e1e6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">folder_zip</span>
            Batch File Check
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('stream')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'stream'
                ? 'bg-[#2a2a2d] text-[#f2ca50] font-semibold shadow-sm'
                : 'text-[#d0c5af] hover:text-[#e4e1e6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            Audit Stream
          </button>
        </div>
      </div>

      {/* Target Intake Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 rounded-xl bg-[#1b1b1e] shadow-xl border border-[#4d4635]/30">
        <div className="lg:col-span-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#f2ca50] shadow-inner flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">description</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-mono text-[10px] text-[#99907c] uppercase">
              Active Document Scope
            </span>
            <div className="relative flex items-center mt-1">
              <select
                value={selectedKey}
                onChange={(e) => {
                  setSelectedKey(e.target.value);
                  setVerificationDone(false);
                }}
                className="w-full bg-[#0e0e11] text-[#e4e1e6] font-mono text-xs py-2 px-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f2ca50] border border-[#4d4635]/30"
              >
                <option value="kb_v9">customer_support_kb_v9.json (428.1 KB) [MODIFIED DEMO]</option>
                <option value="sec_policy">security_policy_2025.pdf (1.2 MB) [AUTHENTIC DEMO]</option>
                <option value="ent_rag">enterprise_rag_kb_q3.json (3.4 MB) [AUTHENTIC DEMO]</option>
                <option value="legal_terms">service_level_agreement_v2.md (184 KB) [AUTHENTIC DEMO]</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 text-[#99907c] pointer-events-none text-[18px]">
                unfold_more
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex items-center justify-start lg:justify-center">
          <button
            type="button"
            onClick={() => showToast('Candidate file loaded for runtime SHA-256 analysis')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e0e11] text-[#e1c384] hover:text-[#e4e1e6] hover:bg-[#2a2a2d] transition-all text-xs font-mono border border-[#4d4635]/30 cursor-pointer shadow-inner"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Upload Candidate File</span>
          </button>
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <button
            type="button"
            disabled={isVerifying}
            onClick={handleRunVerify}
            className="w-full lg:w-auto px-8 py-3 rounded-lg bg-[#d4af37] text-[#3c2f00] font-headline-sm text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(212,175,55,0.25)] hover:shadow-[0_0_32px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>COMPUTING SHA-256...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span>VERIFY INTEGRITY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dual Hash Comparison Stage */}
      <div className="relative w-full rounded-2xl bg-[#0e0e11] p-6 shadow-2xl overflow-hidden border border-[#2a2a2d]/40">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent opacity-80" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#2a2a2d]/40 gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">compare_arrows</span>
            <span className="font-mono text-xs font-semibold text-[#e1c384] uppercase tracking-widest">
              SHA-256 Cryptographic Digest Verification
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#99907c]">
            <span className="w-2 h-2 rounded-full bg-[#e1c384] animate-ping" />
            <span>BACKEND: OpenSSL 3.x EVP_sha256()</span>
          </div>
        </div>

        {/* Dual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Left Panel: Ledger Committed */}
          <div className="p-5 rounded-xl bg-[#1b1b1e] border border-[#4d4635]/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f2ca50]" />
                LEDGER COMMITTED HASH
              </span>
              <span className="font-mono text-[10px] text-[#acdaa6] bg-[#acdaa6]/10 px-2 py-0.5 rounded">
                IMMUTABLE REFERENCE
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-xs space-y-2">
              <div className="text-[10px] text-[#99907c] flex items-center justify-between">
                <span>CHAIN BLOCK: #42,107</span>
                <span>OPENSSL LIB32</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {ledgerChunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded bg-[#1f1f22] text-[#e1c384] border border-[#4d4635]/30 font-mono"
                  >
                    {chunk}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#99907c]">
              <span>Doc: {currentPreset.docName}</span>
              <span>Size: {currentPreset.sizeFormatted}</span>
            </div>
          </div>

          {/* Right Panel: Runtime Computed */}
          <div
            className={`p-5 rounded-xl bg-[#1b1b1e] border flex flex-col gap-3 ${
              currentPreset.match ? 'border-[#acdaa6]/40' : 'border-[#ffb4ab]/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold text-[#e1c384] uppercase tracking-wider flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentPreset.match ? 'bg-[#acdaa6]' : 'bg-[#ffb4ab]'
                  }`}
                />
                RUNTIME COMPUTED HASH
              </span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                  currentPreset.match
                    ? 'bg-[#acdaa6]/10 text-[#acdaa6]'
                    : 'bg-[#93000a]/30 text-[#ffb4ab]'
                }`}
              >
                {currentPreset.match ? 'MATCHES RECORD' : 'DIVERGENCE FOUND'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0e0e11] border border-[#4d4635]/20 font-mono text-xs space-y-2">
              <div className="text-[10px] text-[#99907c] flex items-center justify-between">
                <span>EVALUATION: memcmp(32)</span>
                <span>{currentPreset.timestamp}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {runtimeChunks.map((chunk, idx) => {
                  const isDiff = !currentPreset.match && chunk !== ledgerChunks[idx];
                  return (
                    <div
                      key={idx}
                      className={`p-1.5 rounded font-mono border ${
                        isDiff
                          ? 'bg-[#93000a]/40 text-[#ffb4ab] border-[#ffb4ab]/50 font-bold animate-pulse'
                          : 'bg-[#1f1f22] text-[#e4e1e6] border-[#4d4635]/30'
                      }`}
                    >
                      {chunk}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#99907c]">
              <span>Verification Result:</span>
              <span
                className={`font-semibold ${
                  currentPreset.match ? 'text-[#acdaa6]' : 'text-[#ffb4ab]'
                }`}
              >
                {currentPreset.match ? '32/32 BYTES IDENTICAL' : 'BYTE MISMATCH DETECTED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Verdict Banner */}
      {verificationDone && (
        <div
          className={`p-6 rounded-2xl shadow-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
            currentPreset.match
              ? 'bg-[#103813]/20 border-[#acdaa6]/40'
              : 'bg-[#93000a]/20 border-[#ffb4ab]/40'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                currentPreset.match
                  ? 'bg-[#acdaa6]/20 text-[#acdaa6]'
                  : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
              }`}
            >
              <span className="material-symbols-outlined text-[32px]">
                {currentPreset.match ? 'verified' : 'warning'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className={`font-mono text-xs font-bold uppercase tracking-wider ${
                  currentPreset.match ? 'text-[#acdaa6]' : 'text-[#ffb4ab]'
                }`}
              >
                {currentPreset.match
                  ? 'STATUS: INTEGRITY VERIFIED (AUTHENTIC)'
                  : 'STATUS: HASH DIVERGENCE DETECTED (MODIFIED)'}
              </span>
              <p className="text-sm text-[#e4e1e6] max-w-2xl">
                {currentPreset.match
                  ? 'Zero byte discrepancy detected between the C-ledger baseline record and runtime state. Document payload is untampered and verified safe for RAG query grounding.'
                  : 'Document payload has been modified since initial registration! Runtime hash diverged from the sealed ledger entry. Ingestion blocked to preserve RAG integrity.'}
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-[#99907c] mt-1">
                <span>Algo: OpenSSL SHA-256</span>
                <span>•</span>
                <span>Decision: {currentPreset.match ? 'ALLOW (200 OK)' : 'BLOCK (409 ALERT)'}</span>
                <span>•</span>
                <span>Latency: 0.14ms</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('ledger')}
              className="px-4 py-2.5 rounded-lg bg-[#2a2a2d] hover:bg-[#39393c] text-[#e1c384] hover:text-[#e4e1e6] font-mono text-xs transition-colors border border-[#4d4635]/30 cursor-pointer"
            >
              View in Ledger →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
