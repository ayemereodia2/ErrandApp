import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface FetchProps {
  method: string
  _url: string
  body?: any
}

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 20000, // 20 seconds
});

axiosInstance.interceptors.request.use(async (config) => {
   if (config.url?.includes('/sign-in')) return config;
  if (config.url?.includes('/sign-up')) return config;

   config.headers!['Authorization'] = "Bearer " + localStorage.getItem("accessToken")
  return config

},
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    const request = error.config; //this is actual request that was sent, and error is received in response to that request 
    return Promise.reject(error);
  }
);

export async function _fetch({ _url, body, method }: FetchProps) {
  const url = `https://errand-app.herokuapp.com/v1${_url}`
  const token = await AsyncStorage.getItem('accessToken');
  
  let options

  if (token === null && url.includes("/sign")) {
      options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          },
        body
    };
  }

    options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
      body
  };

  // Your interceptor logic here
  // For example, you can add headers, modify request options, etc.
  
  // Return the modified fetch promise chain
  return fetch(url, options);
}




// const http = axiosInstance

// export { http };

