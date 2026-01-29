"use client";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import { useEffect } from "react";

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentIntent, { data, isLoading, error }] =
    useCreateOrderForSingleTicketMutation();

  const clientSecret = data?.clientSecret;

  useEffect(() => {
    createPaymentIntent({ amount });
  }, [amount, createPaymentIntent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  if (isLoading) return <p>Loading payment...</p>;
  if (error) return <p>Payment error</p>;
  if (!clientSecret) return null;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Pay</button>
    </form>
  );
}

export default function Checkout({ amount }: { amount: number }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret: undefined }}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
