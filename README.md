# NexusHR — Employee Management System

A full-stack CRUD application for managing employee records, built with **React (Vite)**, **Tailwind CSS v4**, **Node.js**, **Express**, and **MySQL**.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React
- **Backend:** Node.js, Express, CORS, MySQL2 (`mysql2/promise`), dotenv
- **Database:** MySQL (`nexushr_db` database, `employees` table)

## Prerequisites
- **Node.js** (v18+ / v24 recommended) and **npm**
- **MySQL Server** and **MySQL Workbench**

---

## 1. Database Setup
1. Start your local MySQL server and open **MySQL Workbench** (or your terminal).
2. Ensure the database `nexushr_db` and the `employees` table exist. You can run your schema script if you have one:
   ```bash
   mysql -u root -pkhan@2001 nexushr_db < database/schema.sql
