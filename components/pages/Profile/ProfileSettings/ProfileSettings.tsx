"use client";

import Avatar from "@/components/shared/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import { createQueryParams } from "@/lib/utils/formatters";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProfileSettingsForm from "./ProfileSettingsForm";

export default function ProfileSettings() {
  const { data } = useGetMeQuery();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("mode") == "edit";

  return (
    <div className="bg-card rounded-2xl px-4 py-4 lg:py-8">
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

          <Button variant="primary" className="absolute top-0 right-0">
            <Link
              href={`/profile/settings${createQueryParams({ mode: "edit" })}`}
            >
              Edit Profile
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
