// React imports
import './Registration.css'
import '../../../FormStyles.css'

import React, { useState } from "react"
import { postAxios } from "../../api/axiosCalls.js";
import { Link, useHistory } from "react-router-dom";

// Functional imports
import { formValidation } from '../../api/formValidation';


/**
 * Render view for reigstration form
 *
 * @return {*}
 */
const Registration = () => {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(null);
  // const [showLoginButton, setShowLoginButton] = useState(false);
  const [errorHandling, setErrorHandling ] = useState({})


  const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);
    // Handling change of input
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handling form submit. if true push to server with info.
    const handleSubmit = async (e) => {
      e.preventDefault();
      onSubmit?.(formData);

      // HÄR kolla så alla värden är true.
      const result = await formValidation(formData);

      if (result.formIsValid) {
        postAxios({ email, password }, "users");
        console.log("registrering inskickad : ", email);
        setShowMessage("Registrering lyckad!")
      } else {
        console.log(" något fel i postreg");
        setErrorHandling(result.formError)
      }
      // här ha lite error hantering och axios o showmessage.
    };
    return { formData, handleInputChange, handleSubmit };
  };
  const { formData, handleInputChange, handleSubmit } = useForm({
    email: "",
    email2: "",
    password: "",
    password2: "",
  });

  const { email, email2, password, password2 } = formData;

  return (
    <div className="form-container mt10">
      <div className="form-wrapper">
        <h1 className="form-header">Registrera här</h1>
        <p> Fyll i alla fält</p>
        <form onSubmit={handleSubmit} noValidate className="regform">
          {/* email */}
          <input
            className="form-control form-input"
            type="email"
            name="email"
            placeholder="Epost"
            value={email}
            onChange={handleInputChange}
          />

          <input
            className="form-control form-input"
            type="email"
            name="email2"
            placeholder="Återupprepa epost"
            value={email2}
            onChange={handleInputChange}
          />
          <div className="user-error">{errorHandling.email}</div>
          <input
            className="form-control form-input"
            type="password"
            name="password"
            placeholder="Lösenord"
            value={password}
            onChange={handleInputChange}
          />
          <div className="password-text">
           Lösenordet måste innehålla minst 10 tecken.
          </div>
          <input
            className="form-control form-input"
            type="password"
            name="password2"
            placeholder="Återupprepa lösenord"
            value={password2}
            onChange={handleInputChange}
          />
          <div className="user-error">{errorHandling.password}</div>

          <button className="form-button mb10" type="submit">
            Skapa konto
          </button>
        </form>
          {/* show message if submit regform */}
          {showMessage ? (
            <p className="user-registrated">{showMessage}</p>            
          ) : (
            <p className="mt10">Har du redan ett konto? </p>
          )}

        <Link
          className=" mt5 btn-secondary"
          to="/login"
          onClick={() => history.push("/login")}
        >
          <p> Logga in</p>
        </Link>
        {/* {showLoginButton && <button type="button" className="form-button" onClick={handleClick}>To Login</button>} */}
      </div>
    </div>
  );
};

export default Registration;