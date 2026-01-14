"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // No token — redirecting to login...
      router.replace("/signin");
    }
  }, [isAuthenticated, router]);

  // Only render children if token exists
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
