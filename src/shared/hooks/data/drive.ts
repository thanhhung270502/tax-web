import type { GetListFoldersRequest, GetListFoldersResponse } from "@common";
import { toast } from "sonner";

import { getListFolders } from "@/shared/apis";
import type { MutationProps } from "@/shared/utils";
import { asError, useMutation } from "@/shared/utils";

// ------- Get List Folders -------
type GetListFoldersMutationProps = MutationProps<GetListFoldersResponse, GetListFoldersRequest>;

export const useGetListFoldersMutation = (props: GetListFoldersMutationProps = {}) => {
  return useMutation({
    mutationFn: getListFolders,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("List folders fetched successfully");
      } else {
        toast.error("Failed to fetch list folders");
      }
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};
