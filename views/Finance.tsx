
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Transaction } from '../types';

const dataArea = [
  { name: '1 Oct', balance: 1200 },
  { name: '7 Oct', balance: 1400 },
  { name: '14 Oct', balance: 1100 },
  { name: '21 Oct', balance: 1500 },
  { name: '28 Oct', balance: 1250 },
];

const dataPie = [
  { name: 'Recargas', value: 400, color: '#135bec' },
  { name: 'Planes', value: 300, color: '#8b5cf6' },
  { name: 'Llamadas', value: 200, color: '#10b981' },
];

const transactions: Transaction[] = [
  { id: '1', title: 'Paquete 16GB LTE', amount: -950, date: 'Hoy', type: 'expense', category: 'Datos' },
  { id: '2', title: 'Recarga Internacional', amount: 2500, date: 'Ayer', type: 'income', category: 'Recarga' },
  { id: '3', title: 'Llamada a Mamá', amount: -15, date: '25 Oct', type: 'expense', category: 'Llamada' },
];

const Finance: React.FC = () => {
  return (
    <div className="px-6 py-8 flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-black tracking-tight">Finanzas</h1>
        <p className="text-sm text-slate-500 font-medium">Tu historial de consumo y recargas</p>
      </header>

      {/* Main Area Chart */}
      <section className="glass p-5 rounded-3xl shadow-lg">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Balance Histórico</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataArea}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#135bec" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#135bec" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#135bec', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#135bec" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Breakdown Donut */}
      <section className="glass p-6 rounded-3xl flex items-center justify-between">
        <div className="w-1/2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          {dataPie.map(item => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</span>
              </div>
              <span className="text-xs font-black">${item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Leak Alert Widget */}
      <section className="p-5 rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600">
          <span className="material-symbols-outlined">warning</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-900 dark:text-red-400">Consumo Inusual</h4>
          <p className="text-[10px] text-red-700 dark:text-red-500 font-medium">Se detectó una fuga de saldo ayer de $45.00 CUP en Datos.</p>
        </div>
      </section>

      {/* Transaction History */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Transacciones</h3>
          <button className="text-primary text-[10px] font-black uppercase">Ver todas</button>
        </div>
        <div className="flex flex-col gap-3">
          {transactions.map(t => (
            <div key={t.id} className="glass p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  t.type === 'income' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="material-symbols-outlined">
                    {t.category === 'Llamada' ? 'call' : t.category === 'Datos' ? 'lte_mobiledata' : 'payments'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold">{t.title}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{t.date}</p>
                </div>
              </div>
              <span className={`text-sm font-black ${t.type === 'income' ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                {t.type === 'income' ? '+' : ''}${Math.abs(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Finance;
