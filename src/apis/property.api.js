import axios from "axios"
import { BASE_URL } from "../config/config"

export const getProperties = (category_id) => {
  let URL = `${BASE_URL}/properties/`
  if (category_id) {
    URL=`${BASE_URL}/properties/?category_id=${category_id}`
  }
  return axios.get(URL)
}

export const getPropertiesCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories/`)
  return data
}
