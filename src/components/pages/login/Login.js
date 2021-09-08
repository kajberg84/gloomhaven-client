//React imports
import './Login.css'
import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';

// Functional imports
import { UserContext } from '../../statemanagement/UserContext';
import { postAxios } from '../../api/axiosCalls';
import { loginFormValidation } from "../../api/formValidation";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { userValue, tokenValue } = useContext(UserContext);
  const [appUser, setAppUser] = userValue;
  const [userToken, setUserToken] = tokenValue;
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showErrorStatus, setShowErrorStatus] = useState(null);
  const [errorLogin, setErrorLogin ] = useState({})


  const history = useHistory();

  // Handling response from Login
  function handleRespLogin(tokens) {
    setUserToken(tokens);
    const parsedJwt = jwt_decode(tokens.access_token);
    setAppUser(parsedJwt.email);
    history.push("/gloom");
  }

  // Handling Login
  async function handleLogin(e) {
    e.preventDefault();

    //ska ha login validation här.
    const loginResult = loginFormValidation(userEmail, userPassword);

    if (loginResult.formIsValid) {
      const responseLogin = await postAxios(
        {},
        `login?email=${userEmail}&password=${userPassword}`
      );
      if (responseLogin) {
        handleRespLogin(responseLogin);
      } else {
        console.log("login response false, fel lösen / user");
        //visa error
        setShowErrorStatus(true);
      }
    } else {
      console.log("login false på clientsidan");
      //ska visa error status
      setErrorLogin(loginResult.formError);
    }
  }

  return (
    <div className="form-container mt10">
      <div className="form-wrapper">
        <h1 className="form-header">Logga in</h1>
        <form onSubmit={handleLogin} noValidate>
          <input
            className="form-control form-input"
            type="email"
            name="email"
            placeholder="Epost"
            required
            value={userEmail}
            onChange={(e) => {
              setShowErrorStatus(false);
              setErrorLogin({});
              setUserEmail(e.target.value);
            }}
          />

          {/* password */}
          <input
            className="form-control form-input"
            type="password"
            name="password"
            placeholder="Lösenord"
            required
            value={userPassword}
            onChange={(e) => {
              setShowErrorStatus(false);
              setErrorLogin({});
              setUserPassword(e.target.value);
            }}
          />
          <button className="form-button mb10" type="submit">
            Logga in
          </button>
        </form>
        
          <div className="login-error">{errorLogin.password}</div>
          <div className="login-error">{errorLogin.email}</div>
          {showErrorStatus && <div className="login-error"> Fel användare eller lösenord </div>}

        <p className="mt10">Har du inget konto? </p>
        <Link
          className="btn-secondary mt5"
          to="/registration"
          onClick={() => history.push("/register")}
        >
          <p>Registrera här</p>
        </Link>
      </div>
    </div>
  );
}; 
export default Login;
