import type { ProfileHandlerRequest, ProfileHandlerResponse } from "@common";
import { toast } from "sonner";

import { profileHandler } from "@/shared/apis";
import type { MutationProps } from "@/shared/utils";
import { asError, useMutation } from "@/shared/utils";

// ------- API_PROFILE_HANDLER -------
type ProfileHandlerMutationProps = MutationProps<ProfileHandlerResponse, ProfileHandlerRequest>;

export const useProfileHandlerMutation = (props: ProfileHandlerMutationProps = {}) => {
  return useMutation({
    mutationFn: profileHandler,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};
