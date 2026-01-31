"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/utils";
import { useRegisterUserMutation } from "@/redux/api";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine(Boolean, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await registerUser({
          name: value.fullName,
          email: value.email,
          password: value.password,
        }).unwrap();

        toast.success(
          res?.message || "We have sent a verification link to your email",
        );

        router.push("/signin");
      } catch (error) {
        const msg = getErrorMessage(
          error,
          "Registration failed. Please try again.",
        );
        toast.error(msg);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            className="rounded-full"
            width={48}
            height={48}
            alt=""
            src="/images/logo-bl.png"
          />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-heading-100 text-2xl font-bold">
              Create Account
            </CardTitle>
            <CardDescription className="mt-2">
              Create an account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* Full Name */}
              <form.Field name="fullName">
                {(field) => (
                  <Field>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="bg-gray-50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* Email */}
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="bg-gray-50"
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field) => (
                  <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="bg-gray-50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* Confirm Password */}
              <form.Field name="confirmPassword">
                {(field) => (
                  <Field>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="bg-gray-50"
                      placeholder="Re-enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* Terms */}
              <form.Field name="agreeTerms">
                {(field) => (
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      className="mt-1"
                      checked={field.state.value}
                      onCheckedChange={(v) => field.handleChange(!!v)}
                    />
                    <label
                      htmlFor="terms"
                      className="cursor-pointer text-sm leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}
              </form.Field>

              {/* Submit */}
              <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={!canSubmit || isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading
                      ? "Creating Account..."
                      : "Create Account"}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary-400 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
