# Sidetool Task Manager 🧰 ✅

A simple task manager app built with Angular (frontend) and NestJS (backend). It allows you to create, update, delete, and mark tasks as favorite.

🌐 **Live Demo**: [https://sidetool-task-manager.onrender.com](https://sidetool-task-manager.onrender.com)

---

## 🧩 Technologies

- **Frontend**: Angular 19 + TailwindCSS
- **Backend**: NestJS + Supabase
- **Deployment**: Render

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sidetool-task-manager.git
cd sidetool-task-manager
```

### 1. Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


⚙️ Environment Configuration
To run the app locally, make sure your frontend uses the local API URL:

Edit: frontend/src/environments/environment.ts

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```
To run the app locally, make sure to update your .env variable in server: 

SUPABASE_URL=...
SUPABASE_KEY=...
FRONTEND_URL=...


# Frontend (Angular)
cd frontend
npm run start

# Backend (NestJS)
cd ../backend
npm run start:dev

📄 License
This project is not licensed. You may use it freely for learning or personal experimentation.
