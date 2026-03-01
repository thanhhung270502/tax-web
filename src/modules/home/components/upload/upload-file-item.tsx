"use client";

import { XIcon } from "@phosphor-icons/react";

import { Button } from "@/shared/components";
import type { TUploadFile } from "@/shared/types";

import { RendererFileIcon, RendererFileName } from "..";

type UploadFileItemProps = {
  file: TUploadFile;
  onRemove: () => void;
  disabled?: boolean;
};

export const UploadFileItem = ({ file, onRemove, disabled = false }: UploadFileItemProps) => {
  return (
    <div className="gap-md flex min-w-0 items-center">
      <RendererFileIcon fileName={file.name} size="sm" />

      <RendererFileName fileName={file.name} status={file.status} />

      <Button
        variant="outlined-gray"
        onClick={onRemove}
        disabled={disabled}
        startIcon={<XIcon size="16" />}
        iconOnly
      />
    </div>
  );
};
