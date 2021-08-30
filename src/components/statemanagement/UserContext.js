// UserContext.js
import React, { createContext, useState, useEffect } from 'react'
import { checkEnvironment } from '../api/checkEnv';
import axios from 'axios';
import { getToken } from '../api/getToken';
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
    console.log("setting tokens to storage", JSON.stringify(tokens))
  } else {
    window.localStorage.removeItem('userTokens')
  }
}

// Updating usertoken if changed/refreshed
useEffect(() => {
  setUserTokenLocalStorage(userToken)
}, [userToken])

// Validating User Authentication on Page refreshes
useEffect(() => {
  async function checkAuth() {

    try {
      const accToken = getToken();
      console.log("i useeffekt rad 46", accToken)
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
      console.log("response from refresh", response.data)
      const { respTokens, userData } = response.data
      if (!respTokens) {
        throw new Error('Cannot get access token')
      }

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
