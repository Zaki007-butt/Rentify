import { useQuery } from "@tanstack/react-query";
import { getAgreements, getSingleAgreement } from "../../apis/agreement.api";
import { QUERY_KEYS } from "../constants/keys";
import { useAuth } from "../../hooks/useAuth";

export const useGetAgreements = (pageSize = 100) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.AGREEMENTS, user.user_id],
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
