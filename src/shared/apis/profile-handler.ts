import type {
  GetProfileRequest,
  GetProfileResponse,
  SaveProfileRequest,
  SaveProfileResponse,
} from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const saveProfile = async (data: SaveProfileRequest): Promise<SaveProfileResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const getProfile = async (data: GetProfileRequest): Promise<GetProfileResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
