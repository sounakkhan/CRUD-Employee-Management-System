import React, { useState, useEffect, useMemo } from 'react';
import { 
  fetchEmployeesAPI, 
  createEmployeeAPI, 
  updateEmployeeAPI, 
  deleteEmployeeAPI 
} from './services/api';




import DeleteModal from './components/DeleteModel';
import Navbar from './components/Navbar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModel';
import Toast from './components/Toast';
import StatsOverview from './components/StatsOverview';

const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Human Resources", "Marketing", "Finance"];

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals & Forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", department: "Engineering",
    role: "Senior Full Stack Engineer", salary: "", joinDate: new Date().toISOString().split('T')[0], status: "Active"
  });
  const [formErrors, setFormErrors] = useState({});

  // Load initial data from Backend REST API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployeesAPI();
      setEmployees(data);
    } catch (error) {
      showToast("Failed to connect to backend server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required";
    if (!formData.phone.trim()) errors.phone = "Required";
    if (!formData.salary || Number(formData.salary) <= 0) errors.salary = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // CREATE
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const newEmp = await createEmployeeAPI(formData);
      setEmployees([newEmp, ...employees]);
      setIsAddModalOpen(false);
      resetForm();
      showToast("Employee added successfully!");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const updated = await updateEmployeeAPI(currentEmployee.id, formData);
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? updated : emp));
      setIsEditModalOpen(false);
      setCurrentEmployee(null);
      resetForm();
      showToast("Employee updated successfully!");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // DELETE
  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployeeAPI(currentEmployee.id);
      setEmployees(employees.filter(emp => emp.id !== currentEmployee.id));
      setIsDeleteModalOpen(false);
      setCurrentEmployee(null);
      showToast("Employee deleted successfully.");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", email: "", phone: "", department: "Engineering",
      role: "Senior Full Stack Engineer", salary: "", joinDate: new Date().toISOString().split('T')[0], status: "Active"
    });
    setFormErrors({});
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "All" || emp.department === selectedDept;
      const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
      return matchesSearch && matchesDept && matchesStatus;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [employees, searchTerm, selectedDept, selectedStatus, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage]);

  const exportCSV = () => {
    const headers = ["ID,Name,Email,Phone,Department,Role,Salary,JoinDate,Status"];
    const rows = filteredEmployees.map(e => `${e.id},"${e.name}",${e.email},${e.phone},${e.department},"${e.role}",${e.salary},${e.joinDate},${e.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `employees_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV exported successfully!");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="animate-pulse text-sm font-medium">Connecting to Node.js & MySQL database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Toast toast={toast} />
      
      <Navbar
        onOpenAddModal={() => { resetForm(); setIsAddModalOpen(true); }} 
        onExportCSV={exportCSV} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <StatsOverview employees={employees} departmentsCount={DEPARTMENTS.length - 1} />

        <EmployeeTable
          employees={employees}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          paginatedEmployees={paginatedEmployees}
          departmentsList={DEPARTMENTS}
          onOpenEdit={(emp) => {
            setCurrentEmployee(emp);
            setFormData({ ...emp });
            setIsEditModalOpen(true);
          }}
          onOpenDelete={(emp) => {
            setCurrentEmployee(emp);
            setIsDeleteModalOpen(true);
          }}
        />
      </main>

      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isEdit={false}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
      />

      <EmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        isEdit={true}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
      />
<DeleteModal
isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        employeeName={currentEmployee?.name}/>
      
    </div>
  );
}