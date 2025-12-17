import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function PlatformPreferencesCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Platform Preferences</CardTitle>
      </CardHeader>
      <CardContent className="">
        <form className="mt-4">
          <FieldSet>
            <FieldGroup className="md:flex-row">
              <Field>
                <FieldLabel htmlFor="platform-name">Platform Name</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id="platform-name"
                  autoComplete="off"
                  placeholder="Enter platform name"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-email">Contact Email</FieldLabel>
                <Input
                  className="bg-primary-100 border-primary-100"
                  id="contact-email"
                  autoComplete="off"
                  placeholder="Enter your contact email"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
