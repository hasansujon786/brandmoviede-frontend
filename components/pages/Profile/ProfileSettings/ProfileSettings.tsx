import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export default function ProfileSettings() {
  return (
    <div className="bg-card rounded-2xl px-4 py-4 lg:py-8">
      <div className="flex items-center gap-6">
        <div className="bg-primary-50 text-primary flex size-16 items-center justify-center rounded-full">
          <User className="size-8" />
        </div>
        <div className="space-y-1">
          <p className="text-heading-100 text-base font-medium">John Doe</p>
          <p className="text-sm text-[#717182]">john.doe@example.com</p>
        </div>
      </div>

      <form className="mt-4">
        <FieldSet>
          <FieldGroup className="md:flex-row">
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input
                className="bg-primary-100 border-primary-100"
                id="first-name"
                autoComplete="off"
                placeholder="Enter your first name"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input
                className="bg-primary-100 border-primary-100"
                id="last-name"
                autoComplete="off"
                placeholder="Enter your first name"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                className="bg-primary-100 border-primary-100"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="member-since">Member Since</FieldLabel>
              <Input
                className="bg-primary-100 border-primary-100"
                id="member-since"
                autoComplete="off"
                placeholder="Enter date"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button variant="primary" className="mt-8 w-full sm:w-auto">
          Edit Profile
        </Button>
      </form>
    </div>
  );
}
