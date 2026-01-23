"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  useAdminGetCoinBundleByIdQuery,
  useAdminUpdateCoinMutation,
  useAdminCreateCoinMutation,
} from "@/redux/features/admin/coinApis";
import { skipToken } from "@reduxjs/toolkit/query";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

/* ---------------------------------- */
/* Zod Schemas */
/* ---------------------------------- */
const baseSchema = {
  is_active: z.boolean(),
  coin_amount: z.coerce.number<string>().positive("Coin amount must be > 0"),
  price: z.coerce.number<string>().positive("Price must be > 0"),
};

const createSchema = z.object({
  ...baseSchema,
  thumbnail: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: "Thumbnail is required",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Thumbnail must be an image",
    }),
});

const updateSchema = z.object({
  ...baseSchema,
  thumbnail: z.custom<File | undefined>().optional(),
});

interface CoinBundleDialogProps extends React.PropsWithChildren {
  mode: "create" | "edit";
  initialValues?: {
    id: string;
    coin_amount: number;
    price: number;
    is_active: boolean;
    thumbnail_url?: string;
  };
}

export default function CreateCoinBundleDialog({
  children,
  mode = "create",
  initialValues,
}: CoinBundleDialogProps) {
  const [open, setOpen] = useState(false);

  const coinId = open ? initialValues?.id : undefined;
  const { data: editModeCoinData, isLoading: gettingEditModeInitialData } =
    useAdminGetCoinBundleByIdQuery(coinId ?? skipToken);

  const [createCoin, { isLoading: creating }] = useAdminCreateCoinMutation();
  const [updateCoin, { isLoading: updating }] = useAdminUpdateCoinMutation();

  const form = useForm({
    defaultValues: {
      coin_amount: initialValues?.coin_amount?.toString() ?? "",
      price: initialValues?.price?.toString() ?? "",
      thumbnail: undefined as File | undefined,
      is_active: initialValues?.is_active ?? true,
    },
    validators: {
      onSubmit: mode === "create" ? createSchema : updateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (mode === "create") {
          await createCoin({
            coin_amount: Number(value.coin_amount),
            price: Number(value.price),
            thumbnail: value.thumbnail!,
            is_active: value.is_active,
          }).unwrap();

          toast.success("Coin bundle created successfully");
        } else {
          console.log(value, initialValues!.id);
          await updateCoin({
            id: initialValues!.id,
            coin_amount: Number(value.coin_amount),
            price: Number(value.price),
            thumbnail: value.thumbnail,
            is_active: value.is_active,
          }).unwrap();

          toast.success("Coin bundle updated successfully");
        }

        form.reset();
        setOpen(false);
      } catch {
        toast.error(
          mode === "create"
            ? "Failed to create coin bundle"
            : "Failed to update coin bundle",
        );
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || creating || updating;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Coin Bundle" : "Update Coin Bundle"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new coin bundle"
              : "Update coin bundle details"}
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Coin Amount + Price */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="coin_amount">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Coin Amount</Label>
                  <Input
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label htmlFor={field.name}>Price</Label>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Thumbnail */}
          <form.Field name="thumbnail">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <Label htmlFor={field.name}>Thumbnail</Label>
                <FileInput
                  id={field.name}
                  multiple={false}
                  accept="image/*"
                  onBlur={field.handleBlur}
                  onChange={(files) => field.handleChange(files[0])}
                />

                {/* Existing image preview (edit mode) */}
                {gettingEditModeInitialData ||
                (!field.state.value && editModeCoinData?.thumbnail) ? (
                  <>
                    <h3 className="font-body mt-4 mb-1 text-sm">
                      Current thumbnail
                    </h3>
                    <div className="bg-accent-light-gray border-border flex items-center justify-between space-x-4 rounded-lg border p-3">
                      <Image
                        unoptimized
                        width={64}
                        height={64}
                        src={editModeCoinData?.thumbnail as string}
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

          {/* Active Checkbox */}
          <form.Field name="is_active">
            {(field) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(Boolean(v))}
                />
                <Label htmlFor={field.name}>Active bundle</Label>
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary-inverse">Cancel</Button>
            </DialogClose>
            <Button
              size="lg"
              variant="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Bundle"
                  : "Update Bundle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
