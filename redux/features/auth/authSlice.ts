import { RootState } from "@/redux/store";
import { IAuthUserRole } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null | false;
  // user: IAuthUser | null;
  role: IAuthUserRole | null;
}

const initialState: AuthState = {
  // user: null,
  token: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      console.warn("calling: setCredentials", action.payload);
      const { token = null, role = null } = action.payload;
      state.token = token;
      state.role = role;

      if (token) {
        Cookies.set("token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
      }

      if (role) {
        Cookies.set("role", role, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
      }
    },
    logOut: (state) => {
      // state.user = null;
      state.token = null;
      state.role = null;

      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRole = (state: RootState) => state.auth.role;

interface SetCredentialsPayload {
  token?: string | null;
  role?: IAuthUserRole | null;
}
