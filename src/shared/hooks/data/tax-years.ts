import type {
  GetTaxYearsRequest,
  GetTaxYearsResponse,
  SaveTaxYearsRequest,
  SaveTaxYearsResponse,
} from "@common";
import { toast } from "sonner";

import { getTaxYears, saveTaxYears } from "@/shared/apis";
import type { MutationProps } from "@/shared/utils";
import { asError, useMutation } from "@/shared/utils";

// ------- Save Tax Years -------
type SaveTaxYearsMutationProps = MutationProps<SaveTaxYearsResponse, SaveTaxYearsRequest>;

export const useSaveTaxYearsMutation = (props: SaveTaxYearsMutationProps = {}) => {
  return useMutation({
    mutationFn: saveTaxYears,
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

// ------- Get Tax Years -------
type GetTaxYearsMutationProps = MutationProps<GetTaxYearsResponse, GetTaxYearsRequest>;

export const useGetTaxYearsMutation = (props: GetTaxYearsMutationProps = {}) => {
  return useMutation({
    mutationFn: getTaxYears,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("Tax years fetched successfully");
      } else {
        toast.error("Failed to fetch tax years");
      }
    },
    onError: (error) => {
      toast.error(asError(error).message);
    },
    ...props,
  });
};
