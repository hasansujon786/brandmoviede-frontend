"use client";

import { useNextStep } from "@/components/shared/Stepper/Stepper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface EmailFormProps {}

export default function EmailForm(props: EmailFormProps) {
  const { goNext } = useNextStep();

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Email Address
      </h5>
      <p className="mt-3 text-xl">
        Your digital code will be sent to this email address
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
        className="mt-4"
      >
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="off"
                placeholder="your.email@example.com"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button variant="primary" className="mt-8 w-full">
          Continue to Payment
        </Button>
      </form>
    </div>
  );
}
