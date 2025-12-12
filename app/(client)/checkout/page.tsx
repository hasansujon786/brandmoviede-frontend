"use client";
import CheckoutStatus from "@/components/pages/Checkout/CheckoutStatus";
import CheckoutSummary from "@/components/pages/Checkout/CheckoutSummary";
import EmailForm from "@/components/pages/Checkout/EmailForm";
import PaymentInfoForm from "@/components/pages/Checkout/PaymentInfoForm";
import SecurePaymentMsg from "@/components/pages/Checkout/SecurePaymentMsg";
import Stepper, { STEP_ICONS } from "@/components/shared/Stepper/Stepper";
import { useStepper } from "@/components/shared/Stepper/StepperContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { step, nextStep, prevStep } = useStepper();
  const [status, setStatus] = useState<null | "SUCCESS" | "FAILED">(null);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        setStatus("SUCCESS");
      }, 1000);
    }
  }, [step]);

  if (status === "SUCCESS" && step === 2) {
    return <Status />;
  }

  return (
    <div className="min-h-screen">
      {/* <div className="flex gap-3"> */}
      {/*   <button onClick={prevStep}>prev</button> */}
      {/*   <p>{step}</p> */}
      {/*   <button onClick={nextStep}>next</button> */}
      {/* </div> */}

      <section className="custom-container mt-20">
        <Stepper stepIcons={STEP_ICONS} />
      </section>

      <section className="custom-container grid gap-8 py-10 lg:grid-cols-2 lg:py-20 xl:gap-12">
        {step === 0 ? (
          <EmailForm onNext={nextStep} />
        ) : (
          <PaymentInfoForm onNext={nextStep} />
        )}

        <CheckoutSummary />
      </section>
    </div>
  );
}

const Status = () => {
  return (
    <section className="custom-container flex min-h-screen flex-col items-center py-20">
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
