# NovaCraft ✨ — Boutique MERN Stack E-Commerce Platform

NovaCraft is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform built with a **Soft Light Glassmorphism UI**, JWT Bearer Token Authentication, Protected Route Gating, and a Dedicated Admin Control Panel.

---

## 🌟 Key Features

- **Soft Light Glassmorphism UI**: High-contrast, clean light glass aesthetics (`background: #f8fafc`), frosted white translucent glass panels (`backdrop-filter: blur(16px)`), deep slate typography (`#0f172a`), and electric violet (`#6366f1`) accents.
- **Authentication & Protected Gated Routing**:
  - Gated Storefront: Unauthenticated visitors are routed to the **Sign Up / Sign In** auth page first.
  - Email Collision Detection: Triggers notification if email exists and auto-redirects to Sign In.
  - JWT Bearer Authorization stored securely in session.
- **Dedicated Admin Control Panel**:
  - Store Analytics Metric Cards (Total Revenue $, Total Orders, Active Product Inventory, Registered Accounts).
  - Product Inventory Management (Add new product modal, edit product details, delete from MongoDB).
  - Customer Order Delivery Tracking (Payment status pills, "Mark Delivered" button).
  - User Accounts Management (Role badges, account management).
  - Header Switcher: Toggle between `🛡️ Admin Dashboard` and `🛒 Storefront View`.
- **Interactive Product Details Modal**:
  - Clickable product cards opening full product information, specifications grid, ratings (`4.8 ★★★★★`), stock availability (`🟢 In Stock`), quantity selector, and instant **Buy Now** / **Add to Cart** controls.
- **Full MongoDB Database Seeder**: Includes CLI script to seed sample products and demo accounts.

---

## 🛠️ Technology Stack

| Component | Technologies Used |
|---|---|
| **Frontend** | React 18, Vite, Lucide React Icons, Custom Vanilla Soft Light Glass CSS |
| **Backend** | Node.js, Express.js, Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, CORS |
| **Database** | MongoDB / MongoDB Atlas |

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **MongoDB** (Local or MongoDB Atlas Cluster) installed.

### 2. Installation & Configuration
Clone the repository and install root dependencies:

```bash
# Clone repository
git clone https://github.com/your-username/my-ecommerce-store.git
cd my-ecommerce-store

# Install Frontend & Root dependencies
npm install

# Install Backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/novacraft
JWT_SECRET=novacraft_secret_jwt_key_2026
```

### 4. Seed MongoDB Database
Populate initial products and demo accounts:

```bash
# Import seed data into MongoDB
node backend/seeder.js

# Or destroy seed data
node backend/seeder.js -d
```

### 5. Running the Application

Start the Express backend server:
```bash
node server.js
# Backend runs on http://localhost:5000
```

In a second terminal, start the Vite frontend dev server:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔑 Demo Login Credentials

| User Type | Email | Password | Role |
|---|---|---|---|
| **Store Admin** | `admin@example.com` | `password123` | Full Admin Access & Control Panel |
| **Customer User** | `john@example.com` | `password123` | Customer Storefront Access |

---

## 📦 Deployment Guide

### Deploy Backend (Render / Railway / Heroku / Cyclic)
1. Set Environment Variables in your hosting service dashboard:
   - `MONGO_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: A secure secret key string
   - `NODE_ENV`: `production`
2. Set Build Command: `npm install`
3. Set Start Command: `node server.js`

### Deploy Frontend (Vercel / Netlify)
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Set Build Output Directory: `dist`
3. Set Environment Variable or API Proxy:
   - Configure `/api` requests to point to your deployed backend URL.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
