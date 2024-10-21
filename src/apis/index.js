import axios from "axios";
import { BASE_URL } from "../config/config";

const api = axios.create({
  baseURL: BASE_URL,
  //   withCredentials: true, // Allow sending cookies
});

export default api;
