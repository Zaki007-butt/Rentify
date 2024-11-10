import { useQuery } from "@tanstack/react-query";
import { getAgreements } from "../../apis/agreement.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetAgreements = (pageSize = 100) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AGREEMENTS, pageSize],
    queryFn: () => getAgreements(pageSize),
    staleTime: 20 * 1000,
  });
};
