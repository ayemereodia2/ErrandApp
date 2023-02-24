import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (config.url?.includes('/sign-in')) return config;
  if (config.url?.includes('/sign-up')) return config;

  config.headers!['Authorization'] = "Bearer " + localStorage.getItem("access_token")
  config.headers!['Content-Type'] = "application/json";
  return config
},
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const request = error.config; //this is actual request that was sent, and error is received in response to that request
    if (error.response.status === 401 && !request._retry) {
      request._retry = true;
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token")
      axios.defaults.headers.common["Content-Type"] = "application/json";
      return axios(request);
    } 
    return Promise.reject(error);
  }
);

const http = axios

// eslint-disable-next-line import/no-anonymous-default-export
export { http };

