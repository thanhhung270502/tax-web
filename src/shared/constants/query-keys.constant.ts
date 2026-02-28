export const QUERY_KEYS = {
  // USER
  USER: "user",

  // FOLDERS
  FOLDERS: "folders",
};

export const USER_KEYS = {
  all: () => [QUERY_KEYS.USER] as const,
  lists: () => [...USER_KEYS.all(), "lists"] as const,
  details: () => [...USER_KEYS.all(), "details"] as const,
  detail: (id: string) => [...USER_KEYS.details(), id] as const,
  me: () => [...USER_KEYS.all(), "me"] as const,
} as const;

export const FOLDERS_KEYS = {
  all: () => [QUERY_KEYS.FOLDERS] as const,
  lists: () => [...FOLDERS_KEYS.all(), "lists"] as const,
  details: () => [...FOLDERS_KEYS.all(), "details"] as const,
  detail: (folderId: string) => [...FOLDERS_KEYS.details(), folderId] as const,
  breadcrumbs: () => [...FOLDERS_KEYS.all(), "breadcrumbs"] as const,
  breadcrumb: (folderId: string) => [...FOLDERS_KEYS.breadcrumbs(), folderId] as const,
} as const;
