import axios from 'axios'

const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axiosBase