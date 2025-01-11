import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../apis/dashboard.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_STATS],
    queryFn: getDashboardStats,
  });
}; 