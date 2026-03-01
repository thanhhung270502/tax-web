"use client";

import type { ChangeEvent } from "react";
import React from "react";
import { UploadIcon } from "@phosphor-icons/react";
import { cn } from "@tailwind-config/utils/cn";
import { toast } from "sonner";

import { ACCEPT_FILE_TYPES } from "../constants";
import type { TFileSize } from "../types";
import { checkFile, convertToAcceptFiles } from "../utils";
import { Button, Typography } from "..";

type UploadFilesProps = {
  acceptFileTypes?: string[];
  maxSize?: TFileSize;
  onUploadFiles: (files: File[]) => void;
  showUploaded?: boolean;
  children?: React.ReactNode;
  renderContentBeforeUploading?: React.ReactNode;
  renderContentDragOver?: React.ReactNode;
  renderProgress?: React.ReactNode;
  fullSize?: boolean;
  contentBeforeUploadingClassName?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

export function UploadFiles({
  acceptFileTypes = ACCEPT_FILE_TYPES,
  maxSize,
  onUploadFiles,
  showUploaded = false,
  children,
  renderContentBeforeUploading,
  renderContentDragOver,
  renderProgress,
  fullSize = true,
  contentBeforeUploadingClassName,
  inputRef: inputRefProp,
}: UploadFilesProps) {
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergedInputRef = inputRefProp || inputRef;

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleChangeFiles = (fileList: FileList) => {
    const files = Array.from(fileList);
    const validFiles: File[] = [];

    for (const file of files) {
      const { isValid, error } = checkFile({ file, acceptFileTypes, maxSize });

      if (!isValid) {
        toast.error(`${file.name}: ${error || "Invalid file"}`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onUploadFiles(validFiles);
    }

    if (mergedInputRef.current) {
      mergedInputRef.current.value = "";
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleChangeFiles(droppedFiles);
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const selectedFiles = target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleChangeFiles(selectedFiles);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      mergedInputRef.current?.click();
    }
  };

  const handleClick = () => {
    mergedInputRef.current?.click();
  };

  const renderDragOver = () => {
    if (!isDragOver) return null;
    if (renderContentDragOver) return renderContentDragOver;
    return (
      <div className="bg-tertiary absolute top-0 flex h-full w-full items-center justify-center gap-2">
        <UploadIcon size={"2rem"} className="text-quaternary" />
        <Typography variant="body-md" className="text-quaternary">
          Upload images
        </Typography>
      </div>
    );
  };

  const renderContent = () => {
    if (showUploaded) return children;
    return (
      <div
        className={cn(
          "border-secondary flex h-full w-full flex-col items-center justify-center gap-1 rounded border",
          contentBeforeUploadingClassName
        )}
      >
        {renderContentBeforeUploading ? (
          renderContentBeforeUploading
        ) : (
          <>
            <Typography variant="body-sm" className="text-tertiary">
              Drag and drop files here
            </Typography>
            <Typography variant="body-sm" className="text-tertiary">
              OR
            </Typography>
            <Button size="sm">Browse files</Button>
          </>
        )}
        {renderProgress && (
          <div className="bg-secondary absolute inset-0 top-0 left-0 z-10 h-full w-full">
            {renderProgress}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onKeyDown={handleKeyDown}
      className={cn("relative cursor-pointer p-0", fullSize && "h-full w-full")}
    >
      {renderContent()}
      <input
        className="hidden"
        type="file"
        id="browse-multiple"
        ref={mergedInputRef}
        onChange={onChangeFile}
        accept={convertToAcceptFiles(acceptFileTypes)}
        multiple
      />
      {renderDragOver()}
    </div>
  );
}
