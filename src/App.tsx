import React from "react";
import "./App.css";
import { UserPage, CreateUser } from "./pages/user/User";
import { LoginPage } from "./pages/log/Log";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<CreateUser />} />
        <Route path="posts" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
