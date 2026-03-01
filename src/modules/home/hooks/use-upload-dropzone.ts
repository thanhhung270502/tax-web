"use client";

import { useCallback, useRef } from "react";
import { toast } from "sonner";

import { validateFile } from "@/shared";

type FileValidationResult = {
  validFiles: File[];
  invalidFiles: { file: File; reason: string }[];
};

const validateFiles = (files: File[]): FileValidationResult => {
  const validFiles: File[] = [];
  const invalidFiles: { file: File; reason: string }[] = [];

  files.forEach((file) => {
    const { valid, error } = validateFile(file);

    if (!valid && error) {
      invalidFiles.push({ file, reason: error });
      return;
    }

    if (valid) {
      validFiles.push(file);
    }
  });

  return { validFiles, invalidFiles };
};

const showValidationErrors = (invalidFiles: { file: File; reason: string }[]) => {
  if (invalidFiles.length === 0) return;

  if (invalidFiles.length === 1) {
    const firstFile = invalidFiles[0];
    if (firstFile) {
      toast.info(`"${firstFile.file.name}" ${firstFile.reason}`);
    }
  } else {
    const errorMessage = invalidFiles
      .map(({ file, reason }) => `• ${file.name}: ${reason}`)
      .join("\n");
    toast.info(`${invalidFiles.length} files could not be uploaded:\n${errorMessage}`);
  }
};

export const useUploadDropzone = (onFilesAdded: (files: File[]) => void) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (files: File[]) => {
      const { validFiles, invalidFiles } = validateFiles(files);

      showValidationErrors(invalidFiles);

      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    },
    [onFilesAdded]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(Array.from(selectedFiles));
      }
      // Reset input to allow re-selecting the same files
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [processFiles]
  );

  const handleBrowseClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return {
    inputRef,
    handleBrowseClick,
    handleFileChange,
  };
};
