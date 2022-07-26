import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import logReducer from "../features/log/logSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
