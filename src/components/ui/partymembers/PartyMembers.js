import "./PartyMembers.css";
import { useState, useEffect } from "react";
import LocationButton from "../buttonlocation/LocationButton";
import ShowHero from "../showhero/ShowHero";
import { getToken } from "../../api/getToken";
// import { checkEnvironment } from "../../api/checkEnv";
// import axios from "axios";
import { delHeroAxios,getHeroesAxios } from "../../api/axiosCalls";
const PartyMembers = () => {
  // state
  const [heroButton, setHeroButton] = useState(false);
  const [heroesArray, setHeroesArray] = useState([]);

  // Get heroes from DB
  useEffect(() => {
    async function getHeroes() {
      try {
        const accToken = getToken();
        if (!accToken) {
          const error = new Error("No access token in gloom");
          error.status = 401;
          throw error;
        }
        // Get heroes from db
        const responseArray = await getHeroesAxios(accToken)
        if (responseArray.length > 0) {
          setHeroesArray(responseArray);
        }
      } catch (error) {
        console.log("Error in get heroes from db");
        console.log(error);
      }
    }
    getHeroes();
  }, []);

// When array of heroes change
useEffect(()=> {
  function updatedHeroes(){
    console.log('updated heroes array')
  }
  updatedHeroes();
},[heroesArray])

  // Functions
  const toggleHeroButton = () => {
    setHeroButton(!heroButton);
  };  
  const handleSubmitHero = (e) => {
    e.preventDefault();
    console.log("submitted hero");
  };

  // Deleting hero and updating heroes
  const deleteHero = (id) => {
    const accToken = getToken();
    delHeroAxios(accToken, id);
    const updatedHeroes = [...heroesArray].filter((item) => 
    item._id !== id)
    setHeroesArray(updatedHeroes)

  }

  return (
    <div>
      <LocationButton
        toggleFunc={toggleHeroButton}
        buttonName="Heroes"
        openClosed={heroButton}
      />
      <div className={`${heroButton ? "block" : "none"}`}>
        <div>
          <form onSubmit={handleSubmitHero}>
            <div>form for adding</div>
            <button type="submit" className="mr10 small-button">
              Lägg till heroes knapp
            </button>
          </form>
          {heroesArray.map((item)=> (
            <ShowHero 
            key={item._id}
            {...item}
            name={item.name}
            heroClass={item.heroClass}
            level={item.level}
            retirement={item.retirement}
            deletehero={deleteHero}
            />
          ))}
        </div>
      </div>

      {/* form for adding hero */}
    </div>
  );
};

export default PartyMembers;
