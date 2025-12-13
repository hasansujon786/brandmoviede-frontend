"use client";

import CheckoutStatus from "@/components/pages/Checkout/CheckoutStatus";
import {
  PaymentStatus,
  usePaymentStatus,
} from "@/components/pages/Checkout/context/PaymentStatusContext";
import SecurePaymentMsg from "@/components/pages/Checkout/SecurePaymentMsg";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export default function CheckoutResultPage() {
  const { status, setStatus, resetStatus } = usePaymentStatus();

  useEffect(() => {
    setTimeout(() => {
      setStatus("success");
    }, 500);
  }, [setStatus, resetStatus]);

  if (status === null) {
    return (
      <div className="flex items-center justify-center pt-32">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  return <Status status={status} />;
}

const Status = ({}: { status: PaymentStatus }) => {
  return (
    <section className="custom-container flex min-h-screen flex-col items-center py-10 lg:py-20">
      <CheckoutStatus
        isSuccess
        title="Payment Successful!"
        message="Your 500 coins have been added to your account."
      />
      {/* <CheckoutStatus title='Payment Unsuccessful!' message='Your 500 coins haven’t been added to your account.'/> */}

      <div className="mt-12">
        <SecurePaymentMsg />
      </div>
    </section>
  );
};
