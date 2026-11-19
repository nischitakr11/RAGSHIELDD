import React from 'react';
import type { ScreenType } from '../../types';

interface WorkspaceLayoutProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onRunQuickVerification?: () => void;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  currentScreen,
  onNavigate,
  children,
  searchQuery = '',
  onSearchChange,
}) => {
  return (
    <div className="bg-[#131316] font-sans text-[#e4e1e6] antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] min-h-screen flex">
      {/* 1. SIDEBAR (Fixed 72 = 288px) */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#0e0e11] z-50 flex flex-col justify-between p-4 shadow-[4px_0_24px_rgba(0,0,0,0.6)] border-r border-[#4d4635]/30">
        <div className="flex flex-col gap-6">
          {/* Logo & Security Badge */}
          <div className="px-2 pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 group text-left cursor-pointer"
            >
              <span className="font-serifBrand text-xl font-bold tracking-tight text-[#f2ca50] transition-transform group-hover:scale-[1.02]">
                RAGSHIELD<span className="text-[#e1c384]">.</span>
              </span>
            </button>
            <span className="px-1.5 py-0.5 rounded bg-[#2a2a2d] font-mono text-[11px] font-semibold text-[#e1c384]">
              SEC
            </span>
          </div>

          {/* Ledger Synchronized Status Box */}
          <div className="px-3 py-2 rounded-lg bg-[#1b1b1e] flex flex-col gap-1 border border-[#4d4635]/20 hover:border-[#4d4635]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#99907c] uppercase">Ledger Status</span>
              <span className="font-mono text-[11px] text-[#acdaa6] flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#acdaa6] beacon-green-breathe" />
                SYNCHRONIZED
              </span>
            </div>
            <span className="font-mono text-[12px] text-[#e4e1e6] truncate">
              Chain Head: #42,109
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                currentScreen === 'dashboard'
                  ? 'bg-[#d4af37] text-[#3c2f00] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">security</span>
              <span className="text-sm">Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('documents')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                currentScreen === 'documents'
                  ? 'bg-[#d4af37] text-[#3c2f00] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">folder_data</span>
              <span className="text-sm">Documents</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('verification')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                currentScreen === 'verification'
                  ? 'bg-[#d4af37] text-[#3c2f00] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <span className="text-sm">Verification</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('ledger')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                currentScreen === 'ledger'
                  ? 'bg-[#d4af37] text-[#3c2f00] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'text-[#d0c5af] hover:bg-[#2a2a2d] hover:text-[#e4e1e6]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span className="text-sm">Ledger</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[#99907c] hover:bg-[#2a2a2d] hover:text-[#e4e1e6] transition-all duration-200 mt-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="text-sm">Exit to Website</span>
            </button>
          </nav>
        </div>

        {/* User Root Clearance Card */}
        <div className="p-3 rounded-xl bg-[#1b1b1e] flex flex-col gap-2 border border-[#4d4635]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center transition-transform hover:scale-105">
              <span className="material-symbols-outlined text-[#3c2f00] text-[18px]">person</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-[#e4e1e6] truncate">C. Vance (SecOps)</span>
              <span className="font-mono text-[10px] text-[#d0c5af] truncate">sig:0x4d91...a1e4</span>
            </div>
          </div>
          <div className="pt-1 flex items-center justify-between text-[#99907c] border-t border-[#2a2a2d]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider">ROOT CLEARANCE</span>
            <span className="material-symbols-outlined text-[14px] text-[#acdaa6]">lock</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT (Offset by 72 = 288px) */}
      <div className="pl-72 min-h-screen flex-1 flex flex-col w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-[#0e0e11]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] z-40 flex items-center justify-between px-6 border-b border-[#4d4635]/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2d] border border-[#4d4635]/20">
              <span className="w-2 h-2 rounded-full bg-[#acdaa6] beacon-green-breathe" />
              <span className="font-mono text-[11px] text-[#acdaa6] tracking-wider uppercase font-semibold">
                INTEGRITY PROTOCOL ACTIVE
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded bg-[#1b1b1e] border border-[#4d4635]/15 font-mono text-xs">
              <span className="text-[#99907c] uppercase">SHA-256</span>
              <span className="text-[#e1c384]">e3b0c44298fc1c149afbf4c8996fb924</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#99907c] text-[18px]">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-64 pl-9 pr-4 py-1.5 rounded-lg bg-[#0e0e11] text-[#e4e1e6] placeholder:text-[#99907c] font-mono text-xs outline-none focus:ring-1 focus:ring-[#f2ca50] focus:bg-[#1b1b1e] border border-[#4d4635]/20 transition-all"
                placeholder="Search hash, chunk, CID..."
                type="text"
              />
            </div>

            <button
              type="button"
              className="p-2 rounded-lg bg-[#1b1b1e] text-[#d0c5af] hover:text-[#e4e1e6] hover:bg-[#2a2a2d] transition-all relative border border-[#4d4635]/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f2ca50] beacon-gold-pulse" />
            </button>

            <div
              onClick={() => onNavigate('dashboard')}
              className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[#3c2f00] text-[18px]">person</span>
            </div>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="w-full pt-16 bg-[#131316] flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};
