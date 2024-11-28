import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../../apis/customer.api";
import { QUERY_KEYS } from "../constants/keys";
import { useAuth } from "../../hooks/useAuth";

export const useGetCustomer = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CUSTOMER, user?.user_id],
    queryFn: getCustomer,
    staleTime: 500 * 1000,
    enabled: !!user?.user_id // Only run query if user_id exists
  });
};
