import api from ".";

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats/');
  return response.data;
}; 