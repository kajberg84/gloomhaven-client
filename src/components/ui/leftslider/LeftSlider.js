import "./LeftSlider.css";
import React, { useContext } from "react";
import { UserContext } from "../../statemanagement/UserContext";
/**
 * Settings Component that slides in from left
 *
 * @return {*}
 */
const LeftSlider = (props) => {
  const { leftSliderState } = useContext(UserContext);
  const [leftSlider, setLeftSlider] = leftSliderState;

  let leftSliderClasses = "left-settings";
  if (leftSlider) {
    leftSliderClasses = "left-settings left-open";
  }

  const closeLeftSlider = () => {
    setLeftSlider(false);
  };

  return (
    <div className={leftSliderClasses}>
      <div className="left-settings-wrapper">
        <button onClick={() => closeLeftSlider()}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default LeftSlider;
