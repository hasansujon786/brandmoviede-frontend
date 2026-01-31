"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useVerifyEmailMutation } from "@/redux/api";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [verifyEmail, { isLoading, isSuccess }] = useVerifyEmailMutation();

  useEffect(() => {
    if (!email || !token) {
      toast.error("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail({ email, token }).unwrap();
        toast.success(res.message);

        setTimeout(() => {
          router.push("/signin");
        }, 1200);
      } catch (error) {
        const msg = getErrorMessage(error, "Email verification failed.");
        toast.error(msg);
      }
    };

    verify();
  }, [email, token, verifyEmail, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>
            {isLoading
              ? "Verifying your email…"
              : isSuccess
                ? "Email Verified 🎉"
                : "Email Verification"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <p className="text-muted-foreground text-sm">
              Please wait while we verify your email address.
            </p>
          )}

          {isSuccess && (
            <p className="text-muted-foreground text-sm">
              Redirecting you to sign in…
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
