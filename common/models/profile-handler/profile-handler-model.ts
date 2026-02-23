// {
//   "success": true,
//   "message": "OTP sent successfully",
//   "expiresIn": 300
// }

// {
//   "success": true,
//   "message": "OTP verified successfully",
//   "sessionToken": "2300e887-34a2-45e1-bc72-a55fac12b3c1"
// }

// {
//   "success": true,
//   "message": "Profile saved successfully",
//   "isUpdate": true
// }

export type ProfileHandlerResponse = {
  success: boolean;
  message?: string;
  error?: string;
  expiresIn?: number;
  sessionToken?: string;
  isUpdate?: boolean;
};

export enum EmailHandlerAction {
  SEND_OTP = "sendOTP",
  VERIFY_OTP = "verifyOTP",
  SAVE_PROFILE = "saveProfile",
}

export type EmailHandlerRequest = {
  email: string;
};

export type VerifyOTPRequest = {
  email: string;
  otp: string;
};

export type SaveProfileRequest = {
  sessionToken: string;
  email: string;
  profile: {
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
};

export type ProfileHandlerRequest = {
  action: EmailHandlerAction;
} & (EmailHandlerRequest | VerifyOTPRequest | SaveProfileRequest);
