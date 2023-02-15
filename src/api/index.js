import Axios from "axios";
import { ApiRoutes } from "../constants/api_url";




export const axios = Axios.create({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  baseURL: ApiRoutes.API_HOSTNAME,
  timeout: 1000000000,
  responseType: "json",
});

axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json , */*",
      "Content-Type": "application/json",
    //   Authorization: `Bearer ${secureLocalStorage.getItem("auth_token")}`,
    Authorization:`${localStorage.getItem('token')}`,
    //   Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoyLCJpYXQiOjE2NzUyMjk2OTJ9.sK0PdhQMXbAo3s3AJ_Jp8VMMgNqSKXmRkEv1BB3jEKU`,
      type: "web",
    };

   

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error.response.status === 403) {
    
      window.location.replace("/");
      // window.location.href("/");
    }

    return Promise.reject(error);
  }
);

export default axios;
