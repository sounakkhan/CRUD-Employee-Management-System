import React from 'react';
import { Users, DollarSign, Building2, Award, TrendingUp } from 'lucide-react';

export default function StatsOverview({ employees, departmentsCount }) {
  const totalPayroll = employees.reduce((acc, curr) => acc + Number(curr.salary), 0);
  const activeCount = employees.filter(e => e.status === "Active").length;
  const avgSalary = employees.length ? Math.round(totalPayroll / employees.length) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Workforce</p>
          <h3 className="text-2xl font-bold text-white mt-1">{employees.length}</h3>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {activeCount} Active Status
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Users className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Annual Payroll</p>
          <h3 className="text-2xl font-bold text-white mt-1">₹{(totalPayroll / 100000).toFixed(2)} Lakhs</h3>
          <p className="text-xs text-slate-400 mt-1">Sum of CTC across depts</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Departments</p>
          <h3 className="text-2xl font-bold text-white mt-1">{departmentsCount}</h3>
          <p className="text-xs text-slate-400 mt-1">Core business units</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average CTC</p>
          <h3 className="text-2xl font-bold text-white mt-1">₹{(avgSalary / 100000).toFixed(2)} Lakhs</h3>
          <p className="text-xs text-slate-400 mt-1">Per employee annual average</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Award className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}