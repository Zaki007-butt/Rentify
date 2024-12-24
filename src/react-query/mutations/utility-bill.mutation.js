import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUtilityBill, updateUtilityBill } from "../../apis/utility-bill.api";
import { QUERY_KEYS } from "../constants/keys";
import { toast } from "react-hot-toast";

export const useCreateUtilityBillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUtilityBill,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.UTILITY_BILLS]);
      queryClient.invalidateQueries([QUERY_KEYS.CUSTOMER_UTILITY_BILLS]);
      toast.success("Utility bill added successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add utility bill");
    },
  });
};

export const useUpdateUtilityBillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUtilityBill,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.UTILITY_BILLS]);
      queryClient.invalidateQueries([QUERY_KEYS.CUSTOMER_UTILITY_BILLS]);
      toast.success("Utility bill updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update utility bill");
    },
  });
}; 