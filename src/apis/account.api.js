import _ from "lodash";
import api from ".";

export const createUser = async (userData) => {
  try {
    const response = await api.post(`/register`, userData);
    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(
        errorData.message || firstErrorMessage || "Registration failed"
      );
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
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(errorData.message || firstErrorMessage || "Login failed");
    } else throw new Error(err);
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put(`/update-profile`, profileData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(
        errorData.message || firstErrorMessage || "Profile update failed"
      );
    } else throw new Error(err);
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.post(`/change-password`, passwordData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(
        errorData.message || firstErrorMessage || "Password change failed"
      );
    } else throw new Error(err);
  }
};
