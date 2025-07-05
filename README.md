# MERN Quiz & Flashcards App 🎯

### ⚙️ Built with:
![MongoDB](https://img.shields.io/badge/-MongoDB-green?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![React](https://img.shields.io/badge/-React-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/-Node.js-green?style=flat-square&logo=node.js)
![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square&logo=javascript)
![Vite](https://img.shields.io/badge/-Vite-purple?style=flat-square&logo=vite)
![Axios](https://img.shields.io/badge/-Axios-lightgrey?style=flat-square&logo=axios)
![ESLint](https://img.shields.io/badge/-ESLint-blueviolet?style=flat-square&logo=eslint)
![bcrypt](https://img.shields.io/badge/-bcrypt-orange?style=flat-square)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Demo Images](#-demo-images)
  - [User Interface](-user-interface)
  - [Admin Dashboard](-admin-dashboard)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#author)

---

## 📖 Overview

**MERN Quiz & Flashcards App** is a full-stack quiz and flashcards learning platform built with the **MERN** stack and **Vite** for modern development. It combines a **React** frontend with a **Node.js + Express** backend, integrated with **MongoDB** for data storage.

The app supports **regular users** and an **admin role**, secured with **JWT authentication** and **bcrypt** for password hashing. This platform provides an engaging educational experience with progress tracking, competitive leaderboards, and comprehensive quiz management.

---

## ✨ Features

This project empowers developers to rapidly build, customize, and extend quiz-based applications. Key features include:

### 🎓 Learning & Assessment
- **🎯 Multiple Quiz Topics** — Users can choose from various topics and take quizzes to test their knowledge
- **🧩 Flashcards Mode** — Flip between questions and answers for self-paced learning
- **📝 Quiz Reports & Review** — Users can review their past quiz attempts and see what they got right or wrong
- **📊 Progress Tracking** — Monitor learning journey and performance metrics

### 🏆 Competition & Engagement
- **📈 Leaderboard** — Track top scorers by topic or globally for friendly competition
- **🎖️ Score Tracking** — Detailed performance analytics and achievement system
- **⏱️ Timed Quizzes** — Challenge yourself with time-based assessments

### 🔐 Security & Authentication
- **🛡️ Secure Authentication** — User credentials are securely hashed with bcrypt and sessions are managed via JWT tokens
- **🔒 Protected Routes** — Role-based access control for users and admins
- **👤 User Management** — Secure user registration and profile management

### 🛠️ Admin Dashboard
**🛡️ Admin Dashboard** — Admins can:
- **👥 Manage Users** — View, edit, and delete user accounts
- **📚 Create & Edit Content** — Add, update, or delete quizzes and flashcards
- **🏷️ Topic Management** — Create and manage quiz categories
- **📊 Report Management** — View and manage all user quiz reports
- **📈 Analytics** — Monitor platform usage and user engagement

---

## 🚀 Getting Started

### 🛠️ Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)  
- **MongoDB** (v4 or higher)
- **Git** for version control

---

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/tejwani-rahul/mern-quiz-flashcards-app.git
cd mern-quiz-flashcards-app
```

### 2. Install Backend Dependencies
```bash 
cd Server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Set up environment variables

**Backend** - Create a `.env` file in the `Server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your-secret-key-here
PORT=5000
```

**Frontend** - Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

### Running the Application

### 1. Start the Backend Server:
```bash
cd Server
npm start
```

### 2. Start the Frontend Development Server (in a new terminal):
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173` (Vite default)
- **Backend API**: `http://localhost:5000`

---

## 📸 Demo Images

### 🧑‍💻 User Interface

#### Log In
![Log In](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/Login.PNG)

#### Home Page
![Home Page](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/user-home.PNG)

#### Quiz Page
![Quiz Page](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/quiz-page.PNG)

#### Quiz Review
![Quiz Review Page](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/quiz-review.PNG)

#### Flashcards
![Flashcards](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/flashcards.PNG)

#### Report Page
![Report Page](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/reports.PNG)

#### Leaderboard
![Leaderboard](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/leaderboard.PNG)

### 🛡️ Admin Dashboard

#### Manage Users
![Manage Users](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/admin-manageUsers.PNG)

#### Manage Topics
![Manage Topics](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/admin-manageTopics.PNG)

#### Manage Quiz (Update/Create)
![Manage Quiz](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/admin-editQuiz.PNG)

#### Manage Flashcards (Update/Create)
![Manage Flashcards](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/admin-editFlashcards.PNG)

#### Manage Reports
![Manage Reports](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/blob/main/quiz-flashcards-demo-images/admin-allReports.PNG)

---


## 🎯 Usage

1. **Register/Login** - Create an account or log in to access the platform
2. **Choose Topic** - Select from available quiz categories
3. **Take Quiz** - Answer questions and get immediate feedback
4. **Study Flashcards** - Review flashcards for better retention
5. **Track Progress** - Monitor your performance in the reports section
6. **Compete** - Check your ranking on the leaderboard
7. **Admin Features** - Manage content and users (admin only)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the MERN stack community for excellent documentation
- Inspiration from modern e-learning platforms
- Contributors who help improve this project
- Open source libraries that make this project possible

---

## 🐛 Issues & Support

If you encounter any issues or have questions, please:

1. Check existing [issues](https://github.com/tejwani-rahul/mern-quiz-flashcards-app/issues)
2. Create a new issue if needed
3. Provide detailed information about the problem
4. Include screenshots if applicable

---

## 📞 Contact

For questions or collaboration opportunities, feel free to reach out!

**Rahul Tejwani**  
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/tejwani-rahul)

---

**Happy Learning! 🎓✨**
