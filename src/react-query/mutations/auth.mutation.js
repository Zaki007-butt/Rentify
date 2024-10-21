//import { useMutation } from 'react-query';
import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "../../apis/account.api";
import { queryClient } from "../../main";
import { QUERY_KEYS } from "../constants/keys";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES_CATEGORIES_TYPE] });
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES_CATEGORIES_TYPE] });
    },
  });
};
