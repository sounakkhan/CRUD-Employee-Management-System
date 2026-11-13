const API_BASE_URL = "http://localhost:5000/api";

export const fetchEmployeesAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/employees`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

export const createEmployeeAPI = async (employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

export const updateEmployeeAPI = async (id, employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

export const deleteEmployeeAPI = async (id) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE'
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return true;
};