import "./PartyMembers.css";
import { useState, useEffect } from "react";
import LocationButton from "../buttonlocation/LocationButton";
import ShowHero from "../showhero/ShowHero";
import { getToken } from "../../api/getToken";
// import { checkEnvironment } from "../../api/checkEnv";
// import axios from "axios";
import { delHeroAxios,  getHeroesAxios,  addHeroAxios,} from "../../api/axiosCalls";
import Modal from "../modal/Modal";
const PartyMembers = () => {
  // state
  const [heroButton, setHeroButton] = useState(false);
  const [heroesArray, setHeroesArray] = useState([]);
  // Individual hero states
  const [heroName, setHeroName] = useState("");
  const [heroClass, setHeroClass] = useState("");
  const [heroLevel, setHeroLevel] = useState("");
  const [heroReti, setHeroReti] = useState(false);
  const [modalState, setModalState] = useState(false);

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

  // Deleting hero
  const deleteHero = (id) => {
    const accToken = getToken();
    delHeroAxios(accToken, id);
    const updatedHeroes = [...heroesArray].filter((item) => item._id !== id);
    setHeroesArray(updatedHeroes);
  };

  // Adding hero and updating
  const handleAddHero = async (e) => {
    e.preventDefault();
    const accToken = getToken();
    addHeroAxios(accToken, heroName, heroClass, heroLevel, "POST");
    const responseArray = await getHeroesAxios(accToken);
    setHeroName("");
    setHeroClass("");
    setHeroLevel("");
    if (responseArray.length > 0) {
      setHeroesArray(responseArray);
    }
  };

  const modalHandle = () => {
    setModalState(!modalState);
  };

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
          <div className="disp-flex w100">
            <button onClick={() => modalHandle()} className="small-button">
              Add Hero
            </button>
          </div>
          {modalState && (
            <Modal closeModal={() => modalHandle()}>
              <form className="small-form-wrapper col" onSubmit={handleAddHero}>
                <p className="text-col-w"> HeroName </p>
                <input
                  className="p2"
                  type="text"
                  onChange={(e) => setHeroName(e.target.value)}
                  value={heroName}
                  placeholder="Heroname here"
                ></input>
                <p className="text-col-w mt5"> HeroClass </p>
                <input
                  className="p2"
                  type="text"
                  onChange={(e) => setHeroClass(e.target.value)}
                  value={heroClass}
                  placeholder="HeroClass here"
                ></input>
                <p className="text-col-w mt5"> HeroLevel </p>
                <input
                  className="p2"
                  type="text"
                  onChange={(e) => setHeroLevel(e.target.value)}
                  value={heroLevel}
                  placeholder="HeroLevel here"
                ></input>
                <button type="submit" className="mt5 small-button">
                  Add
                </button>
              </form>
            </Modal>
          )}

          {heroesArray.map((item) => (
            <ShowHero
              key={item._id}
              {...item}
              name={item.name}
              heroClass={item.heroClass}
              level={item.level}
              retirement={item.retirement}
            />
          ))}
        </div>
      </div>
      {/* form for adding hero */}
    </div>
  );
};

export default PartyMembers;
