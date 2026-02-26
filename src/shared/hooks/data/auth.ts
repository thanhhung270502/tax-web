import type { SendOTPRequest, SendOTPResponse, VerifyOTPRequest, VerifyOTPResponse } from "@common";
import { toast } from "sonner";

import { sendOTP, verifyOTP } from "@/shared/apis";
import type { MutationProps } from "@/shared/utils";
import { asError, useMutation } from "@/shared/utils";

// ------- Send OTP -------
type SendOTPMutationProps = MutationProps<SendOTPResponse, SendOTPRequest>;

export const useSendOTPMutation = (props: SendOTPMutationProps = {}) => {
  return useMutation({
    mutationFn: sendOTP,
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

// ------- Verify OTP -------
type VerifyOTPMutationProps = MutationProps<VerifyOTPResponse, VerifyOTPRequest>;

export const useVerifyOTPMutation = (props: VerifyOTPMutationProps = {}) => {
  return useMutation({
    mutationFn: verifyOTP,
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
