"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "@bprogress/next/app";
import { BaseHandlerAction } from "@common";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { logger } from "@/libs/logger";
import { ClientRoutes, useSaveTaxYearsMutation } from "@/shared";
import type { TLoginSession } from "@/shared/types";

const CreateYearsFolderSchema = z.object({
  years: z.array(z.number()),
});
export type CreateYearsFolderFormValues = z.infer<typeof CreateYearsFolderSchema>;

type UseCreateYearsFolderProps = {
  loginSession: TLoginSession;
};

export const useCreateYearsFolder = ({ loginSession }: UseCreateYearsFolderProps) => {
  const router = useRouter();
  const methods = useForm<CreateYearsFolderFormValues>({
    resolver: zodResolver(CreateYearsFolderSchema),
    defaultValues: {
      years: [],
    },
  });

  const saveTaxYearsMutation = useSaveTaxYearsMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await saveTaxYearsMutation.mutateAsync({
        action: BaseHandlerAction.SAVE_TAX_YEARS,
        years: data.years,
        email: loginSession.email,
        sessionToken: loginSession.sessionToken,
      });
      if (!response.success) return;
      router.push(ClientRoutes.Home);
    } catch (error) {
      logger.error(`Failed to save tax years: ${error}`);
    }
  });

  return {
    onSubmit,
    methods,
    isLoading: saveTaxYearsMutation.isPending,
  };
};
export type UseCreateYearsFolderReturn = ReturnType<typeof useCreateYearsFolder>;
