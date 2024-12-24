import { useQuery } from "@tanstack/react-query";
import { getPaymentsByAgreement, getPaymentsByCustomer } from "../../apis/payment.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetPaymentsByAgreement = (agreementId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENTS, agreementId],
    queryFn: () => getPaymentsByAgreement(agreementId),
    enabled: !!agreementId,
  });
};

export const useGetPaymentsByCustomer = (customerId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_PAYMENTS, customerId],
    queryFn: () => getPaymentsByCustomer(customerId),
    enabled: !!customerId,
  });
}; 