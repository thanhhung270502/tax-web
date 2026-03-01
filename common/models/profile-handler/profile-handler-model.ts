export enum BaseHandlerAction {
  SEND_OTP = "sendOTP",
  VERIFY_OTP = "verifyOTP",
  SAVE_PROFILE = "saveProfile",
  GET_PROFILE = "getProfile",
  GET_TAX_YEARS = "getTaxYears",
  SAVE_TAX_YEARS = "saveTaxYears",
  GET_LIST_FOLDERS = "listFolder",
  GET_BREADCRUMBS = "getBreadcrumbs",
  UPLOAD_FILE = "uploadFile",
  GET_LIST_FILES = "getAllFiles",
  GET_FILE_PREVIEW = "getFilePreview",
  DELETE_FILE = "deleteFile",
  CREATE_FOLDER = "createFolder",
}

export type BaseHandlerRequest = {
  action: BaseHandlerAction;
};

export type BaseAuthHandlerRequest = BaseHandlerRequest & {
  email: string;
  sessionToken: string;
};

// ------- Auth Actions -------

export type SendOTPRequest = BaseHandlerRequest & {
  email: string;
};

export type SendOTPResponse = {
  success: boolean;
  message?: string;
  error?: string;
  expiresIn?: number;
};

export type VerifyOTPRequest = BaseHandlerRequest & {
  email: string;
  otp: string;
};

export type VerifyOTPResponse = {
  success: boolean;
  message?: string;
  error?: string;
  sessionToken: string;
  hasProfile: boolean;
};

// ------- Profile Actions -------

export type UserProfile = {
  accountType: string;
  language: string;
  firstName: string;
  lastName: string;
  phone: string;
  ssn: string;
  dob: string;
  filingStatus: string;
  country: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
};

export type SaveProfileRequest = BaseHandlerRequest & {
  sessionToken: string;
  email: string;
  profile: UserProfile;
};

export type SaveProfileResponse = {
  success: boolean;
  message?: string;
  error?: string;
  isUpdate: boolean;
};

export type GetProfileRequest = BaseAuthHandlerRequest;

export type GetProfileResponse = {
  success: boolean;
  profile: UserProfile;
};

// ------- Tax Actions -------
export type GetTaxYearsRequest = BaseAuthHandlerRequest;

export type GetTaxYearsResponse = {
  success: boolean;
  years: number[];
};

export type SaveTaxYearsRequest = BaseAuthHandlerRequest & {
  years: number[];
};

export type SaveTaxYearsResponse = {
  success: boolean;
  message?: string;
  error?: string;
  folders: Array<{
    id: string;
    name: string;
  }>;
  rootFolderId: string;
};

// ------- Drive Actions -------
// Get list folders
export type GetListItemsRequest = BaseAuthHandlerRequest & {
  folderId?: string;
};

export enum EFileOrFolderType {
  FILE = "file",
  FOLDER = "folder",
}

export type TFileItem = {
  id: string;
  name: string;
  type: EFileOrFolderType.FILE;
  mimeType: string;
  createdAt: string;
  updatedAt?: string;
  size: number;
  downloadUrl: string;
  viewUrl?: string;
  iconUrl: string;
};

export type TFolderItem = {
  id: string;
  name: string;
  type: EFileOrFolderType.FOLDER;
  createdAt: string;
  updatedAt?: string;
};

export type TFileOrFolderItem = TFileItem | TFolderItem;

export type GetListFoldersResponse = {
  success: boolean;
  folderId: string;
  folderName: string;
  parentId: string;
  items: Array<TFileOrFolderItem>;
};

// Create folder
export type CreateFolderRequest = BaseAuthHandlerRequest & {
  folderName: string;
  parentFolderId?: string;
};

export type CreateFolderResponse = {
  success: boolean;
  folder: TFolderItem;
};

// Get breadcrumb
export type GetBreadcrumbRequest = BaseAuthHandlerRequest & {
  folderId?: string;
};

export type TBreadcrumbItem = {
  id: string;
  name: string;
};

export type GetBreadcrumbResponse = {
  success: boolean;
  breadcrumbs: Array<TBreadcrumbItem>;
};

// Upload file
export type UploadFileRequest = BaseAuthHandlerRequest & {
  folderId?: string;
  fileName: string;
  mimeType: string;
  base64Data: string;
};

export type TUploadFileItem = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt?: string;
};

export type UploadFileResponse = {
  success: boolean;
  file: TUploadFileItem;
};

// Preview
export type GetFilePreviewRequest = BaseAuthHandlerRequest & {
  fileId: string;
};

export enum EFilePreviewType {
  IMAGE = "image",
  IFRAME = "iframe",
  TEXT = "text",
}

export type GetFilePreviewResponse = {
  success: boolean;
  file: TFileItem;
  previewType: EFilePreviewType;
  previewData: string;
};

// Delete file
export type DeleteFileRequest = BaseAuthHandlerRequest & {
  fileId: string;
};

export type DeleteFileResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

// ------- Profile Handler -------
export type ProfileHandlerRequest =
  | SendOTPRequest
  | VerifyOTPRequest
  | SaveProfileRequest
  | GetProfileRequest
  | GetTaxYearsRequest
  | SaveTaxYearsRequest
  | GetListItemsRequest;

export type ProfileHandlerResponse =
  | SendOTPResponse
  | VerifyOTPResponse
  | SaveProfileResponse
  | GetProfileResponse
  | GetTaxYearsResponse
  | SaveTaxYearsResponse
  | GetListFoldersResponse;
