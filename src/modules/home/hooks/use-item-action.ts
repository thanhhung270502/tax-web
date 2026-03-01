"use client";

import { useCallback, useState } from "react";
import { BaseHandlerAction, type TFileOrFolderItem } from "@common";

import { logger } from "@/libs/logger";
import { useDeleteFileMutation } from "@/shared";
import type { TLoginSession } from "@/shared/types";

type UseItemActionProps = {
  item: TFileOrFolderItem;
  loginSession: TLoginSession;
};

export const useItemAction = ({ item, loginSession }: UseItemActionProps) => {
  const [open, setOpen] = useState(false);
  const deleteFileMutation = useDeleteFileMutation();

  const handleRemove = useCallback(async () => {
    try {
      await deleteFileMutation.mutateAsync({
        fileId: item.id,
        action: BaseHandlerAction.DELETE_FILE,
        email: loginSession.email,
        sessionToken: loginSession.sessionToken,
      });
      setOpen(false);
    } catch (error) {
      logger.error(`Failed to delete file ${item.id}: ${error}`);
    }
  }, [deleteFileMutation, item.id, loginSession.email, loginSession.sessionToken]);

  return {
    open,
    setOpen,
    handleRemove,
    isDeleting: deleteFileMutation.isPending,
  };
};
export type UseItemActionReturn = ReturnType<typeof useItemAction>;
