import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "../../apis/customer.api";
import { QUERY_KEYS } from "../constants/keys";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { queryClient } from "../../main";

export const useCreateCustomerMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CUSTOMERS] });
      toast.success("Proceeding to agreement details...");
      //   navigate("/user/agreements/create" + `?property_id=${property_id}`); // needs customer_id here also
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit customer details");
    },
  });
};
