import "./PartyMembers.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../statemanagement/UserContext";
import LocationButton from "../buttonlocation/LocationButton";
import ShowHero from "../showhero/ShowHero";
import { getToken } from "../../api/getToken";
// import { checkEnvironment } from "../../api/checkEnv";
// import axios from "axios";
import { delHeroAxios, getHeroesAxios, addHeroAxios } from "../../api/axiosCalls";
const PartyMembers = () => {
  // state
  const [heroButton, setHeroButton] = useState(false);
  const [openHeroForm, setOpenHeroForm] = useState(false);
  const [heroesArray, setHeroesArray] = useState([]);
  // Individual hero states
  const [heroName, setHeroName] = useState("");
  const [heroClass, setHeroClass] = useState("");
  const [heroLevel, setHeroLevel] = useState("1");
  const [heroReti, setHeroReti] = useState(false);
  const { leftSliderState } = useContext(UserContext);
  const [leftSlider, setLeftSlider] = leftSliderState;

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
        const responseArray = await getHeroesAxios(accToken);
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

  // Functions
  const toggleHeroButton = () => {
    setHeroButton(!heroButton);
  };
  const toggleAddHero = () => {
    setOpenHeroForm(!openHeroForm);
  };

  // Deleting hero
  const deleteHero = (id) => {
    const accToken = getToken();
    delHeroAxios(accToken, id);
    const updatedHeroes = [...heroesArray].filter((item) => item._id !== id);
    setHeroesArray(updatedHeroes);
  };

  // Edit hero
  const editHero = (hero) => {
    console.log('editing hero',hero)
  // skapa en popup där ta in info. 
  setLeftSlider(true)
  };

  // Adding hero and updating
  const handleAddHero = async (e) => {
    e.preventDefault();
    const accToken = getToken();
    addHeroAxios(accToken, heroName, heroClass);
    const responseArray = await getHeroesAxios(accToken);
    setHeroName("")
    setHeroClass("")
    if (responseArray.length > 0) {
      setHeroesArray(responseArray);
    }
  }

  return (
    <div>
      <LocationButton
        toggleFunc={toggleHeroButton}
        buttonName="Heroes"
        openClosed={heroButton}
        number={heroesArray.length}
      />
      <div className={`${heroButton ? "block" : "none"}`}>
        <div>
          <div className=" hero-button-wrapper">

          <button onClick={toggleAddHero} className="mr10 small-button ">
          {`${openHeroForm ? "Close" : "Open"}`} add hero
          </button>
          </div>
          <div className={`${openHeroForm ? "block" : "none"}`}>
            <form className="small-form-wrapper" onSubmit={handleAddHero}>
              <input
                type="text"
                onChange={(e) => setHeroName(e.target.value)}
                value={heroName}
                placeholder="Heroname here"
              ></input>
              <input
                type="text"
                onChange={(e) => setHeroClass(e.target.value)}
                value={heroClass}
                placeholder="HeroClass here"
              ></input>
              <button type="submit" className="mr10 small-button">
                Add
              </button>
            </form>
          </div>
          {heroesArray.map((item) => (
            <ShowHero
              key={item._id}
              {...item}
              name={item.name}
              heroClass={item.heroClass}
              level={item.level}
              retirement={item.retirement}
              editHero={editHero}              
            />
          ))}
        </div>
      </div>
      {/* form for adding hero */}
    </div>
  );
};

export default PartyMembers;
