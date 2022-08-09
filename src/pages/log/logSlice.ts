import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface LogState {
  logged: "failed" | "pending";
}

const initialState: LogState = {
  logged: "pending",
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogF(state, action: PayloadAction<LogState>) {
      state.logged = action.payload.logged;
    },
    setLogK(state, action: PayloadAction<LogState>) {
      state.logged = action.payload.logged;
    },
  },
});

export const { setLogF, setLogK } = logSlice.actions;

export const selectLog = (state: RootState) => state.log;

export default logSlice.reducer;
