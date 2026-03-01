"use client";

import { PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/shared";

export const UploadFileButton = () => {
  return (
    <Button
      variant="outlined-primary"
      size="sm"
      startIcon={PlusIcon}
      className="w-fit rounded-full"
    >
      Upload Files
    </Button>
  );
};
