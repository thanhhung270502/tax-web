import type {
  GetBreadcrumbRequest,
  GetBreadcrumbResponse,
  GetListFoldersRequest,
  GetListFoldersResponse,
} from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const getListFolders = async (
  data: GetListFoldersRequest
): Promise<GetListFoldersResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const getBreadcrumb = async (data: GetBreadcrumbRequest): Promise<GetBreadcrumbResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
