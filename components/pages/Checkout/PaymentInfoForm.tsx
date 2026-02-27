"use client";

import { stripePromise } from "@/lib/stripe-client";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { CardCheckoutForm } from "./CheckoutCardForm";

interface PaymentInfoFormProps {}

export default function PaymentInfoForm({}: PaymentInfoFormProps) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") as "coin" | "ticket" | null;
  const sugoId: string | null = searchParams.get("sugoId");
  const ticketId: string | null = searchParams.get("ticketId");
  const isCustomBundle: string | null = searchParams.get("isCustomBundle");

  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Payment Information
      </h5>
      <p className="mt-3 text-xl">
        Your payment details are encrypted and secure.
      </p>

      {type == "coin" && sugoId && (
        <Elements stripe={stripePromise}>
          <CardCheckoutForm
            type="coin"
            sugoId={sugoId}
            meta={{ isCustom: isCustomBundle === "true" }}
          />
        </Elements>
      )}

      {type == "ticket" && ticketId && (
        <Elements stripe={stripePromise}>
          <CardCheckoutForm type="ticket" ticketId={ticketId} />
        </Elements>
      )}

      {/* <form */}
      {/*   className="mt-4" */}
      {/*   onSubmit={(e) => { */}
      {/*     e.preventDefault(); */}
      {/*     resetStatus(); */}
      {/*     goNext(); */}
      {/*   }} */}
      {/* > */}
      {/*   <FieldSet> */}
      {/*     <FieldGroup> */}
      {/*       <Field> */}
      {/*         <FieldLabel htmlFor="name">Cardholder Name</FieldLabel> */}
      {/*         <Input */}
      {/*           id="name" */}
      {/*           autoComplete="off" */}
      {/*           placeholder="Enter Full Name" */}
      {/*         /> */}
      {/*       </Field> */}
      {/**/}
      {/*       <Field> */}
      {/*         <FieldLabel htmlFor="card-number">Card Number</FieldLabel> */}
      {/*         <Input */}
      {/*           id="card-number" */}
      {/*           autoComplete="off" */}
      {/*           placeholder="1234 2134 6874 2314" */}
      {/*         /> */}
      {/*       </Field> */}
      {/*     </FieldGroup> */}
      {/**/}
      {/*     <FieldGroup className="flex-row"> */}
      {/*       <Field> */}
      {/*         <FieldLabel htmlFor="expiry-date">Expiry Date</FieldLabel> */}
      {/*         <Input id="expiry-date" autoComplete="off" placeholder="MM/YY" /> */}
      {/*       </Field> */}
      {/**/}
      {/*       <Field> */}
      {/*         <FieldLabel htmlFor="cvc">CVC</FieldLabel> */}
      {/*         <Input id="cvc" autoComplete="off" placeholder="123" /> */}
      {/*       </Field> */}
      {/*     </FieldGroup> */}
      {/*   </FieldSet> */}
      {/**/}
      {/*   <Button variant="primary" className="mt-8 w-full"> */}
      {/*     Continue to Payment */}
      {/*   </Button> */}
      {/* </form> */}
    </div>
  );
}
