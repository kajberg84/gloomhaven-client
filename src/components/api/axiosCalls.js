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
/**
 * Delete a specific hero
 *
 * @export
 * @param {*} token
 * @param {*} id
 */
export async function delHeroAxios(token, id) {
const sendURL = `${checkEnvironment()}/heroes/${id}`
  try {
    await axios({
      url: sendURL,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
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

/**
 * Get all heroes.
 *
 * @export
 * @param {*} token
 * @return {*} 
 */
export async function getHeroesAxios(token){
  try {
    const response = await axios({
      url: `${checkEnvironment()}/heroes/all`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseArray = response.data;
    console.log(responseArray);
    return responseArray
  } catch (error) {
    console.log("Error in get heroes from db");
    console.log(error);
  }
}

/**
 * Add a hero
 *
 * @export
 * @param {*} token
 * @param {*} id
 */
export async function addHeroAxios(token, heroName,heroClass) {
const sendURL = `${checkEnvironment()}/heroes`
  try {
    await axios({
      url: sendURL,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
  name: heroName,
  heroClass: heroClass,
  level: 1,
  retirement:false
      }
    })          
  } catch (error) {
    console.log("error i post Hero");
    console.log(error.message);
  }
}