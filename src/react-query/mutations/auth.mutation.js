//import { useMutation } from 'react-query';
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  loginUser,
  updateUserProfile,
  changePassword,
} from "../../apis/account.api";
import { queryClient } from "../../main";
import { QUERY_KEYS } from "../constants/keys";
import { useAuth } from "../../hooks/useAuth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useUpdateProfileMutation = () => {
  const { reloadUser } = useAuth();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      reloadUser();
    },
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};
