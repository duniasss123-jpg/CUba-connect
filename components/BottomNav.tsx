
import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: Tab.INICIO, label: 'Inicio', icon: 'home' },
    { id: Tab.TIENDA, label: 'Tienda', icon: 'storefront' },
    { id: Tab.FINANZAS, label: 'Finanzas', icon: 'query_stats' },
    { id: Tab.HERRAMIENTAS, label: 'Herramientas', icon: 'build' },
    { id: Tab.NAUTA, label: 'Nauta', icon: 'wifi' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-4 pb-6 pt-2">
      <div className="glass rounded-2xl shadow-2xl flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeTab === tab.id ? 'fill-1' : ''}`}>
              {tab.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </nav>
  );
};

export default BottomNav;
