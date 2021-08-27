import './Home.css'
import React, { useContext } from "react";
import { UserContext } from "../../statemanagement/UserContext";
const Home = () => {
  const { value } = useContext(UserContext);
  const [startButton, setStartButton] = value;

  const closeOverLay = () => {
    setStartButton(false);
  };

  return (
    <div className="disp-flex home-wrapper">
      {startButton ? (
        <div className="home-start disp-flex col">
          <h1 className="fz3">Bergs GloomHaven</h1>
          <div className="text-cen mt10">
            <p className="start-text">
             Tanken är tanken bakom healern.
            </p>
            <p className="start-text mt10">
             Kommer bara vara en liten beta då jag inte har super mycket tid.
            </p>
          </div>

          <a href="#me" className="btn home-btn mt10" onClick={closeOverLay}>
            Fortsätt
          </a>
        </div>
      ) : (
        <div className="home-main disp-flex col">
          <h1 className="fz2">Välkommen till main.</h1>
          <p className="mt10 fz3"> Under Konstruktion </p>
        </div>
      )}
    </div>
  );
};
 
export default Home;
