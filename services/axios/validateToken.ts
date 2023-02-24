import axios from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment";

interface TokenProp {
  token: string,
  exp: string
}

export const validateToken = () => {
  let access_token: any = localStorage.getItem('access_token') || ""
  let refresh_token: any = localStorage.getItem('refresh_token') || ""

  if (!refresh_token) {
    // logout user
  }
  
  let accessTokenExpireTime: any;

  try {
    accessTokenExpireTime = jwtDecode(access_token)?.exp; //remember to get exp date of token
  } catch (e) {
    //if error logout user
  }

  if (Number(moment.unix(accessTokenExpireTime)) - Number(moment(Date.now()))) {
    //generating new accessToken
    let refreshTokenExpireTime: any
   
    try {
      refreshTokenExpireTime = jwtDecode(refresh_token).exp;
    } catch (error) {
      //logout user
    }

    if (Number(moment.unix(refreshTokenExpireTime)) - Number(moment(Date.now())) < 1000) {
      return new Promise((resolve, reject) => {
        axios.post('/refreshToken', { refresh_token })
          .then((res) => {
            if (!res.data.access_token) {
              //log user out
            } else {
              const { access_token } = res.data
              localStorage.setItem('access_token', access_token)
            }
          })
      })
    } else {
      // clear storage logout user 
    }
    return access_token
  }
  return access_token

}