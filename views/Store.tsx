
import React, { useState } from 'react';
import { Package } from '../types';

const Store: React.FC = () => {
  const [activeType, setActiveType] = useState<'Datos' | 'Voz' | 'SMS' | 'Combinados'>('Datos');

  const packages: Package[] = [
    { id: '1', name: 'Plan 16GB LTE', price: 950, validity: '30 días', benefits: ['8GB Todas Redes', '8GB LTE'], type: 'Datos' },
    { id: '2', name: 'Paquete Diario', price: 25, validity: '24 horas', benefits: ['200MB Navegación'], type: 'Datos' },
    { id: '3', name: 'Plan 35 Minutos', price: 110, validity: '30 días', benefits: ['Minutos Nacionales'], type: 'Voz' },
    { id: '4', name: 'Combo Básico', price: 500, validity: '30 días', benefits: ['2GB + 20 Min + 20 SMS'], type: 'Combinados' },
  ];

  const filteredPackages = packages.filter(p => p.type === activeType);

  return (
    <div className="px-6 py-8 flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-black tracking-tight">Tienda</h1>
        <p className="text-sm text-slate-500 font-medium">Compra planes y paquetes (*133#)</p>
      </header>

      {/* Tabs */}
      <div className="glass p-1 rounded-2xl flex gap-1 items-center sticky top-2 z-20">
        {['Datos', 'Voz', 'SMS', 'Combinados'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type as any)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeType === type ? 'bg-primary text-white shadow-lg' : 'text-slate-500'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Corporate Section */}
      <div className="glass p-5 rounded-3xl bg-slate-900 border-none relative overflow-hidden group shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent pointer-events-none" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold">Bolsa Corporativa</h3>
            <p className="text-slate-400 text-xs">Consulta para empresas (*111*1#)</p>
          </div>
          <button className="bg-white text-slate-900 text-[10px] font-black uppercase px-4 py-2 rounded-xl active:scale-95 transition-transform">
            Consultar
          </button>
        </div>
      </div>

      {/* Package List */}
      <div className="flex flex-col gap-4">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div key={pkg.id} className="glass p-5 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 font-bold">{pkg.validity}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">${pkg.price}</span>
                  <p className="text-[10px] text-slate-400 font-bold">CUP</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {pkg.benefits.map((benefit, idx) => (
                  <li key={idx} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white font-bold py-3 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all">
                Comprar ahora
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            No hay paquetes disponibles en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
