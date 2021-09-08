import "./ShowHero.css";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import { getToken } from "../../api/getToken";
import { editHeroAxios } from "../../api/axiosCalls";

const ShowHero = (props) => {
  const [modalState, setModalState] = useState(false);

  const modalHandle = () => {
    setModalState(!modalState);
  };

 // Editing hero
  const handleEditHero = (e) =>{
    e.preventDefault();

  }

  const { _id, name, heroClass, level, retirement} = props;
  return (
    <div className="minor-wrapper ">
      <div className="hero-wrapper">
        <p className="ml10">
          {name} -- {heroClass},level: {level}
        </p>
        <div>
          <button
            onClick={() => modalHandle(name,heroClass,level,_id)}
            className="small-button mr10"
          >
            Edit
          </button>

          {modalState && (
            <Modal closeModal={() => modalHandle(props)}>
              VIsa info på edithero
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowHero;

