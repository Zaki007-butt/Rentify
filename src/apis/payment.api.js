import api from ".";

export const createPayment = async (paymentData) => {
  const response = await api.post(`/payments/`, paymentData);
  return response.data;
};

export const updatePayment = async ({ id, data }) => {
  const response = await api.patch(`/payments/${id}/`, data);
  return response.data;
};

export const getPaymentsByAgreement = async (agreementId) => {
  const response = await api.get(`/payments/?agreement=${agreementId}`);
  return response.data;
};

export const getPaymentsByCustomer = async (customerId) => {
  const response = await api.get(`/payments/?customer=${customerId}`);
  return response.data;
};

export const getUserPayments = async () => {
  const response = await api.get('/payments/user/');
  return response.data;
}; 