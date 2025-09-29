# 🤖 Robotics Lab Inventory System (Thesis Project)
### A User-Centred, Production-Ready Web Application

A full-stack **MERN stack** application developed as my **Bachelor’s thesis** for the University of Oulu’s Robotics Lab.  
This system helps lab staff manage equipment inventory with **real-time tracking, secure access, and intuitive item management** through a modern web interface.


[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/TurunenP/Updated-Inventory/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Frontend](https://img.shields.io/badge/frontend-Vite_+_React-blue)](https://updated-inventory.vercel.app)
[![Backend](https://img.shields.io/badge/backend-Express_+_MongoDB-green)](https://updated-inventory-hrhg.onrender.com)

---

## 📚 Table of Contents

- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Features](#️-features)
- [Registration Instructions](#-registration-instructions)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Clone the repository](#1-clone-the-repository)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
- [Deployment Instructions](#-deployment-instructions)
- [CORS Configuration](#-cors-configuration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)


---
## 🚀 Live Demo

- **Frontend**: [https://updated-inventory.vercel.app](https://updated-inventory.vercel.app)
- **Backend API**: [https://updated-inventory-hrhg.onrender.com](https://updated-inventory-hrhg.onrender.com)

---

## 📸 Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/f4d00185-c8a6-4892-9366-5547e42b8f93)

---

## 🛠️ Tech Stack

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Framework-Express-lightgrey?logo=express)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)  

### Hosting
[![Frontend: Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)  
[![Backend: Vercel](https://img.shields.io/badge/Backend-Vercel-black?logo=vercel)](https://vercel.com/)


| Layer        | Technology           |
|---------------|------------------------|
| Frontend      | [React.js](https://react.dev/), [Tailwindcss](https://tailwindcss.com/) |
| Backend       | [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/) |
| Database      | [MongoDB](https://www.mongodb.com/) |
| Hosting       | [Vercel](https://vercel.com/docs) |

---


## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | [React.js](https://react.dev/) ![React](https://img.shields.io/badge/React-blue?logo=react), [TailwindCSS](https://tailwindcss.com/) ![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css) |
| Backend      | [Node.js](https://nodejs.org/) ![Node](https://img.shields.io/badge/Node.js-green?logo=node.js), [Express](https://expressjs.com/) ![Express](https://img.shields.io/badge/Express-lightgrey?logo=express) |
| Database     | [MongoDB](https://www.mongodb.com/) ![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb) |
| Hosting      | [Vercel](https://vercel.com/) ![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel) |


---

### More Screenshots

| Admin Add Item | Explore Labs |
|---------------|--------------|
| <img width="600" alt="Admin Add Item" src="https://github.com/user-attachments/assets/08c4eec6-aa24-4ea2-bc02-0ce87cd7f75a" /> | <img width="600" alt="Explore Labs" src="https://github.com/user-attachments/assets/c8a76a41-8472-4aad-8df3-78aedc0ec2a9" /> |


## ⚙️ Features

- 🔐 **Authentication** using JWT with cookie-based sessions
- 📦 **CRUD** operations for managing inventory items
- 🧮 **Quantity tracking**, item metadata, and timestamps
- ⚡ **Vite-powered frontend** with Tailwind CSS for rapid load and responsiveness
- 🌐 **RESTful API** with Express and MongoDB Atlas
- 🛡️ CORS and environment-based config for flexible deployment

---

## 🔐 Registration Instructions

- When registering as a **staff member (admin)**, your email must end with `@university.edu`.
- Users without an email in this format will be registered as **students** (with limited access).
- This is used to restrict access to administrative features like inventory management or approvals.

### 👥 Sample Login Credentials

Use the following accounts for testing:

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Staff   | Uniad@university.edu   | Uniad1    |
| Student | test@gmail.com         | 123456  |

> You can add your own users directly in the database if needed.


## 📦 Prerequisites

Ensure the following are installed globally:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

Optional for development/testing:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB setup)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/TurunenP/Updated-Inventory.git
cd Updated-Inventory
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 🔧 Environment Variables (`/backend/.env`)

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

> The backend will be running at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend1
npm install
```

#### 🔧 Environment Variables (`/frontend1/.env`)

Create a `.env` file in the `frontend1/` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

> The frontend will be available at `http://localhost:5173`

---

## 🌍 Deployment Instructions

### 🚀 Backend (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Set:

   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Add environment variables:

   * `MONGO_URI`
   * `JWT_SECRET`
4. Deploy and obtain your API URL (e.g., `https://your-updated-inventory.onrender.com`)

---

### 🚀 Frontend (Vercel)

1. Import your GitHub repository into [Vercel](https://vercel.com)
2. Configure:

   * **Root Directory**: `frontend1`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Set environment variable:

```env
VITE_BACKEND_URL=https://your-updated-inventory.onrender.com
```

4. Deploy and access your hosted frontend URL.

---

## 🔧 CORS Configuration

In your backend `index.js` or `server.js`, configure CORS to allow both development and production origins:

```js
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://your-updated-inventory.vercel.app"
  ],
  credentials: true,
}));
```

---

## 📁 Project Structure

```
Updated-Inventory/
├── backend/         # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend1/       # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── API/Api.js
│   └── vite.config.js
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

   * `Fork the repository`
   * `Create a new branch: git checkout -b feature-name` 
   * `Commit your changes: git commit -m "feat: add awesome feature"`
   * `Push to your branch: git push origin feature-name` 
   * `Open a pull request describing your changes`
   * `Or open an issue to discuss ideas before implementing`     


Developed by:

* [@TurunenP](https://github.com/TurunenP)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

```
