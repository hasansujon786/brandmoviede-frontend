"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import { RoleUtils } from "@/types";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AdminRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If Not logged in
    if (!isAuthenticated) {
      router.replace("/dashboard/signin");
      return;
    }

    // If Logged in but not admin
    if (!RoleUtils.isAdmin(role)) {
      router.replace("/");
      return;
    }
  }, [isAuthenticated, role, router]);

  // Block render until checks pass
  if (!isAuthenticated) return null;
  if (!RoleUtils.isAdmin(role)) return null;

  return <>{children}</>;
}
