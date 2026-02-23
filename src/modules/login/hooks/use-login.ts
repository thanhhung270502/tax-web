"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { EmailHandlerAction } from "@common";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { logger } from "@/libs/logger";
import { useProfileHandlerMutation } from "@/shared";

import { LoginSteps } from "../enums";

const LoginFormSchema = z.object({
  email: z.string().email(),
  otp: z.array(z.string()),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type UseLoginReturn = ReturnType<typeof useLogin>;
export const useLogin = () => {
  const [step, setStep] = useState(LoginSteps.EMAIL);
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      otp: ["", "", "", "", "", ""],
    },
  });

  const profileHandlerMutation = useProfileHandlerMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (step === LoginSteps.EMAIL) {
        await profileHandlerMutation.mutateAsync({
          action: EmailHandlerAction.SEND_OTP,
          email: data.email,
        });
        setStep(LoginSteps.OTP);
      }
    } catch (error) {
      logger.error(`Failed to send OTP: ${error}`);
    }
  });

  return { methods, onSubmit, isSubmitting: profileHandlerMutation.isPending, step, setStep };
};
