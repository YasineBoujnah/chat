# Real-Time Chat Application

A simple, fast, and real-time chat application for 2 users, built from scratch.

## 🛠️ Tech Stack
- **Frontend:** Angular, HTML/CSS, TypeScript, STOMP.js (WebSockets)
- **Backend:** Spring Boot, Spring WebSockets, Spring Data JPA, Java 17
- **Database:** MySQL
- **Build Tools:** Gradle (Backend), npm/Angular CLI (Frontend)

## 📋 Prerequisites
- **Node.js & npm** (for the frontend)
- **Java 17+** (for the backend)
- **MySQL / XAMPP** running on port `3306`

## 🗄️ Database Setup
The application connects to MySQL via `localhost:3306`.
- **Username:** `root`
- **Password:** *(empty by default for XAMPP)*
*(You can modify these settings in `backend/src/main/resources/application.properties`)*

## 🚀 How to Run

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
