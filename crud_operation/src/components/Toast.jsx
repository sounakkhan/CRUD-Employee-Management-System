import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
export default function Toast({toast}){
    if(!toast.show) return null;
    return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-800 border border-slate-700 text-white px-5 py-3 rounded-xl shadow-2xl animate-fade-in">
      {toast.type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-400" />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );

}