"use client";

import { useNextStep } from "@/components/shared/Stepper/Stepper";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input, inputStyles } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCreateCoinCheckoutOrderMutation,
  useCreateTicketCheckoutOrderMutation,
} from "@/redux/api";
import { clearCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../../ui/button";
import { usePaymentStatus } from "./context/PaymentStatusContext";

const schema = z.object({
  cardholderName: z.string().min(2, "Cardholder name is required"),
});

type CheckoutCoin = {
  type: "coin";
  sugoId: string;
};

type CheckoutTicket = {
  type: "ticket";
  ticketId: string;
};

type CardCheckoutFormProps = CheckoutCoin | CheckoutTicket;

export function CardCheckoutForm(props: CardCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const { goNext } = useNextStep();
  const { resetStatus, setStatus } = usePaymentStatus();

  const [createTicketOrder] = useCreateTicketCheckoutOrderMutation();

  const [createCoinOrder] = useCreateCoinCheckoutOrderMutation();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const form = useForm({
    defaultValues: {
      cardholderName: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        resetStatus();
        let client_secret = null;

        if (props.type == "coin") {
          client_secret = await tryCoinCheckout(props.sugoId);
        }

        if (props.type == "ticket") {
          client_secret = await tryTicketCheckout(props.ticketId);
        }

        if (!client_secret) {
          return toast.error("Failed to place order. Please try again.");
        }

        await handleStripePayment(client_secret, {
          name: value.cardholderName,
        });
      } catch (err: any) {
        toast.error(
          err?.data?.message || "Failed to place order. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
  });

  async function tryCoinCheckout(sugoId: string) {
    if (!sugoId) {
      toast.error("Invalid sugoId");
      return null;
    }

    const { client_secret } = await createCoinOrder({
      sugoId: sugoId,
      items: cartItems.map((i) => ({
        bundle_id: i.data.id,
        quantity: i.quantity || 1,
      })),
    }).unwrap();

    console.log("coin", client_secret);

    return client_secret;
  }

  async function tryTicketCheckout(ticketId: string) {
    if (!ticketId) {
      toast.error("Invalid ticketId");
      return null;
    }

    const { client_secret, ...other } = await createTicketOrder({
      items: [{ ticket_id: ticketId, quantity: 1 }],
    }).unwrap();

    console.log("ticket", client_secret, other);

    return client_secret;
  }

  async function handleStripePayment(
    clientSecret: string,
    billing_details: { name: string },
  ) {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details,
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
      dispatch(clearCart());
      setStatus("success");
      goNext();
      toast.success("Payment successful");
    }
  }

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="cardholderName">
          {(field) => (
            <Field
              data-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
            >
              <FieldLabel htmlFor={field.name}>Cardholder Name</FieldLabel>
              <Input
                id={field.name}
                autoComplete="off"
                placeholder="Enter full name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <Field>
          <FieldLabel htmlFor="name">Card Info</FieldLabel>
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
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="mt-8 w-full"
        variant="primary"
        disabled={!complete || !stripe || loading}
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </Button>
    </form>
  );
}
