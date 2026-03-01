import type { EAllowedFileTypes, EUploadFileStatus } from "@/shared";

export type TFileSize = {
  number: number;
  unit: string;
};

export type TUploadFile = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: EAllowedFileTypes;
  status: EUploadFileStatus;
  progress: number;
  error?: string;
};
