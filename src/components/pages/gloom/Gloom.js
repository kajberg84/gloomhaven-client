import './Gloom.css'
import React, { useState, useEffect, useContext } from "react";
import { checkEnvironment } from "../../api/checkEnv";
import axios from "axios";
import { UserContext } from "../../statemanagement/UserContext";
import QuizCard from '../../ui/quizlocation/QuizCard';

const Gloom = () => {
  const [locationsArray, setLocationsArray] = useState([]);
  const [availableArray, setAvailableArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [available, setAvailable] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { tokenValue } = useContext(UserContext);
  const [userToken, setUserToken] = tokenValue;

  // Hämta från DB
  useEffect(() => {
    async function getLocations() {
      try {
        const tokens = window.localStorage.getItem("userTokens");
        const accToken = JSON.parse(tokens).access_token;
        if (!accToken) {
          const error = new Error("No access token in gloom");
          error.status = 401;
          throw error;
        }
        const response = await axios({
          url: `${checkEnvironment()}/gloom`,
          methed: "GET",
          headers: {
            Authorization: "Bearer " + accToken,
          },
        });
        const locationArray = response.data;
        if (locationArray.length > 0) {
          console.log("useeffekt")
          setLocationsArray(locationArray);
          availableLocations();
          completedLocations();
        }
      } catch (error) {
        console.log("error i get location");
        console.log(error);
      }
    }
    getLocations();
  }, []);

  {
    /* <form>
        <input 
        type="text"
        onChange={(e)=>setLocation(e.target.value)}
        value={location}
        placeholder="Add Location here"
        />
        <button 
        type="submit"
        >Add</button>
      </form> */
  }

  // Filter locations array
  const availableLocations = () => {
      const filteredArray = locationsArray.filter((location) => {
        return !location.completed;
      });
      setAvailableArray(filteredArray)
  };

  // Filter completed array
  const completedLocations = () => {
    const filteredArray = locationsArray.filter((location) => {
      return location.completed;
    });
    setCompletedArray(filteredArray)
};

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
    console.log("kossa", locationId)
  }

  return (
    <div className="all-locations-wrapper">
      <div className="reputation">Reputation Bar Here</div>
      <div className="location">
        {/* unlocked locations */}
        <div>
          <button className="location-buttons" onClick={() => toggleUnlocked()}>
            Unlocked
          </button>
          <div className={`${unlocked ? "block" : "none"}`}>
            {locationsArray.map((location) => 
            <QuizCard key={location.id} {...location} changecomp={changeCompleted}/>
            )}
          </div>
        </div>

        {/* Available locations */}
        <div>
          <button
            className="location-buttons"
            onClick={() => toggleAvailable()}
          >
            Available(Not completed)
          </button>
          <div className={`${available ? "block" : "none"}`}>
            {availableArray.map((location) => 
                  <QuizCard key={location.id} {...location}/>
                  )}
          </div>
        </div>

        {/* Completed locations */}
        <div>
          <button
            className="location-buttons"
            onClick={() => toggleCompleted()}
          >
            Completed
          </button>
          <div className={`${completed ? "block" : "none"}`}>
            {completedArray.map((location) => 
                  <QuizCard key={location.id} {...location}/>
                  )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Gloom;