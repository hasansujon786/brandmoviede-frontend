"use client";

import type React from "react";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    // Add your sign up logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
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
              Create Account
            </CardTitle>
            <CardDescription className="mt-2">
              Create an account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <Field>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-gray-50"
                  required
                />
              </Field>

              {/* Email Input */}
              <Field>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50"
                  required
                />
              </Field>

              {/* Password Input */}
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50"
                  required
                />
                <p className="mt-1 text-xs">
                  Must be at least 8 characters with uppercase, lowercase, and
                  numbers
                </p>
              </Field>

              {/* Confirm Password Input */}
              <Field>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-50"
                  required
                />
              </Field>

              {/* Terms Agreement Checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-sm leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-primary-400 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-primary-400 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading || !agreeTerms}
                variant="primary"
                className="w-full"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Sign In Link */}
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

        {/* Footer Text */}
        <p className="text-body-100 mt-6 text-center text-xs">
          We respect your privacy. Learn more in our{" "}
          <Link href="#" className="text-primary hover:text-primary-400">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
