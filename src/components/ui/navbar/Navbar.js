// React imports
import "./Navbar.css";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../statemanagement/UserContext";

// Functional imports

// Component imports
import Logo from "../logo/Logo";
import Hamburger from "../hamburger/Hamburger";
/**
 * Rendering navbar
 *
 * @return {*}
 */
const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { userValue } = useContext(UserContext);
  const [appUser, setAppUser] = userValue;
  let history = useHistory();

  const logoutUser = () => {
    setIsChecked(!isChecked);
    localStorage.clear();
    setAppUser(null);
    history.push("/login");
  };

  return (
    <nav className="nav-wrapper">
      <div className="navbar-content-wrapper">
        <div className="nav-left disp-flex">
          <Hamburger />
        </div>

        <div className="nav-middle disp-flex">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="nav-right disp-flex">
          {appUser ? (
            <div>
              <p>{appUser}</p>
              <p 
              className="login-link"
              onClick={() => { logoutUser() }}>
                Logout
              </p>
            </div>
          ) : (
            <div>
              <p>
                <Link className="login-link" to="/login">
                  Logga in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
