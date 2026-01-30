"use client";

import { useNextStep } from "@/components/shared/Stepper/Stepper";
import { FieldGroup } from "@/components/ui/field";
import { inputStyles } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { usePaymentStatus } from "./context/PaymentStatusContext";

export function CardCheckoutForm({
  clientSecret,
  orderId,
}: {
  clientSecret: string;
  orderId: string;
}) {
  const { goNext } = useNextStep();
  const { resetStatus, setStatus } = usePaymentStatus();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);
    resetStatus();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            // name: ""
            // address: {
            //   postal_code: postalCode,
            // },
          },
        },
      },
    );

    if (error) {
      setStatus("failed");
      toast.error(error.message ?? "Payment failed");
      setLoading(false);
      goNext();
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setStatus("success");
      goNext();
      // window.location.href = `/tickets/success?order_id=${orderId}`;
      toast.success("Payment successful");
    }
  };

  const [complete, setComplete] = useState(false);

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <FieldGroup>
        {/* <Field> */}
        {/*   <FieldLabel htmlFor="name">Cardholder Name</FieldLabel> */}
        {/*   <Input id="name" autoComplete="off" placeholder="Enter Full Name" /> */}
        {/* </Field> */}

        <div
          className={cn(
            inputStyles,
            "focus-within:ring-ring/50 focus-within:ring-[3px]",
          )}
        >
          <CardElement
            onChange={(e) => setComplete(e.complete)}
            className="flex h-full flex-col justify-center"
            options={{
              style: {
                base: {
                  backgroundColor: "",
                  fontSize: "16px",
                  color: "#111827",
                  fontFamily: "Inter, system-ui, sans-serif",
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                },
                invalid: {
                  color: "#DC2626",
                },
              },
            }}
          />
        </div>
      </FieldGroup>

      <Button
        className="mt-8 w-full"
        variant="primary"
        disabled={!complete || !stripe || loading}
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </Button>
    </form>
  );
}
