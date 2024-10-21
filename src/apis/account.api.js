import _ from "lodash";
import api from ".";

export const createUser = async (userData) => {
  try {
    const response = await api.post(`/register`, userData);
    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData).get("errors").values().flatten().head().value();
      throw new Error(errorData.message || firstErrorMessage || "Registration failed");
    } else throw new Error(err);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post(`/login`, userData);
    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData).get("errors").values().flatten().head().value();
      throw new Error(errorData.message || firstErrorMessage || "Login failed");
    } else throw new Error(err);
  }
}
