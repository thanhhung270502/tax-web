"use client";

import { useCallback, useState } from "react";

import type { TLoginSession } from "@/shared/types";

import { useUpload } from "./use-upload";

type UseUploadDialogProps = {
  folderId?: string;
  loginSession: TLoginSession;
};

export type UseUploadDialogReturn = ReturnType<typeof useUploadDialog>;

export const useUploadDialog = ({ folderId, loginSession }: UseUploadDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleUploadComplete = useCallback(() => {
    setOpen(false);
  }, []);

  const uploadHook = useUpload({
    folderId,
    onUploadComplete: handleUploadComplete,
    loginSession,
  });

  const handleFilesAdded = useCallback(
    (files: File[]) => {
      uploadHook.addFiles(files);
    },
    [uploadHook]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!uploadHook.isUploading) {
        // Reset state when opening or closing to ensure fresh state
        uploadHook.resetUpload();
        setOpen(open);
      }
    },
    [uploadHook]
  );

  const handleSaveAndClose = useCallback(async () => {
    await uploadHook.handleUpload();
  }, [uploadHook]);

  return {
    // Dialog state
    open,
    setOpen,
    handleOpenChange,

    // Upload state from hook
    ...uploadHook,

    // Combined handlers
    handleFilesAdded,
    handleSaveAndClose,
  };
};
