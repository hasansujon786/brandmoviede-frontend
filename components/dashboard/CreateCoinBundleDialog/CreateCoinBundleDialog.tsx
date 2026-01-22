"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCoinMutation } from "@/redux/features/admin/coinApis";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const ZodSchema = z.object({
  coin_amount: z.coerce
    .number<string>()
    .positive("Coin amount must be greater than 0"),
  price: z.coerce.number<string>().positive("Price must be greater than 0"),
  thumbnail: z
    .custom<File | undefined>()
    .refine((file) => file instanceof File, {
      message: "Thumbnail is required",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Thumbnail must be an image",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Thumbnail must be smaller than 2MB",
    }),
});

export default function CreateCoinBundleDialog({
  children,
}: React.PropsWithChildren) {
  const [createCoin, { isLoading }] = useCreateCoinMutation();

  const form = useForm({
    defaultValues: {
      coin_amount: "",
      price: "",
      thumbnail: undefined as File | undefined,
    },
    validators: {
      onSubmit: ZodSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value.thumbnail || value.thumbnail === undefined) {
        toast.error("Please select a thumbnail file!");
        return;
      }

      try {
        await createCoin({
          ...value,
          coin_amount: Number(value.coin_amount),
          price: Number(value.price),
          thumbnail: value.thumbnail as File,
        }).unwrap();

        toast.success("Coin bundle created successfully!");
        form.reset();
        setIsOpen(false);
      } catch (err) {
        toast.error("Failed to create coin bundle try again.");
        console.error(err);
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || isLoading;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        // reset when dialog closes
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Coin Bundle</DialogTitle>
          <DialogDescription>
            Create a new coin bundle for the store.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Coins */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="coin_amount">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Coin Amount</Label>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter coin amount"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="price">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Coin Price</Label>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter a name price for Coin Bundle"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="thumbnail">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <Label htmlFor={field.name}>Bundle Thumbnail</Label>
                  <FileInput
                    multiple={false}
                    id={field.name}
                    accept="image/*"
                    onBlur={field.handleBlur}
                    onChange={(files) =>
                      field.handleChange(files[0] ?? undefined)
                    }
                    placeholder="Coint thumbnail"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button size="lg" variant="primary-inverse">
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Bundle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
