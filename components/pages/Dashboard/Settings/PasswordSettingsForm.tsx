"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordScheme = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export default function PasswordSettingsForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: changePasswordScheme,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        const res = await changePassword({
          old_password: value.oldPassword,
          new_password: value.newPassword,
        }).unwrap();

        if (res.success) {
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        const msg = getErrorMessage(error, "Failed to change password.");
        toast.error(msg);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldGroup className="flex xl:flex-row">
          <form.Field name="oldPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Old Password</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id={field.name}
                  autoComplete="off"
                  placeholder="Enter your old password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id={field.name}
                  autoComplete="off"
                  placeholder="Enter your new password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id={field.name}
                  autoComplete="off"
                  placeholder="Confirm your password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </FieldSet>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
              disabled={!canSubmit || isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Processing..." : "Change Password"}
            </Button>
          )}
        </form.Subscribe>

        <Button
          type="button"
          onClick={router.back}
          variant="primary-inverse"
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
