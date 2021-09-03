import './Location.css'
import React, { useState, useEffect, useContext } from "react";
import { checkEnvironment } from "../../api/checkEnv";
import { getToken } from "../../api/getToken";
import axios from "axios";
import QuizCard from "../../ui/quizlocation/QuizCard";
import LocationButton from "../../ui/buttonlocation/LocationButton";

const Location = () => {
  const [locationsArray, setLocationsArray] = useState([]);
  const [availableArray, setAvailableArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);
  // Single Location
  const [location, setLocation] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  // Button states
  const [unlocked, setUnlocked] = useState(false);
  const [available, setAvailable] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Filter locations array for available/completed
  const availableLocations = () => {
    const filteredAvailable = locationsArray.filter((location) => {
      return !location.completed;
    });
    const filteredCompleted = locationsArray.filter((location) => {
      return location.completed;
    });
    setAvailableArray(filteredAvailable);
    setCompletedArray(filteredCompleted);
  };
 
  // Get from DB
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
          //Sorting array by location number
          const sortedCartItems = locationArray.sort((a,b) => {
            return a.locationnumber - b.locationnumber
          })
          setLocationsArray(sortedCartItems);
        }
      } catch (error) {
        console.log("error i get location");
        console.log(error);
      }
    }
    getLocations();
  }, []);

  // When array change from db
  useEffect(() => {
    function updateLocations() {
      availableLocations();      
    }    
    updateLocations();
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

  // TOGGLE completed button
  const changeCompleted = (locationId) => {
    const updatedLocations = [...locationsArray].map((item) => {
      if(item.id === locationId) {
        item.completed = !item.completed;
      }
      return item
    })
    setLocationsArray(updatedLocations)
  };

  const deleteLocation = (locationId) => {
    const updatedLocations = [...locationsArray].filter((item) => 
    item.id !== locationId)
    setLocationsArray(updatedLocations)
  }

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    if (locationNumber.length < 1 || location.length < 1) {
      console.log("Någon av rutorna i add är tom");
      return;
    }

    // Create DB object
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

  // Saving to db
  const  saveToDataBase = async () => {
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
  return (
    <div>
      {/* Form for adding*/}
      <form onSubmit={handleSubmitLocation} className="small-form-wrapper">
        <div className="ml10">
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

        <button type="submit" className="mr10 small-button">
          Lägg till
        </button>
      </form>
      {/* unlocked locations */}
      <div>
        <LocationButton
          toggleFunc={toggleUnlocked}
          buttonName="Unlocked"
          openClosed={unlocked}
          number={locationsArray.length}
          
        />
        <div className={`${unlocked ? "block" : "none"}`}>
          {locationsArray.map((location) => (
            <QuizCard
              key={location.id}
              {...location}
              deletecomp={deleteLocation}
              changecomp={changeCompleted}
              buttonname="Done"
              
            />
          ))}
        </div>
      </div>

      {/* Available locations */}
      <div>
        <LocationButton
          toggleFunc={toggleAvailable}
          buttonName="Available(Not completed)"
          openClosed={available}
          number={availableArray.length}
        />
        <div className={`${available ? "block" : "none"}`}>
          {availableArray.map((location) => (
            <QuizCard
              key={location.id}
              {...location}
              deletecomp={deleteLocation}
              changecomp={changeCompleted}
              buttonname="Done"
            />
          ))}
        </div>
      </div>

      {/* Completed locations */}
      <div>
        <LocationButton
          toggleFunc={toggleCompleted}
          openClosed={completed}
          buttonName="Completed"
          number={completedArray.length}
        />
        <div className={`${completed ? "block" : "none"}`}>
          {completedArray.map((location) => (
            <QuizCard
              key={location.id}
              {...location}
              deletecomp={deleteLocation}
              changecomp={changeCompleted}
              buttonname="Undo"
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => saveToDataBase()}
        className="small-form-wrapper loc-name"
      >
        Save Changes
      </button>
    </div>
  );
}

 
export default Location;