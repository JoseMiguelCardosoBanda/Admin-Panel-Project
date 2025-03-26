import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ThemeHand } from "./context/ThemeContext";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const { theme, setTheme } = ThemeHand();

  return (
    <div
      className={
        !theme
          ? "min-vh-100 bg-light text-dark"
          : "min-vh-100 bg-dark text-white"
      }
    >
      <Router>
        <section>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
