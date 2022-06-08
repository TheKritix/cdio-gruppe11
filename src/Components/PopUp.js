import React, { Component } from "react";
import "./PopUp.css";

const PopUp = (props) => {
  return (
    <div className="PopUpBox">
      <div className="PopUp">
        {props.content}
      </div>
    </div>
  );
};

export default PopUp;
