import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../apis/user.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetUserProfileQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: getUserProfile,
    staleTime: 50 * 1000,
  });
};
