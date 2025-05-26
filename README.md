# 💻 Computer Center Management System

A robust and user-friendly management system designed for efficiently operating a computer center. This system handles user registrations, session management, system bookings, usage tracking, and more — all from a centralized dashboard.

![Tech Stack](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square)
![Framework](https://img.shields.io/badge/Web%20Framework-Express.js-yellow?style=flat-square)
![License](https://img.shields.io/github/license/Mainak908/Computer-Institute)

---

## 🧩 Features

- 👤 **User Authentication & Role Management**
- 🖥️ **System Allocation & Booking**
- 🕐 **Time Tracking & Billing**
- 📊 **Admin Dashboard with Reports**
- 📝 **Real-Time Session Monitoring**
- 📅 **Daily Usage Logs & History**
- 📩 **Email Notifications for Bookings and Alerts**

---

## 🚀 Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| **Frontend** |  Next.js  |
| **Backend**  | Node.js, Express.js  |
| **Database** | PostgreSQL ,Redis |
| **Auth**     | JWT + Bcrypt         |
| **ORM**      | Prisma     |
| **UI Kit**   | TailwindCSS  |
| **Notifications** | Resend        |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Mainak908/Computer-Institute.git
cd Computer-Institute

# Install backend dependencies
npm install
# build Prisma Client
npx prisma generate
# Setup environment variables
cp .env.example .env
# Fill in DB credentials, JWT secrets, etc.

# Run the server
npm run dev
