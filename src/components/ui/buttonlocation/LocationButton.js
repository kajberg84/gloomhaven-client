import './LocationButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;

const LocationButton = (props) => {
  const { toggleFunc, buttonName } = props;

  return ( 
    <button
    className="location-buttons"
    onClick={() => toggleFunc()}
  >
    <p> </p>
    <p className="button-text">{buttonName}</p>
    <p className="button-right"> {arrowDown} </p>
  </button>
   );
}
 
export default LocationButton;