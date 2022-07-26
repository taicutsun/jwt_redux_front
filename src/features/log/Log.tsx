import React from "react";
import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { tokens } from "../user/User";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setUserName } from "../user/userSlice";
import { setLogF, selectLog, LogState, setLogK } from "./logSlice";
//redux imports

let cl: number = 0; //for click

function LogMass() {
  const log = useAppSelector(selectLog);
  if (log.logged === "failed" && cl >= 1) {
    return (
      <>
        <div className="errorMass">Пароль или Имя неверно</div>
      </>
    );
  } else return <></>;
}

function LoginButt(prop: { user: string; pass: string }) {
  const dispatch = useAppDispatch();
  const failed: LogState = { logged: "failed" };
  const pending: LogState = { logged: "pending" };
  const [status, setStatus] = useState(false);
  const [click, setClick] = useState(0);
  useEffect(() => {
    if (click >= 1) {
      axios
        .post("http://localhost:3001/login", {
          username: prop.user,
          password: prop.pass,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === true) {
            setStatus(true);
            dispatch(setUserName(prop.user));
            dispatch(setLogK(pending));
            tokens.accessToken = res.data.accessToken;
            tokens.refreshToken = res.data.refreshToken;
            setClick(0);
            cl = 0;
          } else if (res.data.status === false) {
            dispatch(setLogF(failed));
            setClick(0);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log("why");
          } else if (err.request) {
            console.log("req");
          } else {
            console.log("me");
          }
        });
    }
  });
  if (status) {
    return <Navigate to="/posts" />;
  } else {
    return (
      <div>
        <button
          className="loginButt"
          onClick={() => {
            setClick(click + 1);
            cl++;
          }}
        >
          Войти
        </button>
        <LogMass />
      </div>
    );
  }
}

export function LoginMenu() {
  const [user, setUsername] = useState("");
  const [pass, setPass] = useState("");
  cl = 0;
  return (
    <>
      <div id="mainWrap">
        <div className="greating">Вход</div>
        <form>
          <label>Имя</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>пароль</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </form>
        <LoginButt user={user} pass={pass} />
        <div>
          <button className="backButt">
            <Link className="Link" to="/">
              Назад
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

//for log
