import React from 'react';
import { Info, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  let calloutClass = "bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-800 dark:text-blue-300";
  let titleColorClass = "text-blue-600 dark:text-blue-400";
  let icon = <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />;
  let defaultTitle = "INFO";

  if (type === 'warning') {
    calloutClass = "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300";
    titleColorClass = "text-amber-600 dark:text-amber-500";
    icon = <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-500" />;
    defaultTitle = "WARNING";
  } else if (type === 'danger') {
    calloutClass = "bg-red-50/60 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300";
    titleColorClass = "text-red-600 dark:text-red-500";
    icon = <XCircle size={18} className="shrink-0 mt-0.5 text-red-500" />;
    defaultTitle = "DANGER";
  } else if (type === 'success') {
    calloutClass = "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300";
    titleColorClass = "text-emerald-600 dark:text-emerald-500";
    icon = <Sparkles size={18} className="shrink-0 mt-0.5 text-emerald-500" />;
    defaultTitle = "TIPS";
  }

  return (
    <div className={`callout ${calloutClass} flex items-start gap-3.5 p-4 rounded-xl border my-6 shadow-sm`}>
      {icon}
      <div className="flex-1 space-y-1">
        <div className={`text-[13.5px] font-extrabold tracking-tight uppercase ${titleColorClass}`}>
          {title || defaultTitle}
        </div>
        <div className="text-[13.5px] leading-relaxed text-slate-600 dark:text-zinc-400 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}
