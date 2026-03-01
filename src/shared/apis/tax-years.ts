import type {
  GetTaxYearsRequest,
  GetTaxYearsResponse,
  SaveTaxYearsRequest,
  SaveTaxYearsResponse,
} from "@common";

import { postRequest } from "@/libs/api-client";

import { ClientAPIRoutes } from "../constants";

export const getTaxYears = async (data: GetTaxYearsRequest): Promise<GetTaxYearsResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};

export const saveTaxYears = async (data: SaveTaxYearsRequest): Promise<SaveTaxYearsResponse> => {
  const response = await postRequest({
    path: ClientAPIRoutes.PROFILE_HANDLER.baseRoute(),
    data,
  });
  return response.data;
};
