export enum BaseHandlerAction {
  SEND_OTP = "sendOTP",
  VERIFY_OTP = "verifyOTP",
  SAVE_PROFILE = "saveProfile",
  GET_PROFILE = "getProfile",
  GET_TAX_YEARS = "getTaxYears",
  SAVE_TAX_YEARS = "saveTaxYears",
  GET_LIST_FOLDERS = "listFolder",
  GET_BREADCRUMBS = "getBreadcrumbs",
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
export type GetListFoldersRequest = BaseAuthHandlerRequest & {
  folderId?: string;
};

export type TFolderItem = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt?: string;
};

export type GetListFoldersResponse = {
  success: boolean;
  folderId: string;
  folderName: string;
  parentId: string;
  items: Array<TFolderItem>;
};

export type CreateFolderRequest = BaseAuthHandlerRequest & {
  folderName: string;
  parentFolderId: string;
};

export type CreateFolderResponse = {
  success: boolean;
  folder: TFolderItem;
};

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

// ------- Profile Handler -------
export type ProfileHandlerRequest =
  | SendOTPRequest
  | VerifyOTPRequest
  | SaveProfileRequest
  | GetProfileRequest
  | GetTaxYearsRequest
  | SaveTaxYearsRequest
  | GetListFoldersRequest;

export type ProfileHandlerResponse =
  | SendOTPResponse
  | VerifyOTPResponse
  | SaveProfileResponse
  | GetProfileResponse
  | GetTaxYearsResponse
  | SaveTaxYearsResponse
  | GetListFoldersResponse;
