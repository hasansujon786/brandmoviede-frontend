import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockWithKey } from "@/components/shared/icons/LockIcon";
import { ChevronRight } from "@/components/shared/icons/chevron";
import CreditCardIcon from "@/components/shared/icons/CreditCardIcon";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SecurityCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5">
          <div className="text-primary flex size-12 items-center justify-center rounded-full bg-[#F8C0CC]">
            <LockWithKey />
          </div>
          <div className="mr-auto">
            <p className="text-heading-100">Two Factor Authentication</p>
            <p className="text-sm">Secure your Admin Account</p>
          </div>
          <div className="flex items-center">
            <Switch checked id="two-factor-authentication" />
            <Label className="sr-only" htmlFor="two-factor-authentication">
              Airplane Mode
            </Label>
          </div>
        </div>

        <div className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5">
          <div className="text-primary flex size-12 items-center justify-center rounded-full bg-[#F8C0CC]">
            <CreditCardIcon />
          </div>
          <div className="mr-auto">
            <p className="text-heading-100">Payment Gateway</p>
            <p className="text-sm">Manage your Payment Gateway</p>
          </div>
          <div className="text-body-200 flex items-center justify-center">
            <ChevronRight className="mr-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
