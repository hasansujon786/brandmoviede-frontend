"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // "User already logged in — redirecting to /dashboard"
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  // If logged in, don’t render public page (redirecting)
  if (isAuthenticated) return null;

  return <>{children}</>;
}
