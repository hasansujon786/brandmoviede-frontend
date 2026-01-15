"use client";

import { useAppDispatch } from "@/redux/store";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { IAuthUserRole } from "@/types";

function useInitiateAuthState() {
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const isAppLoading = token === false;

  useEffect(() => {
    const [savedToken, savedRole] = ["token", "role"].map((key) =>
      Cookies.get(key),
    );

    // TODO: get authuer here
    // let initialUser: IAuthUser | null = null;
    // if (savedUser) {
    //   try {
    //     initialUser = JSON.parse(savedUser);
    //   } catch {
    //     Cookies.remove("user");
    //   }
    // }

    dispatch(
      setCredentials({
        token: savedToken || null,
        role: (savedRole as IAuthUserRole) || null,
      }),
    );
  }, [dispatch]);

  return { isAppLoading };
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isAppLoading } = useInitiateAuthState();

  if (isAppLoading) return null;

  return <>{children}</>;
}
