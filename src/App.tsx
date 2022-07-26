import React from "react";
import "./App.css";
import { UserMenu, CreateUser } from "./features/user/User";
import { LoginMenu } from "./features/log/Log";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginMenu />} />
        <Route path="create" element={<CreateUser />} />
        <Route path="posts" element={<UserMenu />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div id="homeWrap">
      <main>
        <h2>Добро пожаловать на начальную страницу!</h2>
      </main>
      <nav>
        <button className="homeButt">
          <Link className="Link" to="/login">
            Войти
          </Link>
        </button>
        <button className="homeButt">
          <Link className="Link" to="/create">
            Создать пользователя
          </Link>
        </button>
      </nav>
    </div>
  );
}

export default App;
