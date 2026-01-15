import { useLoginMutation } from "@/redux/api/baseApi";
import { useAppDispatch } from "@/redux/store";
import {
  logOut as redusLogout,
  selectCurrentRole,
  selectCurrentToken,
} from "./authSlice";
import { useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useAppDispatch();
  const [logIn, ctx] = useLoginMutation();
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  function logOut() {
    dispatch(redusLogout());
  }

  // try {
  //   // const userData = await login({
  //   //   email: "admin1@gmail.com",
  //   //   password: "Admin123",
  //   // }).unwrap();
  //   // dispatch(setCredentials({ ...userData }));
  //   //navigate("/welcome");
  // } catch (err) {
  //   console.error("errrr", err);
  //   // if (!err?.originalStatus) {
  //   //   // isLoading: true until timeout occurs
  //   //   setErrMsg("No Server Response");
  //   // } else if (err.originalStatus === 400) {
  //   //   setErrMsg("Missing Username or Password");
  //   // } else if (err.originalStatus === 401) {
  //   //   setErrMsg("Unauthorized");
  //   // } else {
  //   //   setErrMsg("Login Failed");
  //   // }
  // }

  return {
    token,
    role,
    isAuthenticated: !!token,
    logIn,
    logOut,
    ...ctx,
  };
}
