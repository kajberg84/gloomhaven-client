/**
 * Getting token from localstorage
 *
 * @return {*} 
 */
 export const getToken = () => {
  const tokens = window.localStorage.getItem("userTokens");
  const accToken = JSON.parse(tokens).access_token;
  console.log('i get token rad 9', accToken)
  return accToken
}