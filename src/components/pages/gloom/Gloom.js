import './Gloom.css'
import React, { useState, useEffect, useContext } from "react";
import { checkEnvironment } from "../../api/checkEnv";
import axios from "axios";
import { UserContext } from "../../statemanagement/UserContext";

const Gloom = () => {
  const [locationsArray, setLocationsArray] = useState([]);
  const [location, setLocation] = useState("");
  const [editingText, setEditingText] = useState("");
  const [locationEditing, setLocationEditing] = useState(null);
  const { tokenValue } = useContext(UserContext);
  const [userToken, setUserToken] = tokenValue;

  // Hämta från DB
  useEffect(() => {
    async function getLocations() {
      try {
        console.log(userToken);
        const kossa = window.localStorage.getItem("userTokens");
        const accToken = JSON.parse(kossa).access_token;
        console.log("i gloom access", accToken);
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
        console.log("resp in gloom from db", locationArray);
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

  return (
    <div className="all-locations-wrapper">

      <div className="reputation"></div>
      <div className="location">
      {/* <form>
        <input 
        type="text"
        onChange={(e)=>setLocation(e.target.value)}
        value={location}
        placeholder="Add Location here"
        />
        <button 
        type="submit"
        >Add</button>
      </form> */}
        <div>
          {locationsArray.map((location) => (
            <div key={location.id} className="location-wrapper">
              <p>#{location.locationnumber} {location.locationname}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
 
export default Gloom;