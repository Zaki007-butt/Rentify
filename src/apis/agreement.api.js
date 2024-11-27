import api from ".";

export const getAgreements = async (pageSize) => {
    console.log("Getting agreements...");
  let params = {};
  if (pageSize) {
    params["page_size"] = pageSize;
  }

  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/agreements/?${queryString}`);
  console.log("Getting agreements...data", response.data);
  return response;
};

export const createAgreement = async (agreementData) => {
  const response = await api.post(`/agreements/`, agreementData);
  return response.data;
};

export const updateAgreement = async ({id, data: agreementData}) => {
  console.log("my data:", id, agreementData);
  const response = await api.put(`/agreements/${id}/`, agreementData);
  return response.data;
};

export const getSingleAgreement = async (agreementID) => {
  const response = await api.get(`/agreements/${agreementID}/`);
  return response.data;
};

export const deleteAgreement = async (agreementID) => {
  const response = await api.delete(`/agreements/${agreementID}/`);
  return response.data;
};
