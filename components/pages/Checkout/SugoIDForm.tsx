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
import { createQueryParams } from "@/lib/utils/formatters";
import { useForm } from "@tanstack/react-form";
import { CircleAlert } from "lucide-react";
import { z } from "zod";

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

export default function SugoIDForm(props: EmailFormProps) {
  const { goNext } = useNextStep();

  const form = useForm({
    defaultValues: {
      sugoId: "",
      confirmSugoId: "",
    },
    validators: {
      onSubmit: sugoCheckoutSchema,
    },
    onSubmit: async ({ value }) => {
      const query = createQueryParams({
        type: "coin",
        sugoId: value.sugoId,
      });
      goNext(query);
    },
  });

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Sugo ID
      </h5>
      <p className="mt-3 text-xl">
        This Sugo ID will be used to deliver your Coin bundle.
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

        <p className="mt-6 flex items-center gap-2 text-sm">
          <CircleAlert size={16} className="text-destructive" />
          Please make sure the ID is correct before continuing.
        </p>

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
              className="mt-3 w-full"
              disabled={!isTouched || !isValid || !canSubmit || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
