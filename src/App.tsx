import { useState } from 'react';
import type { ScreenType, DocumentItem } from './types';
import { INITIAL_DOCUMENTS } from './data/mockData';
import { EntryPage } from './pages/EntryPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { VerificationPage } from './pages/VerificationPage';
import { LedgerPage } from './pages/LedgerPage';
import { WorkspaceLayout } from './components/common/WorkspaceLayout';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('entry');
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegisterDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // 1. Entry Page (Separate from Home Page, immersive 3D Three.js scene)
  if (currentScreen === 'entry') {
    return (
      <EntryPage
        onAccessPlatform={() => setCurrentScreen('home')}
      />
    );
  }

  // 2. Home Page (Brand landing page with Hero, 3D step visual, capabilities, architecture)
  if (currentScreen === 'home') {
    return (
      <HomePage
        onLaunchWorkspace={() => setCurrentScreen('dashboard')}
        onNavigateEntry={() => setCurrentScreen('entry')}
      />
    );
  }

  // 3, 4, 5, 6: Workspace Pages (Dashboard, Documents, Verification, Ledger)
  return (
    <WorkspaceLayout
      currentScreen={currentScreen}
      onNavigate={setCurrentScreen}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {currentScreen === 'dashboard' && (
        <DashboardPage
          documents={documents}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'documents' && (
        <DocumentsPage
          documents={documents}
          onNavigate={setCurrentScreen}
          onRegisterDocument={handleRegisterDocument}
        />
      )}

      {currentScreen === 'verification' && (
        <VerificationPage
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'ledger' && (
        <LedgerPage
          onNavigate={setCurrentScreen}
        />
      )}
    </WorkspaceLayout>
  );
}

export default App;
