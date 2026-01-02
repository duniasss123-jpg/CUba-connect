
import React, { useState } from 'react';

const Tools: React.FC = () => {
  const [switches, setSwitches] = useState({
    anonymous: false,
    waiting: true,
    international: false,
  });

  const [timerValue, setTimerValue] = useState(5);

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const utilities = [
    { title: 'Check IMEI', icon: 'fingerprint', color: 'text-primary' },
    { title: 'Red Actual', icon: 'signal_cellular_4_bar', color: 'text-accent' },
    { title: 'Generar QR', icon: 'qr_code_2', color: 'text-secondary' },
  ];

  return (
    <div className="px-6 py-8 flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-black tracking-tight">Herramientas</h1>
        <p className="text-sm text-slate-500 font-medium">Configuraciones técnicas y de red</p>
      </header>

      {/* Call Management */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Gestión de Llamadas</h3>
        <div className="glass rounded-3xl overflow-hidden shadow-lg">
          <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">visibility_off</span>
              <span className="text-sm font-bold">Llamada Anónima (#31#)</span>
            </div>
            <button
              onClick={() => toggleSwitch('anonymous')}
              className={`w-12 h-6 rounded-full transition-colors relative ${switches.anonymous ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${switches.anonymous ? 'translate-x-6' : ''}`} />
            </button>
          </div>
          <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">phone_callback</span>
              <span className="text-sm font-bold">Llamada en Espera (*43#)</span>
            </div>
            <button
              onClick={() => toggleSwitch('waiting')}
              className={`w-12 h-6 rounded-full transition-colors relative ${switches.waiting ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${switches.waiting ? 'translate-x-6' : ''}`} />
            </button>
          </div>
          <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">phone_forwarded</span>
              <span className="text-sm font-bold">Desvío de Llamadas</span>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Technical Utilities */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Soporte Técnico</h3>
        <div className="grid grid-cols-3 gap-3">
          {utilities.map(util => (
            <button key={util.title} className="glass py-6 px-2 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${util.color}`}>
                <span className="material-symbols-outlined text-2xl">{util.icon}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-center">{util.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Call Timer Slider */}
      <section className="glass p-6 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold">Corte Automático</h3>
          <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">{timerValue} min</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="30" 
          value={timerValue} 
          onChange={(e) => setTimerValue(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span>1 min</span>
          <span>15 min</span>
          <span>30 min</span>
        </div>
        <p className="mt-4 text-[10px] text-slate-500 italic leading-tight">La llamada se colgará automáticamente después del tiempo seleccionado para evitar sobrecostos.</p>
      </section>
    </div>
  );
};

export default Tools;
