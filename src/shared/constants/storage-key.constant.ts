export const STORAGE_KEYS = {
  LOGIN_SESSION: {
    key: "loginSession",
    expiryTimeInMs: 30 * 60 * 1000, // 30 minutes
  },
};

export type StorageValue = {
  value: JSON;
  isEmpty: boolean;
};

export type StorageKey = {
  key: string;
  expiryTimeInMs: number;
};
