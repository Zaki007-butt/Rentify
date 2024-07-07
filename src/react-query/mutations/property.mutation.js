import { useMutation } from "@tanstack/react-query";
import { createProperty } from "../../apis/property.api";
import { queryClient } from "../../main";
import { QUERY_KEYS } from "../constants/keys";

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES] })
    }
  })
}

