import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/user/userSlice";
import logReducer from "../pages/log/logSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
