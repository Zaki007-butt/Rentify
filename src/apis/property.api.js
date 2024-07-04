import axios from "axios"

export const getProperties = () => {
  return axios.get('http://127.0.0.1:8000/api/v1/properties/')
}
