"use client";

import { useEffect } from "react";
import { useRouter } from "@bprogress/next/app";

import { ClientRoutes, STORAGE_KEYS } from "@/shared";
import { StorageService } from "@/shared/services";
import type { TLoginSession } from "@/shared/types";

import { LoginSteps } from "../enums";
import { useLogin } from "../hooks";

import { EmailStepPage, OtpStepPage } from ".";

export const LoginPage = () => {
  const router = useRouter();
  const loginMethods = useLogin();
  const { step } = loginMethods;

  useEffect(() => {
    const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
    if (loginSession.value) {
      const loginSessionData = loginSession.value as unknown as TLoginSession;
      if (new Date(loginSessionData.expiresAt) > new Date()) {
        router.push(ClientRoutes.Profile);
      }
    }
  }, [router]);

  switch (step) {
    case LoginSteps.EMAIL:
      return <EmailStepPage {...loginMethods} />;
    case LoginSteps.OTP:
      return <OtpStepPage {...loginMethods} />;
    default:
      return null;
  }
};
