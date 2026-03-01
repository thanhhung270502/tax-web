"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { CenterCard, ClientRoutes, Separator, STORAGE_KEYS, Typography } from "@/shared";
import { StorageService } from "@/shared/services";
import type { TLoginSession } from "@/shared/types";

import { CreateYearsFolder } from "../components/create-years-folder";

export const NewTaxPage = () => {
  const [loginSessionData, setLoginSessionData] = useState<TLoginSession | null>(null);

  useEffect(() => {
    const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
    if (loginSession.isEmpty) {
      redirect(ClientRoutes.Login);
    }

    const loginSessionData = loginSession.value
      ? (loginSession.value as unknown as TLoginSession)
      : null;

    if (!loginSessionData) {
      redirect(ClientRoutes.Login);
    }
    setLoginSessionData(loginSessionData);
  }, []);

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

        {loginSessionData && <CreateYearsFolder loginSession={loginSessionData} />}
      </div>
    </CenterCard>
  );
};
