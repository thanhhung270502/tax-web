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
import { toast } from "sonner";

import {
  createFolder,
  deleteFile,
  getBreadcrumb,
  getFilePreview,
  getListFolders,
  uploadFile,
} from "@/shared/apis";
import { FOLDERS_KEYS } from "@/shared/constants";
import type { MutationProps, QueryProps } from "@/shared/utils";
import { asError, useMutation, useQuery, useQueryClient } from "@/shared/utils";

// ------- Get List Folders -------
type GetListFoldersProps = QueryProps<GetListFoldersResponse, GetListItemsRequest>;

export const useGetListFolders = (props: GetListFoldersProps) => {
  const { folderId } = props.input;
  return useQuery({
    queryKey: folderId ? FOLDERS_KEYS.list(folderId) : FOLDERS_KEYS.lists(),
    queryFn: () => getListFolders(props.input),
    ...props,
  });
};

type GetBreadcrumbProps = QueryProps<GetBreadcrumbResponse, GetBreadcrumbRequest>;

export const useGetBreadcrumbs = (props: GetBreadcrumbProps) => {
  const { folderId } = props.input;
  return useQuery({
    queryKey: folderId ? FOLDERS_KEYS.breadcrumb(folderId) : FOLDERS_KEYS.breadcrumbs(),
    queryFn: () => getBreadcrumb(props.input),
    ...props,
  });
};

// ------- Upload File -------
type UploadFileMutationProps = MutationProps<UploadFileResponse, UploadFileRequest>;

export const useUploadFileMutation = (props: UploadFileMutationProps = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("File uploaded successfully");
      } else {
        toast.error("Failed to upload file");
      }
      return await queryClient.invalidateQueries({ queryKey: FOLDERS_KEYS.lists() });
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};

// ------- Get File Preview -------
type GetFilePreviewProps = QueryProps<GetFilePreviewResponse, GetFilePreviewRequest>;

export const useGetFilePreview = (props: GetFilePreviewProps) => {
  return useQuery({
    queryKey: FOLDERS_KEYS.preview(props.input.fileId),
    queryFn: () => getFilePreview(props.input),
    ...props,
  });
};

// ------- Delete File -------
type DeleteFileMutationProps = MutationProps<DeleteFileResponse, DeleteFileRequest>;

export const useDeleteFileMutation = (props: DeleteFileMutationProps = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFile,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("File deleted successfully");
      } else {
        toast.error("Failed to delete file");
      }
      return await queryClient.invalidateQueries({ queryKey: FOLDERS_KEYS.lists() });
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};

// ------- Create Folder -------
type CreateFolderMutationProps = MutationProps<CreateFolderResponse, CreateFolderRequest>;

export const useCreateFolderMutation = (props: CreateFolderMutationProps = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("Folder created successfully");
      } else {
        toast.error("Failed to create folder");
      }
      return await queryClient.invalidateQueries({ queryKey: FOLDERS_KEYS.lists() });
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};
