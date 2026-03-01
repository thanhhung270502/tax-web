"use client";

import { useCallback, useRef, useState } from "react";
import type { UploadFileRequest } from "@common";
import { BaseHandlerAction } from "@common";
import { toast } from "sonner";

import type { EAllowedFileTypes } from "@/shared";
import {
  EUploadFileStatus,
  fileToBase64,
  isAllowedMimeType,
  useUploadFileMutation,
  validateFile,
} from "@/shared";
import type { TLoginSession, TUploadFile } from "@/shared/types";

type UseUploadProps = {
  folderId?: string;
  loginSession: TLoginSession;
  onUploadComplete?: () => void;
};

export const useUpload = ({ folderId, loginSession, onUploadComplete }: UseUploadProps) => {
  const [uploadFiles, setUploadFiles] = useState<TUploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Use ref to avoid stale closure in progress callback
  const uploadFilesRef = useRef<TUploadFile[]>([]);
  uploadFilesRef.current = uploadFiles;

  const uploadFileMutation = useUploadFileMutation();

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const addFiles = useCallback((files: File[]) => {
    const validFiles: TUploadFile[] = [];
    const rejectedFiles: string[] = [];

    files.forEach((file) => {
      const validation = validateFile(file);

      if (!validation.valid) {
        rejectedFiles.push(`${file.name} (${validation.error})`);
        return;
      }

      // Check for duplicates
      const isDuplicate = uploadFilesRef.current.some((f) => f.name === file.name);
      if (isDuplicate) {
        rejectedFiles.push(`${file.name} (duplicate)`);
        return;
      }

      // Safe to cast since validateFile already checked the type
      if (!isAllowedMimeType(file.type)) {
        return;
      }

      validFiles.push({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type as EAllowedFileTypes,
        status: EUploadFileStatus.PENDING,
        progress: 0,
      });
    });

    if (rejectedFiles.length > 0) {
      toast.error(`Files rejected: ${rejectedFiles.join(", ")}`);
    }

    if (validFiles.length > 0) {
      setUploadFiles((prev) => [...prev, ...validFiles]);
    }
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  const updateFileStatus = useCallback(
    (fileId: string, status: EUploadFileStatus, progress?: number) => {
      setUploadFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status, progress: progress ?? f.progress } : f))
      );
    },
    []
  );

  const handleUpload = useCallback(async () => {
    const filesToUpload = uploadFilesRef.current;
    if (filesToUpload.length === 0) return;

    setIsUploading(true);
    filesToUpload.forEach((f) => updateFileStatus(f.id, EUploadFileStatus.UPLOADING, 0));

    try {
      const parsedFiles = await Promise.all(
        filesToUpload.map(async (f) => {
          return {
            fileName: f.name,
            mimeType: f.type,
            base64Data: await fileToBase64(f.file),
          };
        })
      );

      await Promise.all(
        parsedFiles.map((f) => {
          const base64Data = f.base64Data.split(",")[1];
          if (!base64Data) {
            toast.error("Failed to convert file to base64");
            return;
          }
          const request: UploadFileRequest = {
            action: BaseHandlerAction.UPLOAD_FILE,
            email: loginSession.email,
            sessionToken: loginSession.sessionToken,
            folderId,
            fileName: f.fileName,
            mimeType: f.mimeType,
            base64Data: base64Data,
          };
          return uploadFileMutation.mutateAsync(request);
        })
      );

      filesToUpload.forEach((f) => updateFileStatus(f.id, EUploadFileStatus.SUCCESS, 100));
      setUploadFiles([]);
      onUploadComplete?.();
    } catch {
      // Error already handled by mutation hooks via onError callbacks
      uploadFilesRef.current
        .filter((f) => f.status === EUploadFileStatus.UPLOADING)
        .forEach((f) => updateFileStatus(f.id, EUploadFileStatus.ERROR));
    } finally {
      setIsUploading(false);
    }
  }, [folderId, loginSession, onUploadComplete, updateFileStatus, uploadFileMutation]);

  const resetUpload = useCallback(() => {
    setUploadFiles([]);
  }, []);

  return {
    uploadFiles,
    isUploading,
    addFiles,
    removeFile,
    handleUpload,
    resetUpload,
    hasFiles: uploadFiles.length > 0,
    allFilesReady: uploadFiles.every((f) => f.status === EUploadFileStatus.PENDING),
  };
};
