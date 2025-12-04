"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SupportMessageForm() {
  return (
    <div className="flex flex-col">
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Send Us a Message
      </h5>
      {/* <p className="mt-3 text-xl"> */}
      {/*   Your payment details are encrypted and secure. */}
      {/* </p> */}
      <form className="mt-4 flex flex-1 flex-col">
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
              <FieldLabel htmlFor="card-number">Email</FieldLabel>
              <Input
                id="email"
                autoComplete="off"
                placeholder="your.email@example.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                autoComplete="off"
                placeholder="What can we help you with?"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                autoComplete="off"
                placeholder="Tell us more about your inquiry..."
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="mt-auto">
          <Button variant="primary" className="mt-8 w-full">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
