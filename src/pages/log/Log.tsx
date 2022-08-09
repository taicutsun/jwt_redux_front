import React from "react";
import "../../App.css";
import "./Log.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setUserName } from "../user/userSlice";
import { setLogF, selectLog, LogState, setLogK } from "./logSlice";
//redux imports
import { getAuthStatus } from "../../api/posts";

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

let authStatus: boolean;
function BtnSumbit(prop: { user: string; pass: string }) {
  const dispatch = useAppDispatch();
  const failed: LogState = { logged: "failed" };
  const pending: LogState = { logged: "pending" };
  const [status, setStatus] = useState(false);
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (click >= 1) {
      let data = getAuthStatus(prop.user, prop.pass);
      data.then((result) => {
        authStatus = result;
        if (authStatus === true) {
          setStatus(true);
          dispatch(setUserName(prop.user));
          dispatch(setLogK(pending));
          setClick(0);
          cl = 0;
        }
        else if (authStatus === false) {
          dispatch(setLogF(failed));
          setClick(0);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click, status]);

  if (status) {
    return <Navigate to="/posts" />;
  } else {
    return (
      <div>
        <button
          className="loginBtn"
          onClick={() => {
            //auth(prop.user,prop.pass);
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

export function LoginPage() {
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
        <BtnSumbit user={user} pass={pass} />
        <div>
          <button className="backBtn">
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
