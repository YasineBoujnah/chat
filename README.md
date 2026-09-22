# Real-Time Chat Application

A simple, fast, and real-time chat application for 2 users, built from scratch.

## 🛠️ Tech Stack
- **Frontend:** Angular, HTML/CSS, TypeScript, STOMP.js (WebSockets)
- **Backend:** Spring Boot, Spring WebSockets, Spring Data JPA, Java 17
- **Database:** MySQL
- **Build Tools:** Gradle (Backend), npm/Angular CLI (Frontend)

## ☁️ Cloud Deployment Configuration

This backend is pre-configured to be deployed easily using environment variables.

When deploying the backend (e.g., on Render or Heroku), make sure to configure the following environment variables:
- `DB_URL`: The full JDBC url string (e.g., `jdbc:mysql://host:port/dbname?sslMode=REQUIRED`)
- `DB_USER`: Your cloud database username
- `DB_PASS`: Your cloud database password

For the frontend, the app defaults to `localhost`. When deploying to Vercel/Netlify, update the `BACKEND_URL` in `chat.service.ts` to your production backend URL.

## 🗄️ Local Database Setup
The application connects to MySQL via `localhost:3306` by default.
- **Username:** `root`
- **Password:** *(empty by default for XAMPP)*

*(Settings are located in `backend/src/main/resources/application.properties`)*

## 🚀 How to Run Locally

### 1. Start the Backend (Spring Boot)
Open a terminal and run:
```bash
cd backend
.\gradlew bootRun
```
*(The backend runs on http://localhost:8080)*

### 2. Start the Frontend (Angular)
Open a second terminal and run:
```bash
cd frontend
npm install
npm start
```
*(The frontend runs on http://localhost:4200)*

## 💬 Usage
1. Open up `http://localhost:4200` in **two different browser tabs/windows**.
2. Enter a nickname (e.g., "User A") in the first window and click **Join Chat**.
3. Enter a different nickname in the second window and join.
4. Messages will appear in real-time across both screens!
