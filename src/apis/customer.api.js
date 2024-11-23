import api from ".";

export const createCustomer = async (customerData) => {
  const response = await api.post(`/customers/`, customerData);
  return response.data;
};

export const getCustomer = async () => {
  const response = await api.get("/customers/get/");
  return response.data;
};
