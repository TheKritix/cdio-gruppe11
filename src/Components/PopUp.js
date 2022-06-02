import React, { Component } from 'react';
import './PopUp.css';



const PopUp = props => {
    return(
        <div className="PopUpBox">
            <div className="PopUp">
                {props.content}
              { /* <span className="close" onClick={props.handleClose}></span>*/}
            </div>
        </div>
    )
}

export default PopUp