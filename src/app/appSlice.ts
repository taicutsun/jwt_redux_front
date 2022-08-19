import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { axSendU } from "../api/posts";

//interface and state
export interface CheckUserPass {
  username: string;
  password: string;
  secPass: string;
}

export interface UserState {
  username: string;
  password: string;
  logged: "failed" | "pending";
}

const initialState: UserState = {
  username: "",
  password: "",
  logged: "pending",
};
//interface and state

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //login
    setLogF(state, action: PayloadAction<UserState>) {
      state.logged = action.payload.logged;
    },
    setLogT(state, action: PayloadAction<UserState>) {
      state.logged = action.payload.logged;
    },
    //createuser
    setUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    createUser: (
      state: UserState,
      action: PayloadAction<CheckUserPass>
    ): void => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      if (state.password === action.payload.secPass && state.password !== "") {
        axSendU(state.username, state.password);
      }
    }
  },
});

export const { setLogF, setLogT,setUserName,createUser } = appSlice.actions;

export const selectLog = (state: RootState) => state.app;//if logged
export const selectUserName = (state: RootState) => state.app.username;//users name
export const selectUserPass = (state: RootState) => state.app.password;//users password

export default appSlice.reducer;
