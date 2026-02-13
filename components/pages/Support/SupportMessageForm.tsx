"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSendEmailToSupportMutation } from "@/redux/features/app/supportApi";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

/* ------------------ Zod Schema ------------------ */
const emailContactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type EmailContactParms = z.infer<typeof emailContactSchema>;

export default function SupportMessageForm() {
  const [sendEmail, { isLoading }] = useSendEmailToSupportMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: emailContactSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await sendEmail(value).unwrap();
        form.reset();
        toast.success("Email send successfully");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to send message:"));
      }
    },
  });

  return (
    <div className="flex flex-col">
      <h5 className="text-heading-200 slide-up font-heading text-3xl font-semibold">
        Send Us a Message
      </h5>

      <form
        className="slide-up mt-4 flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldSet>
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="name">Cardholder Name</FieldLabel>
                  <Input
                    id="name"
                    autoComplete="off"
                    placeholder="Enter Full Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    autoComplete="off"
                    placeholder="your.email@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Subject */}
            <form.Field name="subject">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input
                    id="subject"
                    autoComplete="off"
                    placeholder="What can we help you with?"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Message */}
            <form.Field name="message">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    autoComplete="off"
                    placeholder="Tell us more about your inquiry..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </FieldSet>

        <div className="mt-auto">
          <Button
            type="submit"
            variant="primary"
            className="mt-8 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
