import axios from "axios";
import { BASE_URL } from "../config/config";
import _ from "lodash";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData).get("errors").values().flatten().head().value();
      throw new Error(errorData.message || firstErrorMessage || "Registration failed");
    } else throw new Error(err);
  }
};
