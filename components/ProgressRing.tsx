
import React from 'react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  color: string;
  icon: string;
  label: string;
  value: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ radius, stroke, progress, color, icon, label, value }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-200 dark:text-slate-800"
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[20px]" style={{ color }}>{icon}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold leading-tight">{value}</p>
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default ProgressRing;
