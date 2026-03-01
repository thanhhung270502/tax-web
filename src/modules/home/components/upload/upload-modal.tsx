"use client";

import { XIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  MODAL_DIMENSIONS,
} from "@/shared";

import type { UseUploadDialogReturn } from "../../hooks";
import { UploadContent } from "..";

type UploadModalProps = UseUploadDialogReturn;

export const UploadModal = (props: UploadModalProps) => {
  const { open, handleOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(MODAL_DIMENSIONS.FILE_UPLOAD, "transition-all duration-300")}>
        <div className="py-xl px-4xl border-secondary flex items-center justify-between border-b">
          <DialogTitle className="text-primary text-lg font-semibold">Upload</DialogTitle>
          <DialogDescription className="sr-only">
            Upload files to the patient drive
          </DialogDescription>
          <DialogClose
            nativeButton={false}
            render={<XIcon size={"1.25rem"} className="text-quaternary cursor-pointer outline-0" />}
          />
        </div>

        <UploadContent {...props} />
      </DialogContent>
    </Dialog>
  );
};
