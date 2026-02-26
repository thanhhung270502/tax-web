export enum EmailHandlerAction {
  SEND_OTP = "sendOTP",
  VERIFY_OTP = "verifyOTP",
  SAVE_PROFILE = "saveProfile",
}

export type BaseHandlerRequest = {
  action: EmailHandlerAction;
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
export type GetListFoldersRequest = BaseAuthHandlerRequest;

export type FolderItem = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type GetListFoldersResponse = {
  success: boolean;
  folderId: string;
  folderName: string;
  parentId: string;
  items: Array<FolderItem>;
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
