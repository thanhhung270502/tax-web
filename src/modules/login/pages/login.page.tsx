"use client";

import { LoginSteps } from "../enums";
import { useLogin } from "../hooks";

import { EmailStepPage, OtpStepPage } from ".";

export const LoginPage = () => {
  const loginMethods = useLogin();
  const { step } = loginMethods;

  switch (step) {
    case LoginSteps.EMAIL:
      return <EmailStepPage {...loginMethods} />;
    case LoginSteps.OTP:
      return <OtpStepPage {...loginMethods} />;
    default:
      return null;
  }
};
