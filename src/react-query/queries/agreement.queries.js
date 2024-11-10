import { useQuery } from "@tanstack/react-query";
import { getAgreements, getSingleAgreement } from "../../apis/agreement.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetAgreements = (pageSize = 100) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AGREEMENTS],
    queryFn: () => getAgreements(pageSize),
    staleTime: 20 * 1000,
  });
};

export const useGetSingleAgreement = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AGREEMENTS, id],
    queryFn: () => getSingleAgreement(id),
  });
};
