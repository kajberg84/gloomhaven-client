import React from "react";
import "./Modal.css";

/**
 * Renders the modal Component
 *
 * @param {*} props - children
 * @return {*} 
 */
const Modal = (props) => {
  const { children, closeModal } = props;
  return (    
    <div className="overlay">
      <div className="content">
      <button onClick={closeModal} className="small-button">
        X
      </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
