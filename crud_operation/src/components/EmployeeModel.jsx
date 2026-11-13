import React from 'react';
import { UserPlus, Edit2, X } from 'lucide-react';

const DEPARTMENTS = ["Engineering", "Product", "Design", "Human Resources", "Marketing", "Finance"];
const ROLES_BY_DEPT = {
  "Engineering": ["Senior Full Stack Engineer", "DevOps Engineer", "Frontend Developer", "Backend Developer", "Engineering Manager"],
  "Product": ["Lead Product Manager", "Associate PM", "Product Director"],
  "Design": ["Senior UI/UX Designer", "Product Designer", "Graphic Designer"],
  "Human Resources": ["HR Business Partner", "Talent Acquisition Lead", "HR Executive"],
  "Marketing": ["Growth Marketing Lead", "Content Strategist", "SEO Specialist"],
  "Finance": ["Financial Analyst", "Accounting Manager", "Payroll Specialist"]
};

export default function EmployeeModal({ isOpen, onClose, onSubmit, isEdit, formData, setFormData, formErrors }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              {isEdit ? <Edit2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <h3 className="text-base font-bold text-white">
              {isEdit ? "Edit Employee Record" : "Add New Employee Record"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Rajesh Kumar"
              className={`w-full bg-slate-800 border ${formErrors.name ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none`}
            />
            {formErrors.name && <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email *</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="rajesh@nexushr.com"
                className={`w-full bg-slate-800 border ${formErrors.email ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none`}
              />
              {formErrors.email && <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone *</label>
              <input 
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className={`w-full bg-slate-800 border ${formErrors.phone ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none`}
              />
              {formErrors.phone && <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Department *</label>
              <select 
                value={formData.department}
                onChange={(e) => {
                  const dept = e.target.value;
                  setFormData({
                    ...formData, 
                    department: dept,
                    role: ROLES_BY_DEPT[dept]?.[0] || ""
                  });
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              >
               {DEPARTMENTS.map(dept=><option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Role *</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              >
               {(ROLES_BY_DEPT[formData.department] || []).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Salary (INR) *</label>
              <input 
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className={`w-full bg-slate-800 border ${formErrors.salary ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Join Date *</label>
              <input 
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Status *</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
              {isEdit ? "Update Changes" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}