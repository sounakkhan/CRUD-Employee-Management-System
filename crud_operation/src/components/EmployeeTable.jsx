import React from 'react';
import { 
  Search, Filter, Edit2, Trash2, X, Building2, 
  Calendar, Mail, ChevronDown, ChevronUp, AlertCircle, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function EmployeeTable({
  employees,
  searchTerm,
  setSearchTerm,
  selectedDept,
  setSelectedDept,
  selectedStatus,
  setSelectedStatus,
  sortField,
  sortDirection,
  handleSort,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedEmployees,
  departmentsList,
  onOpenEdit,
  onOpenDelete
}) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      
      {/* SEARCH & FILTERS BAR */}
      <div className="p-5 border-b border-slate-700/60 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name, email, role..."
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/80 px-3 py-2 rounded-xl">
            <Building2 className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedDept}
              onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              {departmentsList.map(dept => (
                <option key={dept} value={dept} className="bg-slate-900">{dept} Dept</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/80 px-3 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              <option value="Active" className="bg-slate-900">Active</option>
              <option value="On Leave" className="bg-slate-900">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700/60 bg-slate-900/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th onClick={() => handleSort('name')} className="py-4 px-6 cursor-pointer hover:text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span>Employee Details</span>
                  {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th onClick={() => handleSort('department')} className="py-4 px-4 cursor-pointer hover:text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span>Department & Role</span>
                  {sortField === 'department' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th onClick={() => handleSort('salary')} className="py-4 px-4 cursor-pointer hover:text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span>Annual CTC</span>
                  {sortField === 'salary' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th onClick={() => handleSort('joinDate')} className="py-4 px-4 cursor-pointer hover:text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span>Join Date</span>
                  {sortField === 'joinDate' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40 text-sm">
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {emp.name}
                          <span className="text-[10px] font-mono bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400">{emp.id}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" /> {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-200">{emp.role}</div>
                    <div className="text-xs text-indigo-400 font-medium mt-0.5">{emp.department}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-emerald-400">
                    ₹{(emp.salary).toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 text-slate-300 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {emp.joinDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      emp.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onOpenEdit(emp)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onOpenDelete(emp)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-400">
                  No employee records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="p-4 border-t border-slate-700/60 bg-slate-900/40 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}