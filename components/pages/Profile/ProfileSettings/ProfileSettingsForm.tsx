"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getErrorMessage } from "@/lib/utils";
import {
  useGetMeQuery,
  useUpdateAuthUserMutation,
} from "@/redux/features/auth/authApi";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  thumbnail: z
    .custom<File | undefined>()
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "It be an image",
    }),
});

export default function ProfileSettingsForm({
  pathname,
}: {
  pathname: string;
}) {
  const { data: defaultUser } = useGetMeQuery();

  const [updateAuthUser, { isLoading }] = useUpdateAuthUserMutation();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: defaultUser?.name ?? "",
      thumbnail: undefined as File | undefined,
    },
    validators: {
      onSubmit: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await updateAuthUser({
          name: value.name,
          avatar: value.thumbnail,
        }).unwrap();

        toast.success(res.message);
        router.back();
      } catch (error) {
        const msg = getErrorMessage(error, "Failed to update profile.");
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
        <FieldGroup className="">
          {/* Thumbnail */}
          <form.Field name="thumbnail">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>Upload Profile Image</Label>
                <FileInput
                  id={field.name}
                  multiple={false}
                  accept="image/*"
                  onBlur={field.handleBlur}
                  onChange={(files) => field.handleChange(files[0])}
                />

                {!field.state.value && defaultUser?.avatar_url ? (
                  <>
                    <h3 className="font-body mt-4 mb-1 text-sm">
                      Current Profile Image
                    </h3>
                    <div className="bg-accent-light-gray border-border flex items-center justify-between space-x-4 rounded-lg border p-3">
                      <Image
                        unoptimized
                        width={64}
                        height={64}
                        src={defaultUser?.avatar_url as string}
                        alt=""
                        className="bg-muted size-16 rounded border object-cover"
                      />
                    </div>
                  </>
                ) : null}

                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="name">User name</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id="name"
                  autoComplete="off"
                  placeholder="Enter your full name"
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
              {isSubmitting || isLoading ? "Updating..." : "Update Profile"}
            </Button>
          )}
        </form.Subscribe>

        <Button
          type="button"
          onClick={() => router.replace(pathname)}
          variant="primary-inverse"
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
