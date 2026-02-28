import type { FileSize } from "../types";

import { asError } from "./error.util";

export const DEFAULT_ACCEPT_FILES = ["*"];

export const convertToAcceptFiles = (acceptFiles: string[]) => {
  return acceptFiles.map((type) => (type !== "*" ? `.${type}` : type)).join(",");
};

/**
 * Get file extension from a file name string
 * @param fileName - The file name string (e.g., "document.pdf")
 * @returns The lowercase extension without the dot, or empty string if no extension
 */
export const getFileExtensionFromName = (fileName: string): string => {
  if (!fileName) return "";
  const parts = fileName.split(".");
  if (parts.length < 2) return "";
  return parts.pop()?.toLowerCase() || "";
};

export const removeFileExtension = (fileName: string): string => {
  const fileNameWithoutQuery = fileName.split("?")[0] ?? fileName;

  const lastDotIndex = fileNameWithoutQuery.lastIndexOf(".");
  return lastDotIndex > 0 ? fileNameWithoutQuery.substring(0, lastDotIndex) : fileNameWithoutQuery;
};

export const getFileExtension = (fileName: string): string | null => {
  const fileNameWithoutQuery = fileName.split("?")[0] ?? fileName;

  const lastDotIndex = fileNameWithoutQuery.lastIndexOf(".");
  return lastDotIndex > 0 ? fileNameWithoutQuery.substring(lastDotIndex + 1) : null;
};

/**
 * Get file extension from a File object
 * @param file - The File object
 * @returns The lowercase extension without the dot, or undefined if no extension
 */
export const fileExtension = (file: File): string | undefined => {
  if (!file || !file.name) {
    return undefined;
  }
  return getFileExtensionFromName(file.name) || undefined;
};

export const convertToBytes = (size: number, unit: string) => {
  const units: { [key: string]: number } = {
    B: 1,
    KB: 1024 ** 1,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };

  const unitValue = units[unit];
  if (unitValue === undefined) {
    throw new Error(`Invalid unit: ${unit}`);
  }
  return size * unitValue;
};

export const isValidFileSize = (uploadFile: File, size: FileSize) => {
  if (!uploadFile || uploadFile.size === undefined) {
    return false;
  }
  return uploadFile.size <= convertToBytes(size.number, size.unit);
};

export const isValidFileType = (file: File, validTypes: string[]) => {
  if (validTypes.includes("*")) return true;

  const extension = fileExtension(file);
  if (!extension) {
    return false;
  }
  return validTypes.includes(extension);
};

export const checkFile = ({
  file,
  acceptFileTypes,
  maxSize,
}: {
  file?: File;
  acceptFileTypes: string[];
  maxSize?: FileSize;
}) => {
  if (!file) {
    return { isValid: false, error: "No files provided" };
  }

  if (file.type.toLowerCase().includes("heic")) {
    return {
      isValid: false,
      error:
        "If you are using an Apple device, please turn off live photo mode in the camera settings.",
    };
  }

  if (!isValidFileType(file, acceptFileTypes)) {
    return { isValid: false, error: "Not valid file type" };
  }
  if (maxSize && !isValidFileSize(file, maxSize)) {
    return { isValid: false, error: "File exceeds the size limit" };
  }

  return { isValid: true, error: "" };
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(asError("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(asError(error));
  });
};

export const base64ToFile = (base64: string, fileName: string, fileType: string): File => {
  const base64Parts = base64.split(",");
  const base64Data = base64Parts[1];

  if (!base64Data) {
    throw asError("Invalid base64 string format");
  }

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: fileType });

  return new File([blob], fileName, { type: fileType });
};
