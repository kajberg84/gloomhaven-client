import './Gloom.css'
import React, { useState, useEffect, useContext } from "react";
import { checkEnvironment } from "../../api/checkEnv";
import { getToken } from "../../api/getToken";
import axios from "axios";
import { postLocations } from "../../api/axiosCalls";
import { UserContext } from "../../statemanagement/UserContext";
import QuizCard from "../../ui/quizlocation/QuizCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import LocationButton from "../../ui/buttonlocation/LocationButton";

const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;

const Gloom = () => {
  const [locationsArray, setLocationsArray] = useState([]);
  const [availableArray, setAvailableArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);
  // Enskilt Location
  const [location, setLocation] = useState("");
  const [locationNumber, setLocationNumber] = useState("");

  const [unlocked, setUnlocked] = useState(false);
  const [available, setAvailable] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { tokenValue } = useContext(UserContext);
  const [userToken] = tokenValue;

  // Filter locations array
  const availableLocations = () => {
    const filteredArray = locationsArray.filter((location) => {
      return !location.completed;
    });
    setAvailableArray(filteredArray);
  };

  // Filter completed array
  const completedLocations = () => {
    const filteredArray = locationsArray.filter((location) => {
      return location.completed;
    });
    setCompletedArray(filteredArray);
  };

  // Hämta från DB
  useEffect(() => {
    async function getLocations() {
      try {
        const accToken = getToken();
        if (!accToken) {
          const error = new Error("No access token in gloom");
          error.status = 401;
          throw error;
        }
        const response = await axios({
          url: `${checkEnvironment()}/gloom`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + accToken,
          },
        });
        const locationArray = response.data;
        if (locationArray.length > 0) {
          setLocationsArray(locationArray);
        }
      } catch (error) {
        console.log("error i get location");
        console.log(error);
      }
    }
    getLocations();
  }, []);

  // När arrayen från databasen ändras
  // Kanske inte ha     availableLocations();     completedLocations(); häri????

  useEffect(() => {
    console.log("posting location to DB");
    async function updateLocations() {
      try {
        const accToken = getToken();
        if (!accToken) {
          const error = new Error("no access");
          error.status = 401;
          throw error;
        }
        const sendURL = `${checkEnvironment()}/gloom`
        await axios({
          url: sendURL,
          method: "POST",
          headers: {
            Authorization: "Bearer " + accToken,
          },
          data: {
            glooms: locationsArray
          }
        })          
      } catch (error) {
        console.log("error i post Location");
        console.log(error.message);
      }
    }    
      updateLocations();
      availableLocations();
      completedLocations();
  }, [locationsArray]);

  //change state on unlocked
  const toggleUnlocked = () => {
    setUnlocked(!unlocked);
  };
  //change state on available
  const toggleAvailable = () => {
    setAvailable(!available);
  };
  //change state on completed
  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const changeCompleted = (locationId) => {
    console.log("kossa", locationId);
    // toggle denna locations completed.
    // skicka till db
    // set updated value
  };

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    if (locationNumber.length < 1 || location.length < 1) {
      console.log("Någon av rutorna i add är tom");
      return;
    }

    //Create DB objektet
    const newLocation = {
      id: new Date().getTime(),
      locationnumber: locationNumber,
      locationname: location,
      locationnotes: "Inget ännu",
      completed: false,
    };
    // Adding location to array and reset single location
    setLocationsArray([...locationsArray].concat(newLocation));
    setLocation("");
    setLocationNumber("");
  };

  return (
    <div className="all-locations-wrapper">
      <div className="reputation disp-flex">rep bar here</div>
      <div className="location">
        {/* Form for adding*/}
        <form onSubmit={handleSubmitLocation} className="location-form-wrapper">
          <div>
            <input
              type="text"
              onChange={(e) => setLocationNumber(e.target.value)}
              value={locationNumber}
              placeholder="Scenario nummer"
            />
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              placeholder="Scenario Namn"
            />
          </div>

          <button type="submit" className="button-right">
            Lägg till
          </button>
        </form>
        {/* unlocked locations */}
        <div>
          <LocationButton toggleFunc={toggleUnlocked} buttonName="Unlocked" />
          <div className={`${unlocked ? "block" : "none"}`}>
            {locationsArray.map((location) => (
              <QuizCard
                key={location.id}
                {...location}
                changecomp={changeCompleted}
              />
            ))}
          </div>
        </div>

        {/* Available locations */}
        <div>
          <LocationButton
            toggleFunc={toggleAvailable}
            buttonName="Available(Not completed)"
          />
          <div className={`${available ? "block" : "none"}`}>
            {availableArray.map((location) => (
              <QuizCard
                key={location.id}
                {...location}
                changecomp={changeCompleted}
              />
            ))}
          </div>
        </div>

        {/* Completed locations */}
        <div>
          <LocationButton toggleFunc={toggleCompleted} buttonName="Completed" />
          <div className={`${completed ? "block" : "none"}`}>
            {completedArray.map((location) => (
              <QuizCard
                key={location.id}
                {...location}
                changecomp={changeCompleted}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Gloom;