"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BaseHandlerAction } from "@common";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { logger } from "@/libs/logger";
import { useCreateFolderMutation } from "@/shared";
import type { TLoginSession } from "@/shared/types";

const CreateFolderSchema = z.object({
  folderName: z.string().min(1),
});
export type CreateFolderFormValues = z.infer<typeof CreateFolderSchema>;

type UseCreateFolderProps = {
  folderId?: string;
  loginSession: TLoginSession;
};

export const useCreateFolder = ({ folderId, loginSession }: UseCreateFolderProps) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<CreateFolderFormValues>({
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const createFolderMutation = useCreateFolderMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await createFolderMutation.mutateAsync({
        action: BaseHandlerAction.CREATE_FOLDER,
        folderName: data.folderName,
        parentFolderId: folderId,
        email: loginSession.email,
        sessionToken: loginSession.sessionToken,
      });
      if (!response.success) return;
      setOpen(false);
    } catch (error) {
      logger.error(`Failed to create folder: ${error}`);
    }
  });

  return {
    open,
    setOpen,
    onSubmit,
    methods,
    isLoading: createFolderMutation.isPending,
  };
};
export type UseCreateFolderReturn = ReturnType<typeof useCreateFolder>;
