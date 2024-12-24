import { useQuery } from "@tanstack/react-query";
import { getUtilityBillsByAgreement, getUtilityBillsByCustomer, getUserUtilityBills } from "../../apis/utility-bill.api";
import { QUERY_KEYS } from "../constants/keys";

export const useGetUtilityBillsByAgreement = (agreementId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.UTILITY_BILLS, agreementId],
    queryFn: () => getUtilityBillsByAgreement(agreementId),
    enabled: !!agreementId,
  });
};

export const useGetUtilityBillsByCustomer = (customerId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_UTILITY_BILLS, customerId],
    queryFn: () => getUtilityBillsByCustomer(customerId),
    enabled: !!customerId,
  });
}; 

export const useGetUserUtilityBills = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_UTILITY_BILLS],
    queryFn: () => getUserUtilityBills(),
  });
};
