import { configureStore } from "@reduxjs/toolkit";
//import userReducer from "../pages/user/userSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
   // user: userReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
