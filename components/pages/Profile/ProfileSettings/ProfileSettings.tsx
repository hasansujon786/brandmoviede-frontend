"use client";

import Avatar from "@/components/shared/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createQueryParams } from "@/lib/utils/formatters";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProfileSettingsForm from "./ProfileSettingsForm";

export default function ProfileSettings() {
  const { data } = useGetMeQuery();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("mode") == "edit-profile";
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card className="">
      <CardContent>
        {isEditMode ? (
          <ProfileSettingsForm pathname={pathname} />
        ) : (
          <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <Avatar avatar={data?.avatar_url} />
            <div className="space-y-1">
              <p className="text-heading-100 text-base font-medium">
                {data?.name}
              </p>
              <p className="text-sm text-[#717182]">{data?.email}</p>
            </div>

            <Button
              variant="primary"
              className="absolute top-0 right-0"
              onClick={() =>
                router.replace(
                  `${pathname}/${createQueryParams({ mode: "edit-profile" })}`,
                )
              }
            >
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
