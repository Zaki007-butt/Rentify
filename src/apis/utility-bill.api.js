import api from ".";

export const createUtilityBill = async (billData) => {
  const response = await api.post(`/utility-bills/`, billData);
  return response.data;
};

export const updateUtilityBill = async ({ id, data }) => {
  const response = await api.patch(`/utility-bills/${id}/`, data);
  return response.data;
};

export const getUtilityBillsByAgreement = async (agreementId) => {
  const response = await api.get(`/utility-bills/?agreement=${agreementId}`);
  return response.data;
};

export const getUtilityBillsByCustomer = async (customerId) => {
  const response = await api.get(`/utility-bills/?customer=${customerId}`);
  return response.data;
}; 