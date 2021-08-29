import axios from 'axios'
import { checkEnvironment } from './checkEnv';

/**
 * Post with axios
 * 
 * @param { Object } data - userdata
 * @param { String } postURL- Url to post to
 * @returns {response } - Response
 */ 

export async function postAxios (userData, URL) {
const sendURL = `${checkEnvironment()}/${URL}`
try {
 const response =  await axios ({
    url: sendURL,
    method: 'POST',
    data: {
      email: userData.email,
      password: userData.password
    }
  })
  const { data } = response;
  return data
} catch (error) {
  console.log("Error i post axios", error)
}
}

export async function postLocations(array, URL, token) {
const sendURL = `${checkEnvironment()}/${URL}`
  try {
    await axios({
      url: sendURL,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        glooms: array
      }
    })          
  } catch (error) {
    console.log("error i post Location");
    console.log(error.message);
  }
}

    /**
 * Query post with axios
 * 
 * @param { Object } data - userdata
 * @param { String } postURL- Url to post to
 * @returns {response / false} - Response or false
 */
     export async function queryAxios(username, password) {
      try {
        const response = await postAxios({}, `${checkEnvironment()}/login?username=${username}&password=${password}`)
      
        if(response) return response
        else return false
      } catch (error) {
        console.log("query error",error)
      }
      
      
          }