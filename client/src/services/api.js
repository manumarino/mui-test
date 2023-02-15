import axios from "axios";

// config para la instancia de axios a usar en los request.
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: process.env.REACT_APP_API_REQUEST_TIMEOUT,
  headers: {
      'Authorization':  'Bearer ' + localStorage.getItem('token')
  }
});

export default api;