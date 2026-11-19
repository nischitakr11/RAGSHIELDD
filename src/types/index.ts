export type ScreenType = 
  | 'entry' 
  | 'home' 
  | 'dashboard' 
  | 'documents' 
  | 'verification' 
  | 'ledger';

export interface DocumentItem {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  sizeFormatted: string;
  storagePath: string;
  sha256: string;
  registeredAt: string;
  timeAgo: string;
  status: 'VERIFIED' | 'MODIFIED' | 'PENDING';
  blockIndex: number;
  description?: string;
}

export interface LedgerBlock {
  index: number;
  title: string;
  badge: string;
  badgeType: 'verified' | 'modified' | 'head';
  file: string;
  docId: string;
  size: string;
  event: string;
  time: string;
  currHash: string;
  prevHash: string;
  prevStatus: string;
  events?: {
    id: string;
    title: string;
    detail: string;
    status: string;
    statusColor: string;
    icon: string;
  }[];
}

export interface VerificationItem {
  id: string;
  docName: string;
  sizeFormatted: string;
  ledgerDigest: string;
  runtimeDigest: string;
  match: boolean;
  status: 'AUTHENTIC' | 'MODIFIED' | 'ANOMALY DETECTED';
  algorithm: string;
  timestamp: string;
  diffSummary?: string;
  divergentIndex?: number;
}
