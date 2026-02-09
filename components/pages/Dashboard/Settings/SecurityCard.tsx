"use client";

import { ChevronRight } from "@/components/shared/icons/chevron";
import LockIcon from "@/components/shared/icons/LockIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createQueryParams } from "@/lib/utils/formatters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PasswordSettingsForm from "./PasswordSettingsForm";

export default function SecurityCard() {
  const searchParams = useSearchParams();

  const isChangePassword = searchParams.get("mode") == "change-password";
  const isEditMode = isChangePassword;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* <div className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5"> */}
        {/*   <div className="text-primary flex size-12 items-center justify-center rounded-full bg-[#F8C0CC]"> */}
        {/*     <LockWithKeyIcon /> */}
        {/*   </div> */}
        {/*   <div className="mr-auto"> */}
        {/*     <p className="text-heading-100">Two Factor Authentication</p> */}
        {/*     <p className="text-sm">Secure your Admin Account</p> */}
        {/*   </div> */}
        {/*   <div className="flex items-center"> */}
        {/*     <Switch checked id="two-factor-authentication" /> */}
        {/*     <Label className="sr-only" htmlFor="two-factor-authentication"> */}
        {/*       Airplane Mode */}
        {/*     </Label> */}
        {/*   </div> */}
        {/* </div> */}

        {!isEditMode ? (
          <button
            onClick={() =>
              router.replace(
                `${pathname}/${createQueryParams({ mode: "change-password" })}`,
              )
            }
            className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5"
          >
            <div className="text-primary flex size-12 items-center justify-center rounded-full bg-[#F8C0CC]">
              <LockIcon className="size-5" />
            </div>
            <div className="mr-auto text-left">
              <p className="text-heading-100">Change password</p>
              <p className="text-sm">Create a new password for your account</p>
            </div>
            <div className="text-body-200 flex items-center justify-center">
              <ChevronRight className="mr-1" />
            </div>
          </button>
        ) : null}

        {isChangePassword ? <PasswordSettingsForm pathname={pathname} /> : null}
      </CardContent>
    </Card>
  );
}
