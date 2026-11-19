import React, { useState } from 'react';
import type { DocumentItem, ScreenType } from '../types';

interface DocumentsPageProps {
  documents: DocumentItem[];
  onNavigate: (screen: ScreenType) => void;
  onRegisterDocument: (newDoc: DocumentItem) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({
  documents,
  onNavigate,
  onRegisterDocument,
}) => {
  const [filter, setFilter] = useState<'all' | 'verified' | 'modified' | 'pdf' | 'json'>('all');
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSimulateRegister = () => {
    if (!selectedFile) return;
    setIsRegistering(true);

    setTimeout(() => {
      // Simulated demo SHA-256 fingerprint generation (demo mode)
      const mockHash = 'e3b0' + Math.random().toString(16).substring(2, 10) + '9c2d' + Math.random().toString(16).substring(2, 12) + 'a0f1';
      const newDoc: DocumentItem = {
        id: `DOC-${7035 + Math.floor(Math.random() * 100)}`,
        name: selectedFile.name,
        mimeType: selectedFile.type || 'application/octet-stream',
        sizeBytes: selectedFile.size,
        sizeFormatted: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        storagePath: `workspace://docs/${selectedFile.name}`,
        sha256: mockHash.padEnd(64, '0'),
        registeredAt: new Date().toISOString(),
        timeAgo: 'Just now',
        status: 'VERIFIED',
        blockIndex: 42110,
        description: 'Registered in local workspace demo state (pre-backend simulation)'
      };

      onRegisterDocument(newDoc);
      setIsRegistering(false);
      setSelectedFile(null);
      showToast(`[Demo Mode] "${newDoc.name}" registered into local demo state (Block #42,110)`);
    }, 1200);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.sha256.toLowerCase().includes(search.toLowerCase()) ||
      doc.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'verified') return doc.status === 'VERIFIED';
    if (filter === 'modified') return doc.status === 'MODIFIED';
    if (filter === 'pdf') return doc.mimeType.includes('pdf');
    if (filter === 'json') return doc.mimeType.includes('json');
    return true;
  });

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#2a2a2d] shadow-2xl flex items-center gap-3 text-[#e4e1e6] font-mono text-xs border border-[#f2ca50]/50 transition-all">
          <span className="material-symbols-outlined text-[#acdaa6] text-[20px]">
            verified
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Summary & Metrics Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[#e1c384] uppercase tracking-widest">
              Provenance Audit Layer
            </span>
            <span className="w-1 h-1 rounded-full bg-[#e1c384]" />
            <span className="font-mono text-xs text-[#99907c]">DEMO MODE • Planned Engine: OpenSSL SHA-256</span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#e4e1e6] tracking-tight">
            Knowledge Base Document Management
          </h1>
          <p className="font-body-md text-sm text-[#d0c5af] max-w-3xl">
            Register sample documents and explore deterministic SHA-256 fingerprints in local demo mode
            until the C backend is connected.
          </p>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#1b1b1e] p-3 sm:px-4 sm:py-3 rounded-xl shadow-md min-w-[130px] border border-[#4d4635]/30">
            <span className="font-mono text-[10px] text-[#99907c] uppercase block">
              Total Registered
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl text-[#e4e1e6] font-semibold">14,892</span>
              <span className="font-mono text-xs text-[#e1c384]">docs</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#acdaa6] font-mono text-[10px]">
              <span className="material-symbols-outlined text-[13px]">check</span>
              <span>All Blocks Sealed</span>
            </div>
          </div>

          <div className="bg-[#1b1b1e] p-3 sm:px-4 sm:py-3 rounded-xl shadow-md min-w-[130px] border border-[#4d4635]/30">
            <span className="font-mono text-[10px] text-[#acdaa6] uppercase block">
              Verified Documents
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl text-[#acdaa6] font-semibold">14,845</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#acdaa6] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
              <span>Match Confirmed</span>
            </div>
          </div>

          <div className="bg-[#1b1b1e] p-3 sm:px-4 sm:py-3 rounded-xl shadow-md min-w-[130px] border border-[#ffb4ab]/30">
            <span className="font-mono text-[10px] text-[#ffb4ab] uppercase block">
              Needs Attention
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl text-[#ffb4ab] font-semibold">3</span>
              <span className="font-mono text-xs text-[#ffb4ab]">modified</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#ffb4ab] font-mono text-[10px]">
              <span className="material-symbols-outlined text-[13px] animate-pulse">warning</span>
              <span>Mismatch Detected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Registration Drag-and-Drop Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="relative bg-[#1b1b1e] p-4 sm:p-5 rounded-xl shadow-lg overflow-hidden border border-[#f2ca50]/30 transition-all duration-300 hover:border-[#f2ca50]/60 group"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent opacity-80" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-5 rounded-lg bg-[#0e0e11]/90 border border-[#4d4635]/30 group-hover:border-[#f2ca50]/40 transition-all">
          <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#f2ca50] shadow-sm flex-shrink-0 border border-[#f2ca50]/20">
              <span className="material-symbols-outlined text-[32px]">upload_file</span>
            </div>

            <div className="space-y-0.5 text-center md:text-left">
              <h3 className="font-headline-sm text-base text-[#e4e1e6] font-semibold">
                {selectedFile
                  ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                  : 'Drag and drop files to register or browse directory'}
              </h3>
              <p className="font-body-sm text-xs text-[#d0c5af]">
                Supported: PDF, JSON, DOCX, TXT, MD • Direct OpenSSL SHA-256 fingerprint generation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
            <label className="cursor-pointer px-4 py-2 rounded-lg bg-[#2a2a2d] hover:bg-[#39393c] text-[#e1c384] hover:text-[#e4e1e6] font-mono text-xs transition-colors border border-[#4d4635]/30">
              <span>{selectedFile ? 'Change File' : 'Select File'}</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf,.json,.docx,.txt,.md"
              />
            </label>

            <button
              type="button"
              disabled={!selectedFile || isRegistering}
              onClick={handleSimulateRegister}
              className={`px-5 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                selectedFile
                  ? 'bg-[#d4af37] text-[#3c2f00] hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'bg-[#2a2a2d]/50 text-[#99907c] cursor-not-allowed'
              }`}
            >
              {isRegistering ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Hashing &amp; Chaining...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Register to C Ledger</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-xl bg-[#1b1b1e] border border-[#4d4635]/30">
        <div className="flex-1 flex items-center gap-2 bg-[#0e0e11] px-3.5 py-2 rounded-lg border border-[#4d4635]/30 focus-within:border-[#f2ca50]/50 transition-colors">
          <span className="material-symbols-outlined text-[#99907c] text-[18px]">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-[#e4e1e6] placeholder:text-[#99907c] font-mono text-xs outline-none"
            placeholder="Filter documents by name or SHA-256 digest..."
            type="text"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-[#99907c] hover:text-[#e4e1e6] text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(
            [
              { key: 'all', label: `ALL (${documents.length})` },
              { key: 'verified', label: 'VERIFIED' },
              { key: 'modified', label: 'MODIFIED (2)' },
              { key: 'pdf', label: 'PDF' },
              { key: 'json', label: 'JSON' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                filter === item.key
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-sm'
                  : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Registered Documents Table */}
      <div className="rounded-xl bg-[#1b1b1e] border border-[#4d4635]/30 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2a2a2d]/80 text-[#99907c] font-mono text-[11px] uppercase tracking-wider border-b border-[#4d4635]/20">
                <th className="py-3 px-4">Document Identifier</th>
                <th className="py-3 px-4">Type / Size</th>
                <th className="py-3 px-4">SHA-256 Fingerprint</th>
                <th className="py-3 px-4">Ledger Block</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2d]/30 text-xs">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className={`hover:bg-[#2a2a2d]/30 transition-colors ${
                    doc.status === 'MODIFIED' ? 'bg-[#93000a]/10' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-[#e1c384]">
                        <span className="material-symbols-outlined text-[18px]">
                          {doc.mimeType.includes('pdf')
                            ? 'picture_as_pdf'
                            : doc.mimeType.includes('json')
                            ? 'data_object'
                            : 'description'}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-mono font-semibold text-[#e4e1e6] hover:text-[#f2ca50] transition-colors">
                          {doc.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#99907c]">
                          {doc.id} • {doc.storagePath}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-[#e4e1e6] uppercase">
                        {doc.mimeType.split('/')[1]?.toUpperCase() || 'BIN'}
                      </span>
                      <span className="text-[10px] text-[#99907c]">{doc.sizeFormatted}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div
                      className="flex items-center gap-1.5 cursor-pointer group/c"
                      onClick={() => {
                        navigator.clipboard.writeText(doc.sha256);
                        showToast(`SHA-256 for "${doc.name}" copied!`);
                      }}
                    >
                      <span className="font-mono text-[11px] text-[#e1c384] px-2 py-0.5 rounded bg-[#0e0e11] border border-[#4d4635]/30 group-hover/c:border-[#f2ca50]/50">
                        {doc.sha256.slice(0, 10)}...{doc.sha256.slice(-8)}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-[#99907c] opacity-0 group-hover/c:opacity-100 transition-opacity">
                        content_copy
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigate('ledger')}
                      className="text-[#f2ca50] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>#{doc.blockIndex.toLocaleString()}</span>
                      <span className="text-[10px] text-[#99907c]">({doc.timeAgo})</span>
                    </button>
                  </td>

                  <td className="py-3.5 px-4">
                    {doc.status === 'VERIFIED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#acdaa6]/15 text-[#acdaa6] font-mono text-[10px] font-semibold border border-[#acdaa6]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
                        VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-bold border border-[#ffb4ab]/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] beacon-red-pulse" />
                        MODIFIED
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate('verification')}
                      className="px-3 py-1 rounded bg-[#2a2a2d] hover:bg-[#39393c] text-[#e1c384] hover:text-[#e4e1e6] font-mono text-[11px] transition-colors border border-[#4d4635]/30 cursor-pointer"
                    >
                      Verify Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
