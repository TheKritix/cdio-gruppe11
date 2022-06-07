import React, { Component } from 'react';
import './PopUp.css';






const PopUp = props => {
    return(
        <div className="PopUpBox">
            <div className="PopUp">
            
               {/* <span className="close" onClick={props.handleClose}></span> */}
              {props.content}
            </div>
        </div>
    )
}

export default PopUp