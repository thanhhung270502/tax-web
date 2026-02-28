import type {
  GetBreadcrumbRequest,
  GetBreadcrumbResponse,
  GetListFoldersRequest,
  GetListFoldersResponse,
} from "@common";

import { getBreadcrumb, getListFolders } from "@/shared/apis";
import { FOLDERS_KEYS } from "@/shared/constants";
import type { QueryProps } from "@/shared/utils";
import { useQuery } from "@/shared/utils";

// ------- Get List Folders -------
type GetListFoldersProps = QueryProps<GetListFoldersResponse, GetListFoldersRequest>;

export const useGetListFolders = (props: GetListFoldersProps) => {
  const { folderId } = props.input;
  return useQuery({
    queryKey: folderId ? FOLDERS_KEYS.detail(folderId) : FOLDERS_KEYS.lists(),
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
