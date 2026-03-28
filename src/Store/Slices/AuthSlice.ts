import { createSlice } from "@reduxjs/toolkit";


export interface AuthUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: string;
}

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;