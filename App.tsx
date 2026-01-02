
import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import Dashboard from './views/Dashboard';
import Store from './views/Store';
import Finance from './views/Finance';
import Tools from './views/Tools';
import Nauta from './views/Nauta';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.INICIO);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [simSlot, setSimSlot] = useState<'SIM 1' | 'SIM 2'>('SIM 1');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.INICIO:
        return <Dashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} simSlot={simSlot} setSimSlot={setSimSlot} />;
      case Tab.TIENDA:
        return <Store />;
      case Tab.FINANZAS:
        return <Finance />;
      case Tab.HERRAMIENTAS:
        return <Tools />;
      case Tab.NAUTA:
        return <Nauta />;
      default:
        return <Dashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} simSlot={simSlot} setSimSlot={setSimSlot} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-bg-light dark:bg-bg-dark transition-colors duration-500 overflow-hidden shadow-2xl">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;
