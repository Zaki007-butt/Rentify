import axios from "axios";
import { BASE_URL } from "../config/config";

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  //   withCredentials: true, // Allow sending cookies
});

export default api;
