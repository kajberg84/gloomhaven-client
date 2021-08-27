// UserContext.js
import React, { createContext, useState, useEffect } from 'react'
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
     return window.localStorage.getItem('userTokens') || ''
   }
 })

// setting userToken to localstorage
function setUserTokenLocalStorage(userTokens) {
  if (typeof window !== 'undefined' && userTokens !== '') {
    window.localStorage.setItem('userTokens', userTokens)
  } else {
    window.localStorage.removeItem('userTokens')
  }
}

// Updating usertoken if changed/refreshed
useEffect(() => {
  setUserTokenLocalStorage(userToken)
}, [userToken])


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
