import api from ".";

export const getUserProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};
