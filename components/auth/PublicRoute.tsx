"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import { RoleUtils } from "@/types";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && RoleUtils.isAdmin(role)) {
      router.replace("/dashboard");
    } else if (isAuthenticated && RoleUtils.isUser(role)) {
      router.replace("/");
    }
  }, [isAuthenticated, router, role]);

  // If logged in, don’t render public page (redirecting)
  if (isAuthenticated) return null;

  return <>{children}</>;
}
