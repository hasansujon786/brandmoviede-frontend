"use client";

import { useNextStep } from "@/components/shared/Stepper/Stepper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { usePaymentStatus } from "./context/PaymentStatusContext";

interface PaymentInfoFormProps {}

export default function PaymentInfoForm({}: PaymentInfoFormProps) {
  const { goNext } = useNextStep();
  const { resetStatus } = usePaymentStatus();
  const searchParams = useSearchParams();

  const client_secret: string | null = searchParams.get("client_secret");
  const transaction_id: string | null = searchParams.get("transaction_id");

  console.log(client_secret, transaction_id);

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Payment Information
      </h5>
      <p className="mt-3 text-xl">
        Your payment details are encrypted and secure.
      </p>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          resetStatus();
          goNext();
        }}
      >
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Cardholder Name</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                placeholder="Enter Full Name"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
              <Input
                id="card-number"
                autoComplete="off"
                placeholder="1234 2134 6874 2314"
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="flex-row">
            <Field>
              <FieldLabel htmlFor="expiry-date">Expiry Date</FieldLabel>
              <Input id="expiry-date" autoComplete="off" placeholder="MM/YY" />
            </Field>

            <Field>
              <FieldLabel htmlFor="cvc">CVC</FieldLabel>
              <Input id="cvc" autoComplete="off" placeholder="123" />
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
