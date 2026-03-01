"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";

import { Button, FILE_UPLOAD, MODAL_DIMENSIONS, SHEET_DIMENSIONS, useSmaller } from "@/shared";

import type { UseUploadDialogReturn } from "../../hooks";
import { useUploadDropzone } from "../../hooks";
import { UploadFileItem } from "..";

type UploadContentProps = UseUploadDialogReturn;

export const UploadContent = ({
  uploadFiles,
  handleFilesAdded,
  removeFile,
  handleUpload,
  isUploading,
}: UploadContentProps) => {
  const isMobile = useSmaller("sm");
  const { inputRef, handleFileChange, handleBrowseClick } = useUploadDropzone(handleFilesAdded);

  return (
    <>
      <div
        className={cn(
          "px-4xl py-3xl gap-4xl flex flex-col overflow-y-auto",
          isMobile ? SHEET_DIMENSIONS.DEFAULT : MODAL_DIMENSIONS.FILE_UPLOAD_CONTENT
        )}
      >
        <Button
          variant="outlined-primary"
          startIcon={PlusIcon}
          className="w-fit rounded-full"
          onClick={handleBrowseClick}
        >
          Upload Files
        </Button>
        {uploadFiles.map((file) => (
          <UploadFileItem key={file.id} file={file} onRemove={() => removeFile(file.id)} />
        ))}
      </div>
      <div
        className={cn(
          "gap-lg px-4xl py-3xl border-secondary flex justify-start border-t",
          isMobile ? "flex-col" : "flex-row"
        )}
      >
        <Button type="button" onClick={handleUpload} loading={isUploading}>
          Save & Close
        </Button>
        <Button variant="outlined-gray" type="button" disabled={isUploading}>
          Cancel
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={FILE_UPLOAD.ACCEPT_ATTRIBUTE}
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload files to patient drive"
      />
    </>
  );
};
