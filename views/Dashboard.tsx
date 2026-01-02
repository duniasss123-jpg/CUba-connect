
import React, { useState } from 'react';
import ProgressRing from '../components/ProgressRing';

interface DashboardProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  simSlot: 'SIM 1' | 'SIM 2';
  setSimSlot: (slot: 'SIM 1' | 'SIM 2') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ toggleTheme, isDarkMode, simSlot, setSimSlot }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="px-6 py-8 flex flex-col gap-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="glass p-1 rounded-full flex gap-1 items-center">
          <button
            onClick={() => setSimSlot('SIM 1')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              simSlot === 'SIM 1' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            SIM 1
          </button>
          <button
            onClick={() => setSimSlot('SIM 2')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              simSlot === 'SIM 2' ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            SIM 2
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="glass w-10 h-10 rounded-full flex items-center justify-center text-primary"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
            <img src="https://picsum.photos/seed/user123/100/100" className="rounded-full" alt="Profile" />
          </div>
        </div>
      </header>

      <section>
        <h1 className="text-2xl font-black tracking-tight">Hola, Carlos</h1>
        <p className="text-sm text-slate-500 font-medium">Gestiona tu línea de ETECSA</p>
      </section>

      {/* Wallet Card */}
      <section className="relative h-48 w-full glass rounded-3xl p-6 overflow-hidden flex flex-col justify-between group">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
          <span className="material-symbols-outlined text-8xl">account_balance_wallet</span>
        </div>
        
        <div className="flex justify-between items-start z-10">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Saldo Principal</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">$1,250.00 CUP</h2>
          </div>
          <button
            onClick={handleRefresh}
            className={`w-10 h-10 glass rounded-full flex items-center justify-center text-primary shadow-xl ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>

        <div className="flex justify-between items-end z-10">
          <div className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-xl border border-primary/20">
            <span className="material-symbols-outlined text-[16px] text-primary">event</span>
            <span className="text-xs font-bold text-primary">Vence: 12 Oct 2024</span>
          </div>
          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
            ETECSA CUBA
          </div>
        </div>
      </section>

      {/* Bonus Rings */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Paquetes Activos</h3>
        <div className="glass rounded-3xl p-6 flex justify-between items-center shadow-lg">
          <ProgressRing 
            radius={35} 
            stroke={4} 
            progress={65} 
            color="#10b981" 
            icon="lte_mobiledata" 
            label="Datos" 
            value="2.5 GB" 
          />
          <div className="w-[1px] h-12 bg-slate-200 dark:bg-slate-700" />
          <ProgressRing 
            radius={35} 
            stroke={4} 
            progress={40} 
            color="#135bec" 
            icon="call" 
            label="Minutos" 
            value="15 Min" 
          />
          <div className="w-[1px] h-12 bg-slate-200 dark:bg-slate-700" />
          <ProgressRing 
            radius={35} 
            stroke={4} 
            progress={85} 
            color="#f59e0b" 
            icon="sms" 
            label="SMS" 
            value="125" 
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="glass p-5 rounded-3xl flex flex-col items-start gap-3 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">send</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Transferir</p>
              <p className="text-[10px] text-slate-500 font-medium">Enviar saldo</p>
            </div>
          </button>
          <button className="glass p-5 rounded-3xl flex flex-col items-start gap-3 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Adelanta</p>
              <p className="text-[10px] text-slate-500 font-medium">Saldo emergencia</p>
            </div>
          </button>
          <button className="glass p-5 rounded-3xl flex flex-col items-start gap-3 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <span className="material-symbols-outlined">help</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Llamada *99</p>
              <p className="text-[10px] text-slate-500 font-medium">Paga quien recibe</p>
            </div>
          </button>
          <button className="glass p-5 rounded-3xl flex flex-col items-start gap-3 active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Check IMEI</p>
              <p className="text-[10px] text-slate-500 font-medium">Estado legal</p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
