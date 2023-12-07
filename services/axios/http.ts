import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationHook } from "../../utils/helper";

interface FetchProps {
  method: string
  _url: string
  body?: any
}

const clearStorage = async () => {
    await AsyncStorage.multiRemove([
      'accessToken',
      'refreshToken',
      'user_id',
      'last_name',
      'first_name',
      'profile_pic',
    ])
  }



  
const {fetch: originalFetch} = window;


// an interceptor handler to check if token has expires

export const pushOut = ({navigation}: any) => {
  window.fetch = async (...args) => {
    let [resource, config] = args;
    let response = await originalFetch(resource, config);

    if (!response.ok && response.status === 404) {
      // 404 error handling
      return Promise.reject(response);
    }

    // console.log(">>>>>401", respins);
    

    if (response.status === 401) {
        // RootNavigation.navigateToScreen('Default')
      navigation.navigate('Default')
        // navigationHook()
        clearStorage()
    }
    return response;
  };
}



export async function _fetch({ _url, body, method }: FetchProps) {
  
  const url = `${process.env.EXPO_PUBLIC_API_URL}${_url}` 
  // const url = `https://staging.apis.swave.ng/v1${_url}`

  // console.log("url------", url);
  
  
  const token = await AsyncStorage.getItem('accessToken');  

  // console.log(">>>otkn", token);
  

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
  
  // console.log(">>>>optionss", options);
  
  
  

  // Your interceptor logic here
  // For example, you can add headers, modify request options, etc.
  
  // Return the modified fetch promise chain
  return fetch(url, options);
}