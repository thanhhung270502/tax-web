import type { ProfileHandlerRequest, ProfileHandlerResponse } from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const profileHandler = async (
  data: ProfileHandlerRequest
): Promise<ProfileHandlerResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
