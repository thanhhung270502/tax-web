import type { FileSize } from "../types";

export const ACCEPT_FILE_TYPES = ["*"];
export const INPUT_ACCEPT_TYPES = ACCEPT_FILE_TYPES.map((type) =>
  type !== "*" ? `.${type}` : type
).join(",");
export const ACCEPTED_IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "webp", "heic"];
export const ACCEPTED_AUDIO_TYPES = ["wav"];

export const DEFAULT_FILE_SIZE: FileSize = { number: 2, unit: "MB" };
export const MAX_RECORDING_FILE_SIZE: FileSize = { number: 25, unit: "MB" };

export const MAX_SEGMENT_DURATION_SECONDS = 20 * 60; // 20 minutes
export const MAX_TOTAL_RECORDING_DURATION_SECONDS = 2 * 60 * 60; // 2 hours
