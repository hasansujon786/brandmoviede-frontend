import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IAuthUser, ILoginPayload } from "@/types/user/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface AuthState {
  user: IAuthUser | null;
  token: string | null | false;
}

const initialState: AuthState = {
  user: null,
  token: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string | null }>,
    ) => {
      console.warn("calling: setCredentials", action.payload);
      const { token } = action.payload;
      state.token = token;

      if (token) {
        Cookies.set("token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;

      Cookies.remove("token");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
