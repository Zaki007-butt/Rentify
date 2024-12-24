import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment, updatePayment } from "../../apis/payment.api";
import { QUERY_KEYS } from "../constants/keys";
import { toast } from "react-hot-toast";

export const useCreatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.PAYMENTS]);
      queryClient.invalidateQueries([QUERY_KEYS.CUSTOMER_PAYMENTS]);
      toast.success("Payment created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create payment");
    },
  });
};

export const useUpdatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.PAYMENTS]);
      queryClient.invalidateQueries([QUERY_KEYS.CUSTOMER_PAYMENTS]);
      toast.success("Payment status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update payment status");
    },
  });
}; 