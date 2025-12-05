import HeroGradientWrapper from "@/components/shared/HeroGradientWrapper/HeroGradientWrapper";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import EmailForm from "@/components/pages/Checkout/EmailForm";
import PaymentInfoForm from "@/components/pages/Checkout/PaymentInfoForm";
import CheckoutSummary from "@/components/pages/Checkout/CheckoutSummary";
import SecurePaymentMsg from "@/components/pages/Checkout/SecurePaymentMsg";
import CheckoutStatus from "@/components/pages/Checkout/CheckoutStatus";

export default function CartPage() {
  return (
    <div>
      <HeroGradientWrapper>
        <SectionHeading
          eyebrow="CHECKOUT"
          description="Review your order and complete payment to own these limited-edition pieces forever."
          descriptionClassName="max-w-auto"
        >
          Finalize Your <span className="text-primary">Purchase</span>
        </SectionHeading>
      </HeroGradientWrapper>

      {/* TODO: add stepper */}
      <section className="custom-container grid grid-cols-2 gap-12 py-20">
        <EmailForm />
        {/* <PaymentInfoForm /> */}
        <CheckoutSummary />
      </section>

      {/* <section className="custom-container flex flex-col items-center py-20"> */}
      {/*   <CheckoutStatus */}
      {/*     isSuccess */}
      {/*     title="Payment Successful!" */}
      {/*     message="Your 500 coins have been added to your account." */}
      {/*   /> */}
      {/*   <CheckoutStatus title='Payment Unsuccessful!' message='Your 500 coins haven’t been added to your account.'/> */}
      {/**/}
      {/*   <div className="mt-12"> */}
      {/*     <SecurePaymentMsg /> */}
      {/*   </div> */}
      {/* </section> */}
    </div>
  );
}
