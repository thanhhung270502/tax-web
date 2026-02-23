"use client";

import { useEffect } from "react";
import { useRouter } from "@bprogress/next/app";

import { CenterCard, ClientRoutes, Separator, STORAGE_KEYS, Typography } from "@/shared";
import { StorageService } from "@/shared/services";

import { ProfileForm } from "../components";
import { useProfile } from "../hooks";

export const ProfilePage = () => {
  const methods = useProfile();
  const router = useRouter();

  useEffect(() => {
    const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
    if (loginSession.isEmpty) {
      router.push(ClientRoutes.Login);
    }
  }, [router]);

  return (
    <CenterCard className="max-w-full p-0!" wrapperClassName="bg-secondary p-8xl">
      <div className="flex flex-col">
        <div className="gap-sm px-6xl py-4xl flex flex-col">
          <Typography variant="heading-xl" weight="semibold">
            Profile
          </Typography>
          <Typography variant="body-lg" color="secondary">
            Complete your profile information below
          </Typography>
        </div>

        <Separator />

        <ProfileForm {...methods} />
      </div>
    </CenterCard>
  );
};
