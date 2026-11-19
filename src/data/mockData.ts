import type { DocumentItem, LedgerBlock, VerificationItem } from '../types';

/**
 * SEEDED DEMO DATASET
 * 
 * Illustrative sample documents, ledger entries, and verification presets
 * for frontend demonstration until the C backend is connected.
 * 
 * NOTE: Values here represent schema models and demonstration states.
 * Real hashing and verification will be performed once the C engine is linked.
 */

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-7028',
    name: 'security_policy_2025.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 131482,
    sizeFormatted: '128.4 KB',
    storagePath: 'workspace://docs/security_policy_2025.pdf',
    sha256: '9b2d14f27c88102e3b4a5f6c7d8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    registeredAt: '2026-11-17T13:58:04Z',
    timeAgo: '12m ago',
    status: 'VERIFIED',
    blockIndex: 42106,
    description: 'Corporate cybersecurity guidelines & encryption baseline (Demo Sample)'
  },
  {
    id: 'DOC-7029',
    name: 'customer_support_kb_v9.json',
    mimeType: 'application/json',
    sizeBytes: 438412,
    sizeFormatted: '428.1 KB',
    storagePath: 'workspace://docs/customer_support_kb_v9.json',
    sha256: '1f8e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
    registeredAt: '2026-11-17T14:02:19Z',
    timeAgo: '1h ago',
    status: 'MODIFIED',
    blockIndex: 42107,
    description: 'Customer troubleshooting articles and support responses (Demo Sample - Content Divergence Flagged)'
  },
  {
    id: 'DOC-7030',
    name: 'customer_faq_corpus.md',
    mimeType: 'text/markdown',
    sizeBytes: 94812,
    sizeFormatted: '92.6 KB',
    storagePath: 'workspace://docs/customer_faq_corpus.md',
    sha256: '5f94b128c7c91a382109e46a782b54432194ff0399d8ece8812a0f9b3e14a22b',
    registeredAt: '2026-11-17T12:30:00Z',
    timeAgo: '2h ago',
    status: 'VERIFIED',
    blockIndex: 42105,
    description: 'Frequently asked questions corpus for RAG query grounding (Demo Sample)'
  },
  {
    id: 'DOC-7031',
    name: 'kb_article_7029.md',
    mimeType: 'text/markdown',
    sizeBytes: 14538,
    sizeFormatted: '14.2 KB',
    storagePath: 'workspace://docs/kb_article_7029.md',
    sha256: '7c4e5a2d338ce10a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    registeredAt: '2026-11-17T14:15:33Z',
    timeAgo: '2h ago',
    status: 'MODIFIED',
    blockIndex: 42108,
    description: 'Knowledge article regarding API rate limits (Demo Sample - Content Differs from Registered Baseline)'
  },
  {
    id: 'DOC-7032',
    name: 'finance_terms_2026.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sizeBytes: 220979,
    sizeFormatted: '215.8 KB',
    storagePath: 'workspace://docs/finance_terms_2026.docx',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    registeredAt: '2026-11-17T14:28:44Z',
    timeAgo: '3h ago',
    status: 'VERIFIED',
    blockIndex: 42109,
    description: 'Fiscal regulatory disclosures and audit compliance (Demo Sample)'
  },
  {
    id: 'DOC-7033',
    name: 'api_reference_guide.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 1887436,
    sizeFormatted: '1.8 MB',
    storagePath: 'workspace://docs/api_reference_guide.pdf',
    sha256: '1120cd9981aef038411b0239488a09bcdef1234567890abcdef1234567890abc',
    registeredAt: '2026-11-17T10:14:00Z',
    timeAgo: '4h ago',
    status: 'VERIFIED',
    blockIndex: 42104,
    description: 'API endpoint schemas and protocol parameters (Demo Sample)'
  },
  {
    id: 'DOC-7034',
    name: 'enterprise_rag_kb_q3.json',
    mimeType: 'application/json',
    sizeBytes: 3565158,
    sizeFormatted: '3.4 MB',
    storagePath: 'workspace://docs/enterprise_rag_kb_q3.json',
    sha256: '8c2e1740ba192847561029384756102938475610293847561029384756102938',
    registeredAt: '2026-11-17T09:00:00Z',
    timeAgo: '5h ago',
    status: 'VERIFIED',
    blockIndex: 42103,
    description: 'Enterprise query corpus and indexed vector documents (Demo Sample)'
  }
];

export const INITIAL_LEDGER_BLOCKS: LedgerBlock[] = [
  {
    index: 42106,
    title: 'Block Specification #42,106',
    badge: 'SPECIFICATION INTACT',
    badgeType: 'verified',
    file: 'security_policy_v2.pdf',
    docId: 'security_policy_v2.pdf (ID: DOC-7028)',
    size: '128.4 KB (131,482 bytes)',
    event: 'Document Registration (Specification Schema)',
    time: 'November 17, 2026 • 13:58:04 UTC (Demo Record)',
    currHash: '9b2d14f27c88102e3b4a5f6c7d8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    prevHash: '4f12ac08811d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
    prevStatus: 'MATCHED — equals Block #42,105 current hash',
    events: [
      {
        id: 'EVT-01',
        title: 'EVT-01: Document Ingestion Schema',
        detail: '128.4 KB payload schema parsed for SHA-256 fingerprinting',
        status: 'SPEC READY',
        statusColor: 'text-tertiary',
        icon: 'file_open'
      },
      {
        id: 'EVT-02',
        title: 'EVT-02: Deterministic SHA-256 Digest',
        detail: 'Standard 256-bit hash specification generated',
        status: 'COMPUTED',
        statusColor: 'text-tertiary',
        icon: 'lock_reset'
      },
      {
        id: 'EVT-03',
        title: 'EVT-03: Linked-List Node Definition',
        detail: 'sizeof(ledger_node_t) structure chained to previous block record',
        status: 'CHAINED',
        statusColor: 'text-tertiary',
        icon: 'device_hub'
      }
    ]
  },
  {
    index: 42107,
    title: 'Block Specification #42,107',
    badge: 'SPECIFICATION INTACT',
    badgeType: 'verified',
    file: 'customer_support_kb_v9.json',
    docId: 'customer_support_kb_v9.json (ID: DOC-7029)',
    size: '428.1 KB (438,412 bytes)',
    event: 'Document Registration (Specification Schema)',
    time: 'November 17, 2026 • 14:02:19 UTC (Demo Record)',
    currHash: '1f8e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
    prevHash: '9b2d14f27c88102e3b4a5f6c7d8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    prevStatus: 'MATCHED — equals Block #42,106 current hash',
    events: [
      {
        id: 'EVT-01',
        title: 'EVT-01: Document Ingestion Schema',
        detail: '428.1 KB payload schema parsed for SHA-256 fingerprinting',
        status: 'SPEC READY',
        statusColor: 'text-tertiary',
        icon: 'file_open'
      },
      {
        id: 'EVT-02',
        title: 'EVT-02: Deterministic SHA-256 Digest',
        detail: 'Standard 256-bit hash specification generated',
        status: 'COMPUTED',
        statusColor: 'text-tertiary',
        icon: 'lock_reset'
      },
      {
        id: 'EVT-03',
        title: 'EVT-03: Linked-List Node Definition',
        detail: 'sizeof(ledger_node_t) structure chained to previous block record',
        status: 'CHAINED',
        statusColor: 'text-tertiary',
        icon: 'device_hub'
      },
      {
        id: 'EVT-04',
        title: 'EVT-04: Illustrative Verification Check',
        detail: 'Sample scenario: subsequent block #42,108 illustrates content divergence',
        status: 'DEMO SCENARIO',
        statusColor: 'text-error',
        icon: 'warning'
      }
    ]
  },
  {
    index: 42108,
    title: 'Block Specification #42,108',
    badge: 'MODIFICATION FLAGGED',
    badgeType: 'modified',
    file: 'kb_article_7029.md',
    docId: 'kb_article_7029.md (ID: DOC-7030)',
    size: '14.2 KB (14,538 bytes)',
    event: 'Document Modification Notice (Content Divergence Demo)',
    time: 'November 17, 2026 • 14:15:33 UTC (Demo Record)',
    currHash: '7c4e5a2d338ce10a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    prevHash: '1f8e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
    prevStatus: 'POINTER VERIFIED (Hash delta indicates content differs from registered baseline)',
    events: [
      {
        id: 'EVT-01',
        title: 'EVT-01: Document Load for Verification',
        detail: 'File kb_article_7029.md loaded to test fingerprint against ledger',
        status: 'SUCCESS',
        statusColor: 'text-tertiary',
        icon: 'file_open'
      },
      {
        id: 'EVT-02',
        title: 'EVT-02: Runtime Hash Evaluation',
        detail: 'Runtime hash computed: 7c4e5a... (differs from baseline)',
        status: 'EVALUATED',
        statusColor: 'text-secondary',
        icon: 'lock_reset'
      },
      {
        id: 'EVT-03',
        title: 'EVT-03: Hash Fingerprint Comparison',
        detail: 'Digest differs from registered record; document content changed',
        status: 'DIVERGENCE FLAGGED',
        statusColor: 'text-error',
        icon: 'warning'
      }
    ]
  },
  {
    index: 42109,
    title: 'Block Specification #42,109 (Head)',
    badge: 'HEAD NODE RECORDED',
    badgeType: 'head',
    file: 'finance_terms_2026.docx',
    docId: 'finance_terms_2026.docx (ID: DOC-7031)',
    size: '215.8 KB (220,979 bytes)',
    event: 'Document Registration & Audit Head Commit',
    time: 'November 17, 2026 • 14:28:44 UTC (Demo Record)',
    currHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    prevHash: '7c4e5a2d338ce10a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    prevStatus: 'MATCHED — equals Block #42,108 current hash',
    events: [
      {
        id: 'EVT-01',
        title: 'EVT-01: Head Node Reference',
        detail: 'Chain Head committed as active reference node in ledger chain',
        status: 'HEAD COMMITTED',
        statusColor: 'text-primary',
        icon: 'tag'
      },
      {
        id: 'EVT-02',
        title: 'EVT-02: Hash Chain Link Sealed',
        detail: 'SHA-256 e3b0c4... chained to previous block in sequential ledger schema',
        status: 'RECORDED',
        statusColor: 'text-tertiary',
        icon: 'verified'
      }
    ]
  }
];

export const VERIFICATION_PRESETS: Record<string, VerificationItem> = {
  kb_v9: {
    id: 'kb_v9',
    docName: 'customer_support_kb_v9.json',
    sizeFormatted: '428.1 KB',
    ledgerDigest: '5f94b128c7c91a382109e46a782b54432194ff0399d8ece8812a0f9b3e14a22b',
    runtimeDigest: 'a791fd2c984210398bbac039148d2819039e102834bba710928374619028341c',
    match: false,
    status: 'MODIFIED',
    algorithm: 'Planned Target: OpenSSL SHA-256 (Demo Preset)',
    timestamp: 'Just now (Demo)',
    diffSummary: 'Digest divergence: document content differs from registered baseline fingerprint',
    divergentIndex: 0
  },
  sec_policy: {
    id: 'sec_policy',
    docName: 'security_policy_2025.pdf',
    sizeFormatted: '1.2 MB',
    ledgerDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    runtimeDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    match: true,
    status: 'AUTHENTIC',
    algorithm: 'Planned Target: OpenSSL SHA-256 (Demo Preset)',
    timestamp: '2m ago (Demo)',
    diffSummary: 'Exact match (32/32 bytes match registered baseline)'
  },
  ent_rag: {
    id: 'ent_rag',
    docName: 'enterprise_rag_kb_q3.json',
    sizeFormatted: '3.4 MB',
    ledgerDigest: '8c2e1740ba192847561029384756102938475610293847561029384756102938',
    runtimeDigest: '8c2e1740ba192847561029384756102938475610293847561029384756102938',
    match: true,
    status: 'AUTHENTIC',
    algorithm: 'Planned Target: OpenSSL SHA-256 (Demo Preset)',
    timestamp: '14m ago (Demo)',
    diffSummary: 'Exact match (32/32 bytes match registered baseline)'
  },
  legal_terms: {
    id: 'legal_terms',
    docName: 'service_level_agreement_v2.md',
    sizeFormatted: '184 KB',
    ledgerDigest: '3c89b14289ea0192837465192837465192837465192837465192837465192837',
    runtimeDigest: '3c89b14289ea0192837465192837465192837465192837465192837465192837',
    match: true,
    status: 'AUTHENTIC',
    algorithm: 'Planned Target: OpenSSL SHA-256 (Demo Preset)',
    timestamp: '25m ago (Demo)',
    diffSummary: 'Exact match (32/32 bytes match registered baseline)'
  }
};
