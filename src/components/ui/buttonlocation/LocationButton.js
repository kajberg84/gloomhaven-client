import './LocationButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";


const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;
const arrowUp = <FontAwesomeIcon icon={faArrowUp} />;

const LocationButton = (props) => {
  const { toggleFunc, buttonName, openClosed } = props;
  return ( 
    <button
    className="location-buttons"
    onClick={() => toggleFunc()}
  >
    <p> </p>
    <p className="button-text">{buttonName}</p>
    
    {openClosed ? (
      <p className="mr10"> {arrowUp} </p> 
      ): (
      <p className="mr10"> {arrowDown} </p> 
      
    )}
  </button>
   );
}
 
export default LocationButton;