# 🚀 Next.js Real-Time Chat Application

A modern **full-stack real-time messaging platform** built with Next.js.
It supports real-time communication, authentication, file sharing, and scalable architecture using the latest web technologies.

---

## 🌐 Live Features

* ⚡ Real-time messaging powered by Pusher
* 🔔 Instant message notifications and alerts
* 🟢 Online / Offline user status
* 👀 Message read receipts
* 👥 One-on-one and group chats
* 📎 File & image sharing via Cloudinary CDN
* 🎨 Sleek UI with Tailwind CSS
* ✨ Smooth animations and transitions
* 📱 Fully responsive design

---

## 🔐 Authentication

* 🔑 Credential-based authentication
* 🌐 Google authentication
* 🐙 GitHub authentication
* 🔒 Secure sessions using NextAuth

---

## 🧠 Advanced Features

* 🧾 Client-side form validation using react-hook-form
* 🚨 Server error handling with toast notifications
* 🗂️ User profile customization & settings
* 💬 Chat room & channel management
* 🔄 Real-time updates across components

---

## ⚙️ Backend & Architecture

* 🛠️ RESTful route handlers (POST, GET, DELETE) using Next.js App Router
* ⚡ Direct database access in Server Components (No traditional API calls)
* 🔗 Efficient handling of Server ↔ Client component relationships
* 📡 Scalable real-time architecture

---

## 🧰 Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Next.js API Routes / Route Handlers
* **Auth:** NextAuth
* **Real-time:** Pusher
* **Database:** (Add your DB here - MongoDB / PostgreSQL / Prisma etc.)
* **File Uploads:** Cloudinary
* **Forms:** React Hook Form
* **Notifications:** React Toast

---

## 📂 Project Structure (Example)

```
/app
  /api
  /components
  /conversations
  /users
/lib
/hooks
/prisma (if using Prisma)
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/nextjs-realtime-chat-app.git
cd nextjs-realtime-chat-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### 4️⃣ Run the app

```bash
npm run dev
```

## 🧪 Future Improvements

* ✅ Message reactions (emoji support)
* ✅ Voice & video calling
* ✅ Push notifications
* ✅ Message search functionality

---
