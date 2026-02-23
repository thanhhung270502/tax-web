import { APIBaseRoutes } from "../../constants";
import type { APIDefinition } from "../api-route-model";
import { APIMethod } from "../api-route-model";

import type { ProfileHandlerRequest, ProfileHandlerResponse } from "./profile-handler-model";

export const API_PROFILE_HANDLER: APIDefinition = {
  method: APIMethod.POST,
  baseUrl: APIBaseRoutes.PROFILE_HANDLER,
  subUrl: "/exec",
  requestBody: {} as ProfileHandlerRequest,
  responseBody: {} as ProfileHandlerResponse,
  buildUrlPath: () => `${APIBaseRoutes.PROFILE_HANDLER}`,
};
