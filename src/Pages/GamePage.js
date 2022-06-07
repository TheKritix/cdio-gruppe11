import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js"
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import PlayingCardReg from "../Components/rf-imageReg/rf-ir";
import Tableau from "../Components/GamePage/Tableau.js";
import MoveList from "../Components/GamePage/MoveList.js"
import React, { useState, useEffect } from "react";

const GamePage = () => {

    const [moves, setMoves] = useState([
        {id: 1, move: 'Move 9 of hearts to pee of poo'},
        {id: 2, move: 'Move X of X to X of X'},
        {id: 3, move: 'Move X of X to X of X'}
    ])

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
                    <MoveList moves={moves}/>
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