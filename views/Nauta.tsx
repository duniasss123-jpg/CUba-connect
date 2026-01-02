
import React, { useState, useEffect } from 'react';

interface SessionRecord {
  id: string;
  duration: string;
  cost: string;
  time: string;
}

const Nauta: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Configuration State
  const [costPerHour, setCostPerHour] = useState(25);
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [limitMinutes, setLimitMinutes] = useState(30);
  const [isWarning, setIsWarning] = useState(false);

  // Timer Effect
  useEffect(() => {
    let interval: any;
    if (isConnected) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Limit Monitoring Effect
  useEffect(() => {
    if (isConnected && limitEnabled) {
      const maxSeconds = limitMinutes * 60;
      
      // Warning threshold (60 seconds before limit)
      if (time >= maxSeconds - 60 && time < maxSeconds) {
        setIsWarning(true);
      } else {
        setIsWarning(false);
      }

      // Auto Disconnect
      if (time >= maxSeconds) {
        const estimatedCost = (time / 3600) * costPerHour;
        const newSession: SessionRecord = {
          id: Date.now().toString(),
          duration: formatTime(time),
          cost: estimatedCost.toFixed(2),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setHistory(prev => [newSession, ...prev]);
        setTime(0);
        setIsConnected(false);
        setIsWarning(false);
      }
    } else {
      setIsWarning(false);
    }
  }, [time, isConnected, limitEnabled, limitMinutes, costPerHour]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const estimatedCost = (time / 3600) * costPerHour; 

  const handleToggleConnection = () => {
    if (isConnected) {
      // Logic for disconnecting
      const newSession: SessionRecord = {
        id: Date.now().toString(),
        duration: formatTime(time),
        cost: estimatedCost.toFixed(2),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Add to history and reset timer
      setHistory(prev => [newSession, ...prev]);
      setTime(0);
      setIsWarning(false);
    }
    setIsConnected(!isConnected);
  };

  return (
    <div className="px-6 py-8 flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-black tracking-tight">Nauta</h1>
        <p className="text-sm text-slate-500 font-medium">Gestión de WiFi y Correo Nacional</p>
      </header>

      {/* Login Card */}
      <section className="glass p-6 rounded-3xl shadow-xl flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Usuario</label>
            <input 
              type="text" 
              placeholder="carlos92@nauta.com.cu" 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 px-1 mt-1">
             <div className="relative flex items-center">
               <input 
                 type="checkbox" 
                 id="remember" 
                 checked={rememberMe}
                 onChange={(e) => setRememberMe(e.target.checked)}
                 className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:border-primary checked:bg-primary"
               />
               <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                 <span className="material-symbols-outlined text-[16px] font-bold">check</span>
               </span>
             </div>
             <label htmlFor="remember" className="text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer select-none">Recordarme</label>
          </div>
        </div>

        <button 
          onClick={handleToggleConnection}
          className={`w-full h-16 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg font-black uppercase tracking-widest ${
            isConnected ? 'bg-red-500 text-white shadow-red-500/30 animate-pulse' : 'bg-accent text-white shadow-accent/30'
          }`}
        >
          <span className="text-xl">{isConnected ? 'Desconectar' : 'Conectar'}</span>
        </button>
      </section>

      {/* Rate Configuration */}
      <section className="glass p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-200 dark:border-slate-700">
         <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
             <span className="material-symbols-outlined">currency_exchange</span>
           </div>
           <div>
             <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Tarifa</h3>
             <p className="text-[10px] text-slate-500 font-medium">Costo por hora</p>
           </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="relative">
                <input 
                    type="number" 
                    value={costPerHour}
                    onChange={(e) => setCostPerHour(Number(e.target.value))}
                    className="w-16 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl text-center text-sm font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">CUP/h</span>
         </div>
      </section>

      {/* Limit Config Section */}
      <section className="glass p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-xl">timer_off</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Límite de Sesión</span>
          </div>
          <div 
            onClick={() => setLimitEnabled(!limitEnabled)}
            className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${limitEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${limitEnabled ? 'translate-x-4' : ''}`} />
          </div>
        </div>
        
        <div className={`transition-all duration-300 overflow-hidden ${limitEnabled ? 'max-h-24 opacity-100' : 'max-h-0 opacity-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-slate-400">Desconectar a los:</span>
            <span className="text-sm font-black text-primary">{limitMinutes} min</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="120" 
            step="5"
            value={limitMinutes}
            onChange={(e) => setLimitMinutes(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-bold text-slate-300 uppercase">5 min</span>
            <span className="text-[9px] font-bold text-slate-300 uppercase">2 horas</span>
          </div>
        </div>
      </section>

      {/* Connection Stats */}
      <section className="flex flex-col items-center gap-2 relative">
        {/* Warning Notification */}
        {isWarning && (
          <div className="absolute -top-6 animate-bounce bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20">
            ¡Tiempo casi agotado!
          </div>
        )}
        
        <div className={`glass px-8 py-10 rounded-full border-primary/20 flex flex-col items-center shadow-inner relative overflow-hidden transition-colors duration-500 ${isWarning ? 'bg-red-50 dark:bg-red-900/20 border-red-500/50' : ''}`}>
          <div className={`absolute inset-0 bg-primary/5 dark:bg-primary/10 ${isConnected ? 'animate-pulse' : ''} ${isWarning ? '!bg-red-500/10' : ''}`} />
          <span className={`text-4xl font-black tracking-tighter relative z-10 ${isWarning ? 'text-red-500' : ''}`}>{formatTime(time)}</span>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest relative z-10">
            {isConnected ? 'Tiempo en Línea' : 'Contador Listo'}
          </p>
        </div>
        
        <div className="glass px-4 py-2 rounded-full border-accent/20 flex items-center gap-2 mt-4 shadow-sm">
          <span className="material-symbols-outlined text-accent text-sm">payments</span>
          <span className="text-xs font-bold text-accent">Gasto: ${estimatedCost.toFixed(2)} CUP</span>
        </div>
      </section>

      {/* History Section */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Historial de Sesiones</h3>
          <button 
            onClick={() => setHistory([])}
            className="text-[10px] font-black text-primary uppercase hover:text-primary/80 transition-colors"
          >
            Limpiar
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {history.length > 0 ? (
            history.map((session) => (
              <div key={session.id} className="glass dark:bg-slate-800/40 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{session.duration}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Finalizado a las {session.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 dark:text-white">${session.cost}</span>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">CUP</p>
                </div>
              </div>
            ))
          ) : (
            <div className="glass p-8 rounded-3xl border-dashed border-2 border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center opacity-70">
              <span className="material-symbols-outlined text-3xl mb-2 text-slate-300 dark:text-slate-600">query_builder</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sin sesiones previas</p>
            </div>
          )}
        </div>
      </section>

      {/* Email Widget */}
      <section className="glass p-5 rounded-3xl shadow-lg border-l-4 border-l-secondary">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Email Nauta</h4>
              <p className="text-[10px] text-slate-500 font-medium">42 mensajes nuevos</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-secondary">85% libre</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-[15%]" />
        </div>
      </section>
    </div>
  );
};

export default Nauta;
