import type { ProfileHandlerRequest, ProfileHandlerResponse } from "@common";
import { API_PROFILE_HANDLER } from "@common";
import type { NextRequest } from "next/server";

import { apiRequestWithQuery, apiRouteHandler } from "@/libs/api-server";

export const POST = apiRouteHandler<ProfileHandlerResponse>({
  handler: async (req: NextRequest) => {
    const body: ProfileHandlerRequest = await req.json();
    const response: ProfileHandlerResponse = await apiRequestWithQuery(req, {
      path: API_PROFILE_HANDLER.buildUrlPath({}),
      config: {
        method: API_PROFILE_HANDLER.method,
      },
      data: body,
    });
    return response;
  },
});
