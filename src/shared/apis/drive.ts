import type {
  CreateFolderRequest,
  CreateFolderResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  GetBreadcrumbRequest,
  GetBreadcrumbResponse,
  GetFilePreviewRequest,
  GetFilePreviewResponse,
  GetListFoldersResponse,
  GetListItemsRequest,
  UploadFileRequest,
  UploadFileResponse,
} from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const getListFolders = async (
  data: GetListItemsRequest
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

export const uploadFile = async (data: UploadFileRequest): Promise<UploadFileResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const getFilePreview = async (
  data: GetFilePreviewRequest
): Promise<GetFilePreviewResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const deleteFile = async (data: DeleteFileRequest): Promise<DeleteFileResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const createFolder = async (data: CreateFolderRequest): Promise<CreateFolderResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
