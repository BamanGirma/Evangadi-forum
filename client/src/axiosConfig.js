import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosBase = axios.create({
  baseURL: baseURL,
});

export default axiosBase;
