// UserContext.js
import React, { createContext, useState, useEffect } from 'react'
import { checkEnvironment } from '../api/checkEnv';
import axios from 'axios';
import { getToken } from '../api/getToken';
import jwt_decode from "jwt-decode";
export const UserContext = createContext(null)

/**
 * Creating user Router
 *
 * @param {*} { children }
 * @return {*} - Returning a User Provider
 */
const UserProvider = ({ children }) => {
  const [startButton, setStartButton] = useState(true);
 const [appUser, setAppUser ] = useState(null);

  // Usertoken state. undefined if not in localstorage
 const [userToken, setUserToken] = useState(()=> {   
   if( typeof window !== 'undefined'){
     if(window.localStorage.getItem('userTokens')){
       const test1 = window.localStorage.getItem('userTokens')
       return JSON.parse(test1)
     }
     return ''
   }
 })

// setting userToken to localstorage
function setUserTokenLocalStorage(tokens) {
  if (typeof window !== 'undefined' && tokens !== '') {
    window.localStorage.setItem('userTokens',  JSON.stringify(tokens))
  } else {
    window.localStorage.removeItem('userTokens')
  }
}

// Updating usertoken if changed/refreshed
useEffect(() => {
  setUserTokenLocalStorage(userToken)
  const parsedJwt = jwt_decode(userToken.access_token);
  setAppUser(parsedJwt.email);
}, [userToken])

// Validating User Authentication on Page refreshes
useEffect(() => {
  async function checkAuth() {
    try {
      const accToken = getToken();
      if (!accToken) {
        const error = new Error('no access token')
        error.status = 401
        throw error
      }
      const response = await axios ({
        url: `${checkEnvironment()}/refresh`,
        method: 'POST',
        headers: {
          Authorization:'Bearer ' + accToken
      }})
      const { respTokens, userData } = response.data
      console.log("userdata in refresh1111", response.data)

      if (!respTokens) {
        throw new Error('Cannot get access token')
      }
      console.log("userdata in refresh", userData)
      setUserToken(respTokens)
      setAppUser(userData)

    } catch (error) {
      console.log('usercontext error')
      console.log(error.message)
      setUserToken('')
      setAppUser(null)
    }
  }
  checkAuth()
}, [])

  return ( 
    <UserContext.Provider value={{ 
      value: [startButton, setStartButton], 
      userValue: [appUser, setAppUser],
      tokenValue: [userToken, setUserToken]
      }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
