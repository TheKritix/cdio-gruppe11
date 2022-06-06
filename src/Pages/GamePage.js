import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js"
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import PlayingCardReg from "../Components/rf-imageReg/rf-ir";
import Tableau from "../Components/GamePage/Tableau.js";
import MoveList from "../Components/GamePage/MoveList.js"
import React, { useState, useEffect } from "react";

const GamePage = () => {

    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const isCameraOpenHandler = () => {
        setIsCameraOpen((isCameraOpen) => {
            return !isCameraOpen;
        });
    }

    return (
        <>
            <div className="container-gamepage">
                <div className="table-div">
                    {isCameraOpen ? (
                        <PlayingCardReg/>
                    ) : <></>} 
                    <MoveList/>
                </div>
                  
                <div className="advance-div">
                    <AdvanceButton 
                        cameraHandler={isCameraOpenHandler}
                    />
                </div>
            </div>
        </>
    )

}

export default GamePage