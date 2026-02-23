"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "@bprogress/next/app";
import { EmailHandlerAction, type SaveProfileRequest } from "@common";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { logger } from "@/libs/logger";
import { ClientRoutes, STORAGE_KEYS, useProfileHandlerMutation } from "@/shared";
import { StorageService } from "@/shared/services";
import type { TLoginSession } from "@/shared/types";

const ProfileFormSchema = z.object({
  accountType: z.string(),
  language: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  ssn: z.string(),
  dob: z.string(),
  filingStatus: z.string(),
  country: z.string(),
  address: z.string(),
  state: z.string(),
  city: z.string(),
  zipcode: z.string(),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export type UseProfileReturn = ReturnType<typeof useProfile>;
export const useProfile = () => {
  const router = useRouter();
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      accountType: "",
      language: "",
      firstName: "",
      lastName: "",
      phone: "",
      ssn: "",
      dob: "",
      filingStatus: "",
      country: "",
      address: "",
      state: "",
      city: "",
      zipcode: "",
    },
  });

  const profileHandlerMutation = useProfileHandlerMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    const loginSession = StorageService.getItem(STORAGE_KEYS.LOGIN_SESSION.key);
    if (loginSession.isEmpty) {
      toast.error("Please login again");
      router.push(ClientRoutes.Login);
      return;
    }
    const loginSessionData = loginSession.value
      ? (loginSession.value as unknown as TLoginSession)
      : null;
    if (!loginSessionData) {
      toast.error("Please login again");
      router.push(ClientRoutes.Login);
      return;
    }
    try {
      const request: SaveProfileRequest = {
        sessionToken: loginSessionData.sessionToken,
        email: loginSessionData.email,
        profile: {
          accountType: data.accountType,
          language: data.language,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          ssn: data.ssn,
          dob: data.dob,
          filingStatus: data.filingStatus,
          country: data.country,
          address: data.address,
          state: data.state,
          city: data.city,
          zipcode: data.zipcode,
        },
      };
      const response = await profileHandlerMutation.mutateAsync({
        action: EmailHandlerAction.SAVE_PROFILE,
        ...request,
      });
      if (response.success) {
        StorageService.removeItem(STORAGE_KEYS.LOGIN_SESSION.key);
        router.push(ClientRoutes.Login);
      }
    } catch (error) {
      logger.error(`Failed to send OTP: ${error}`);
    }
  });

  return { methods, onSubmit, isSubmitting: profileHandlerMutation.isPending };
};
