"use client";

import { stripePromise } from "@/lib/stripe-client";
import { useCreateTicketOrderMutation } from "@/redux/features/app/paymentApi";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function CardCheckoutForm({
  clientSecret,
  orderId,
}: {
  clientSecret: string;
  orderId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            address: {
              postal_code: postalCode,
            },
          },
        },
      },
    );

    if (error) {
      setErrorMessage(error.message ?? "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // ✅ Payment successful
      window.location.href = `/tickets/success?order_id=${orderId}`;
    }
  };

  const [complete, setComplete] = useState(false);

  return (
    <form className="bg-card container p-4" onSubmit={handleSubmit}>
      <div className="rounded-lg border px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <CardElement
          onChange={(e) => setComplete(e.complete)}
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

      <div>
        <input
          type="text"
          className="rounded-lg border px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      <Button variant="primary" disabled={!complete || !stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
}

export default function TicketCheckout({ ticketId }: { ticketId: string }) {
  const [createTicketOrder, { data, isLoading, error }] =
    useCreateTicketOrderMutation();

  const clientSecret = data?.data.client_secret;
  const orderId = data?.data.order_id;

  useEffect(() => {
    createTicketOrder({ ticket_id: ticketId });
  }, [ticketId, createTicketOrder]);

  if (isLoading) return <p>Creating order…</p>;
  if (error) return <p>Failed to create order</p>;
  if (!clientSecret || !orderId) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CardCheckoutForm clientSecret={clientSecret} orderId={orderId} />
    </Elements>
  );
}
