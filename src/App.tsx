import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UploadReceipt } from './components/UploadReceipt';
import { VoiceInput } from './components/VoiceInput';
import { Analytics } from './components/Analytics';
import { AIChat } from './components/AIChat';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadReceipt />;
      case 'voice':
        return <VoiceInput />;
      case 'video':
        return <div className="p-6"><h2 className="text-2xl font-bold">Video Input</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'wallet':
        return <div className="p-6"><h2 className="text-2xl font-bold">Wallet Passes</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'chat':
        return <AIChat />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600">Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 md:ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;