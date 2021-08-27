import validator from 'validator'
import axios from 'axios'
import { checkEnvironment } from '../api/checkEnv'

  /**
   * Check user registered values.
   *
   * @param {String} userData - Containing userinfo.
   * @returns {object, Boolean} - Object contaiing error msg, Boolean
   */

   export const formValidation = async (userData) => {
    const { email, email2, password, password2 } = userData
        let formError = {}
        let formIsValid = true
    
        const duppuser = await CheckIfUserNotExistInDB(email);
    
        // check if user exists in db, true if exists DOESNT WORK
        if(!duppuser){
          formIsValid = false
          formError['email'] = '* Denna epost finns redan registrerad'
        }
   
        if(email !== email2){
          formIsValid = false
          formError['email'] = '* Epost matchar inte'
        }
    
        if(validator.isEmpty(email)){
          formIsValid = false
          formError['email'] = '* Ange en epost'
        }
    
        if(!validator.isEmail(email)){
          formIsValid = false
          formError['email'] = '* Ange en giltig epost'
        }
    
        if(password !== password2){
          formIsValid = false
          formError['password'] = '* Lösenord matchar inte'
        }
    
        if (password.length < 10 ) {
          formIsValid = false
          formError['password'] = '* Lösenordet måste vara minst 10 tecken'
        }
    
        return {formError, formIsValid}
      }


        /**
   * Check for email in db.
   *
   * @param {String} email - Input email.
   * @returns {boolean} - Returns true if email exists
   */
export const CheckIfUserNotExistInDB = async (email) => {
  console.log("inne i checkifUSerexist")
  try {
    const response = await axios ({
      url: `${checkEnvironment()}/users?email=${email}` ,
      method: 'GET',
    })
      if(response.status === 204){
        console.log('status 204, user dont exist')
      } else {
        console.log('error ')
      }
    return true
  } catch (error) {
    console.log("Error i checkEmailDB",error)
  }
  
  }

  /**
   * Check user login values.
   *
   * @param {String} email - Containing user Email.
   * @param {String} password - Containing user Password.   
   * @returns {object, Boolean} - Object containing error msg, Boolean
   */
   export const loginFormValidation = (email, password) => {
    let formError = {}
    let formIsValid = true

    if (!validator.isEmail(email)) {
      formIsValid = false
      formError['email'] = '* Skriv en giltig epost'
    }

    if (password.length < 10 ) {
      formIsValid = false
      formError['password'] = '* Lösenordet måste vara minst 10 tecken'
    }

    return {formError, formIsValid}
  }