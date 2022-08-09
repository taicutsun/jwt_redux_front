import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

interface UserState {
  username: string;
  password: string;
}

export interface CheckUserPass {
  username: string;
  password: string;
  secPass: string;
}

const initialState: UserState = {
  username: "",
  password: "",
};

function axSendU(newuser: string, newpass: string): void {
  axios
    .post("http://localhost:3001/create", {
      username: newuser,
      password: newpass,
    })
    .then((res) => {
      console.log(res.data);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
      //else if(state.password===''){console.log('no itd 0');};
    },
  },
});

export const { createUser, setUserName } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.username;

export default userSlice.reducer;
