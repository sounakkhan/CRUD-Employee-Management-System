import React from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, employeeName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Delete Employee Record</h3>
          <p className="text-sm text-slate-400 mt-2">
            Are you sure you want to remove <span className="font-semibold text-white">{employeeName}</span> from the database?
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-xl shadow-lg shadow-rose-600/30">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}