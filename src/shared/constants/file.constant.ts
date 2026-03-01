import type { TFileSize } from "../types";

export const ACCEPT_FILE_TYPES = ["*"];
export const INPUT_ACCEPT_TYPES = ACCEPT_FILE_TYPES.map((type) =>
  type !== "*" ? `.${type}` : type
).join(",");
export const ACCEPTED_IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "webp", "heic"];
export const ACCEPTED_AUDIO_TYPES = ["wav"];

export const DEFAULT_FILE_SIZE: TFileSize = { number: 2, unit: "MB" };
export const MAX_RECORDING_FILE_SIZE: TFileSize = { number: 25, unit: "MB" };

export const MAX_SEGMENT_DURATION_SECONDS = 20 * 60; // 20 minutes
export const MAX_TOTAL_RECORDING_DURATION_SECONDS = 2 * 60 * 60; // 2 hours

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE_BYTES: 20 * 1024 * 1024, // 20MB
  MAX_FILE_SIZE_DISPLAY: "20MB",
  MAX_DISPLAYED_TAGS: 1,
  TAG_SEARCH_LIMIT: 50,
  ALLOWED_MIME_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "text/csv",
  ] as const,
  ACCEPT_ATTRIBUTE: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.csv",
} as const;
