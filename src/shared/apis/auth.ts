import type { SendOTPRequest, SendOTPResponse, VerifyOTPRequest, VerifyOTPResponse } from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const sendOTP = async (data: SendOTPRequest): Promise<SendOTPResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const verifyOTP = async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
