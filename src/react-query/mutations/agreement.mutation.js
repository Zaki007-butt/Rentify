import { useMutation } from "@tanstack/react-query";
import { createAgreement } from "../../apis/agreement.api";
import { queryClient } from "../../main";
import { QUERY_KEYS } from "../constants/keys";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateAgreementMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createAgreement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGREEMENTS] });
      toast.success("Agreement request submitted successfully");
      navigate("/user/agreements");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit agreement request");
    },
  });
};
