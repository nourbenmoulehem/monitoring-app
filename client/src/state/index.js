import { createSlice } from "@reduxjs/toolkit";
 const user = null
const initialState = {
  mode: "dark",
  user: null,
  token: null,
  isLoggedIn: false
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
