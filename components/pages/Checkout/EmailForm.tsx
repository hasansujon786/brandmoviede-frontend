"use client";

import { useNextStep } from "@/components/shared/Stepper/Stepper";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateCoinCheckoutOrderMutation } from "@/redux/api";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { createQueryParams } from "@/lib/utils/formatters";

export const sugoCheckoutSchema = z
  .object({
    sugoId: z.string().min(1, "Sugo ID is required"),
    confirmSugoId: z.string().min(1, "Please confirm your Sugo ID"),
  })
  .refine((data) => data.sugoId === data.confirmSugoId, {
    path: ["confirmSugoId"],
    message: "Sugo IDs do not match",
  });

interface EmailFormProps {}

export default function EmailForm(props: EmailFormProps) {
  const { goNext } = useNextStep();
  const [createOrder] = useCreateCoinCheckoutOrderMutation();
  const cartItems = useSelector(selectCartItems);

  const form = useForm({
    defaultValues: {
      sugoId: "",
      confirmSugoId: "",
    },
    validators: {
      onSubmit: sugoCheckoutSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { client_secret, transaction_id } = await createOrder({
          sugoId: value.sugoId,
          items: cartItems.map((i) => ({
            bundle_id: i.data.id,
            quantity: i.quantity,
          })),
        }).unwrap();

        toast.success("Order placed successfully 🎉");
        const query = createQueryParams({ client_secret, transaction_id });
        goNext(query);
      } catch (err: any) {
        toast.error(
          err?.data?.message || "Failed to place order. Please try again.",
        );
      }
    },
  });

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Sugo ID
      </h5>
      <p className="mt-3 text-xl">
        Your digital code will be sent to this email address
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-4"
      >
        <FieldSet>
          <FieldGroup>
            <form.Field name="sugoId">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Sugo ID</FieldLabel>
                  <Input
                    id={field.name}
                    autoComplete="off"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    placeholder="Enter your Sugo ID"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="confirmSugoId">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Confirm Sugo ID</FieldLabel>
                  <Input
                    id={field.name}
                    autoComplete="off"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Confirm your Sugo ID"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </FieldSet>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="primary"
              className="mt-8 w-full"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
