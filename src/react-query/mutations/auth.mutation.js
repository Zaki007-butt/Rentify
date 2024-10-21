//import { useMutation } from 'react-query';
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../apis/account.api";
import api from "../../apis";

// Example of registration mutation
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

// Example of login mutation
export const useLoginMutation = () => {
  return useMutation(async (formData) => {
    const response = await api.post("/api/login", formData);
    return response.data;
  });
};
