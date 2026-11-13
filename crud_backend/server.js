const express= require('express');
const cors= require('cors');
const mysql=require('mysql2/promise');
require('dotenv').config();
const app=express();
const PORT= process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());
// MySQL Connection Pool Configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'khan@2001', 
  database: 'nexushr_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
//test db connection
(async()=>{
    try{
        const connection=await pool.getConnection();
        console.log(" Connected successfully to MySQL Database!");
        connection.release();
    }catch(error){
        console.error("❌ Database connection failed:", error.message);
    }
})();
//CRUD operation

//GET
app.get('/api/employees',async(req,res)=>{
    try{
        const[rows]=await pool.query('SELECT * FROM employees ORDER BY joinDate DESC');
        res.status(200).json({ success: true, data: rows });
    }
    catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server error fetching employee records" });
  }
});

//POST
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, phone, department, role, salary, joinDate, status } = req.body;
    
    // Server-side input validation
    if (!name || !email || !role || !salary) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, email, role, and salary are mandatory." 
      });
    }

    const id = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const avatar = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150&auto=format&fit=crop&q=80`;

    const query = `
      INSERT INTO employees (id, name, email, phone, department, role, salary, joinDate, status, avatar) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query(query, [
      id, 
      name, 
      email, 
      phone || '+91 98000 00000', 
      department || 'Engineering', 
      role, 
      Number(salary), 
      joinDate || new Date().toISOString().split('T')[0], 
      status || 'Active', 
      avatar
    ]);

    const newEmployee = { id, name, email, phone, department, role, salary: Number(salary), joinDate, status, avatar };
    res.status(201).json({ success: true, data: newEmployee, message: "Employee created successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ success: false, message: "Database error. Email address may already exist." });
  }
});
//PUT
app.put('/api/employees/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const{name, email, phone, department, role, salary, joinDate, status}=req.body;
        const query = `
      UPDATE employees 
      SET name = COALESCE(?, name), 
          email = COALESCE(?, email), 
          phone = COALESCE(?, phone), 
          department = COALESCE(?, department), 
          role = COALESCE(?, role), 
          salary = COALESCE(?, salary), 
          joinDate = COALESCE(?, joinDate), 
          status = COALESCE(?, status)
      WHERE id = ?
    `;
    const[result]=await pool.query(query,[
      name, email, phone, department, role, salary ? Number(salary) : null, joinDate, status, id
    ]);
    if(result.affectedRows===0){
        return res.status(400).json({success: false, message: "Employee record not found"});
    }
    const [updatedRows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    res.status(200).json({ success: true, data: updatedRows[0], message: "Employee updated successfully" });
    }catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: "Server error updating employee record" });
  }
});

//DELETE
app.delete('/api/employees/:id',async(req,res)=>{
    try{
 const{id}=req.params;
    const[result]=await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Employee record not found" });
    }

    res.status(200).json({ success: true, message: "Employee deleted successfully" });
    }catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, message: "Server error deleting employee record" });
  }
   
});
  
app.listen(PORT,()=>{
    console.log(` NexusHR Backend Server running on http://localhost:${PORT}`);
});