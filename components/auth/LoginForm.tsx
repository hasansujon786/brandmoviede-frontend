"use client";

import PublicRoute from "@/components/auth/PublicRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input, inputStyles } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/redux/features/auth/hooks";
import { IAuthUserRole, RoleUtils } from "@/types";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  // rememberMe: z.boolean(),
});

export default function LoginForm({ type }: { type: IAuthUserRole }) {
  const router = useRouter();
  const { logIn, isLoading: isLoginLoading } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await logIn({
          email: value.email,
          password: value.password,
        }).unwrap();
        const isCurrentUserAdmin = RoleUtils.isAdmin(res?.type);

        router.replace(
          type === "admin" || isCurrentUserAdmin ? "/dashboard" : "/",
        );
      } catch (error) {
        toast.error(
          getErrorMessage(error, "Failed to SignIn. Please try again."),
        );
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
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
                {type === "admin" ? "Dashboard Login" : "Sign In"}
              </CardTitle>
              <CardDescription className="mt-2">
                {type === "admin"
                  ? "Sign in to access your dashboard"
                  : "Welcome back! Please sign in to continue"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                {/* Email */}
                <form.Field name="email">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.isTouched && !field.state.meta.isValid
                      }
                    >
                      <Label htmlFor={field.name}>Email Address</Label>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="bg-gray-50"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Password */}
                <form.Field name="password">
                  {(field) => (
                    <Field
                      data-invalid={
                        field.state.meta.isTouched && !field.state.meta.isValid
                      }
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor={field.name}>Password</Label>
                        {/* <Link */}
                        {/*   href="/forgot-password" */}
                        {/*   className="text-primary hover:text-primary-400 text-sm font-medium" */}
                        {/* > */}
                        {/*   Forgot? */}
                        {/* </Link> */}
                      </div>

                      <InputGroup className={cn(inputStyles, "bg-gray-50")}>
                        <InputGroupInput
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          autoComplete="current-password"
                          className="px-0"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />

                        <InputGroupAddon align="inline-end" className="px-0">
                          <Button
                            onClick={() => setShowPassword((v) => !v)}
                            type="button"
                            size="icon-sm"
                            className="border-none"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Remember Me */}
                {/* <form.Field name="rememberMe"> */}
                {/*   {(field) => ( */}
                {/*     <div className="flex items-center space-x-2"> */}
                {/*       <Checkbox */}
                {/*         id="remember" */}
                {/*         checked={field.state.value} */}
                {/*         onCheckedChange={(checked) => */}
                {/*           field.handleChange(!!checked) */}
                {/*         } */}
                {/*       /> */}
                {/*       <label */}
                {/*         htmlFor="remember" */}
                {/*         className="cursor-pointer text-sm" */}
                {/*       > */}
                {/*         Remember me */}
                {/*       </label> */}
                {/*     </div> */}
                {/*   )} */}
                {/* </form.Field> */}

                {/* Submit */}
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isValid,
                    state.isTouched,
                  ]}
                >
                  {([canSubmit, isSubmitting, isValid, isTouched]) => (
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={
                        !isTouched ||
                        !isValid ||
                        !canSubmit ||
                        isSubmitting ||
                        isLoginLoading
                      }
                    >
                      {isLoginLoading || isSubmitting
                        ? "Signing In..."
                        : "Sign In"}
                    </Button>
                  )}
                </form.Subscribe>
              </form>

              {/* Sign Up */}
              {type === "user" ? (
                <div className="mt-6 text-center">
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-primary hover:text-primary-400 font-semibold"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-body-100 mt-6 text-center text-xs">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-primary hover:text-primary-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:text-primary-400">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
