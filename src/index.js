// 1. firebase.js - Firebase холболтын тохиргоо
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBTXoXXcOd4jUptM8NaBs3PyicDE5sRe14",
  authDomain: "setgelzvi-app.firebaseapp.com",
  projectId: "setgelzvi-app",
  storageBucket: "setgelzvi-app.firebasestorage.app",
  messagingSenderId: "1013197411252",
  appId: "1:1013197411252:web:d1cd7e52bf859cc70458e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// 2. Register component
export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Амжилттай бүртгэгдлээ!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <h2>Бүртгүүлэх</h2>
      <input type="email" placeholder="Имэйл" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Нууц үг" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Бүртгүүлэх</button>
    </form>
  );
}

// 3. Login component
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Амжилттай нэвтэрлээ!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Нэвтрэх</h2>
      <input type="email" placeholder="Имэйл" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Нууц үг" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Нэвтрэх</button>
    </form>
  );
}

// 4. Dashboard component
export function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h1>Та амжилттай нэвтэрсэн байна</h1>
      <button onClick={handleLogout}>Гарах</button>
    </div>
  );
}

// 5. App.jsx setup
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
