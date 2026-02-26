import type { GetProfileRequest, ProfileHandlerResponse, SaveProfileRequest } from "@common";
import { toast } from "sonner";

import { getProfile, saveProfile } from "@/shared/apis";
import type { MutationProps } from "@/shared/utils";
import { asError, useMutation } from "@/shared/utils";

// ------- Save Profile -------
type SaveProfileMutationProps = MutationProps<ProfileHandlerResponse, SaveProfileRequest>;

export const useSaveProfileMutation = (props: SaveProfileMutationProps = {}) => {
  return useMutation({
    mutationFn: saveProfile,
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

// ------- Get Profile -------
type GetProfileMutationProps = MutationProps<ProfileHandlerResponse, GetProfileRequest>;

export const useGetProfileMutation = (props: GetProfileMutationProps = {}) => {
  return useMutation({
    mutationFn: getProfile,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("Profile fetched successfully");
      } else {
        toast.error("Failed to fetch profile");
      }
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};
