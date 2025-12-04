"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailForm() {
  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Email Address
      </h5>
      <p className="mt-3 text-xl">
        Your digital code will be sent to this email address
      </p>
      <form className="mt-4">
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
