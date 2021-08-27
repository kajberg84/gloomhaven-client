//React imports
import "./Hamburger.css";
import React, {useState, useContext} from "react";

import { Link, useHistory} from "react-router-dom";
// Functional imports
import { UserContext } from '../../statemanagement/UserContext';

const Hamburger = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { userValue } = useContext(UserContext);
  const [appUser, setAppUser] = userValue;
 let history = useHistory();

  const changeCheckBox = () => {
    setIsChecked(!isChecked)
  }

const logoutUser = () => {
  setIsChecked(!isChecked)
  localStorage.clear();
  setAppUser(null);
  history.push("/login");
}

  return (
    <div className="menu-wrapper">
      <input
        type="checkbox"
        className="toggler"
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
        checked={isChecked}
      />
      <div className="hamburger disp-flex">
        <div></div>
      </div>
      <div className="disp-flex menu">
        <div className="hamburger-link-wrapper disp-flex ">
          <div>
            <ul className="hamburger-ul">
              {appUser ? (
                <div>
                  <li>
                    <Link
                      className="hamb-links"
                      to="/login"
                      onClick={() => {
                        logoutUser();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hamb-links"
                      to="/gloom"
                      onClick={() => changeCheckBox()}
                    >
                      Gloom
                    </Link>
                  </li>
                </div>
              ) : (
                <p>
                  <li>
                    <Link
                      className="hamb-links"
                      to="/login"
                      onClick={() => changeCheckBox()}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hamb-links"
                      to="/registration"
                      onClick={() => changeCheckBox()}
                    >
                      Registrera konto
                    </Link>
                  </li>
                </p>
              )}

              <li>
                <Link
                  className="hamb-links"
                  to="/contact"
                  onClick={() => changeCheckBox()}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
