import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userId: Cookies.get("userId") || "",
  role: Cookies.get("userRole") || "User",
  email: Cookies.get("email") || "Not Available",
  username: Cookies.get("username") || "User",
  password: Cookies.get("password") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logoutUser: (state) => {
      Cookies.remove("authToken");
      Cookies.remove("userId");
      Cookies.remove("userRole");
      Cookies.remove("email");
      Cookies.remove("username");
      Cookies.remove("password");
      return initialState;
    },
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
