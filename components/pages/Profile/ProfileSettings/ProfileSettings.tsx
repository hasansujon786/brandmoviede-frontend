"use client";

import Avatar from "@/components/shared/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import { createQueryParams } from "@/lib/utils/formatters";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ProfileSettingsForm from "./ProfileSettingsForm";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileSettings() {
  const { data } = useGetMeQuery();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("mode") == "edit";
  const pathname = usePathname();

  return (
    <Card className="">
      <CardContent>
        {isEditMode ? (
          <ProfileSettingsForm />
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
              asChild
              variant="primary"
              className="absolute top-0 right-0"
            >
              <Link href={`${pathname}/${createQueryParams({ mode: "edit" })}`}>
                Edit Profile
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
