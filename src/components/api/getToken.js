/**
 * Getting token from localstorage
 *
 * @return {*} 
 */
 export const getToken = () => {
  const tokens = window.localStorage.getItem("userTokens");
  const accToken = JSON.parse(tokens).access_token;
  return accToken
}