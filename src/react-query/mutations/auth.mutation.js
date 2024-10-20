//import { useMutation } from 'react-query';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { createUser } from "../../apis/account.api";

// Example of registration mutation
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: createUser
  });
};

// Example of login mutation
export const useLoginMutation = () => {
  return useMutation(async (formData) => {
    const response = await axios.post('/api/login', formData);
    return response.data;
  });
};

