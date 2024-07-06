import axios from "axios"
import { BASE_URL } from "../config/config"

export const getProperties = () => {
  return axios.get(`${BASE_URL}/properties/`)
}

export const getPropertiesCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories/`)
  return data
}
