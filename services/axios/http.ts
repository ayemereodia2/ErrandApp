import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface FetchProps {
  method: string
  _url: string
  body?: any
}


export async function _fetch({ _url, body, method }: FetchProps) {
  
  const url = `${process.env.EXPO_PUBLIC_API_URL}${_url}` 
  // const url = `https://staging.apis.swave.ng/v1${_url}`

  console.log(">>>>url", url);
  
  
  
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
      body: JSON.stringify(body)
    };
  
  

  // Your interceptor logic here
  // For example, you can add headers, modify request options, etc.
  
  // Return the modified fetch promise chain
  return fetch(url, options);
}