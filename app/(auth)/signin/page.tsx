import PublicRoute from "@/components/auth/PublicRoute";
import LoginForm from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <PublicRoute>
      <LoginForm type="user" />
    </PublicRoute>
  );
}
