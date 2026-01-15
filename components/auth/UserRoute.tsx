"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import { RoleUtils } from "@/types";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function UserRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If Not logged in
    if (!isAuthenticated) {
      router.replace("/signin");
      return;
    }

    // If Logged in but not user
    if (!RoleUtils.isUser(role)) {
      router.replace("/");
      return;
    }
  }, [isAuthenticated, role, router]);

  // Block render until checks pass
  if (!isAuthenticated) return null;
  if (!RoleUtils.isUser(role)) return null;

  return <>{children}</>;
}
