import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js"
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import PlayingCardReg from "../Components/rf-imageReg/rf-ir";
import Tableau from "../Components/GamePage/Tableau.js";
import MoveList from "../Components/GamePage/MoveList.js"
import React, { useState, useEffect } from "react";

const GamePage = () => {

    const [cards, setCards] = useState([
        {id: 1, prop: 'H3'},
        {id: 2, prop: 'S4'},
        {id: 3, prop: 'HA'},
        {id: 4, prop: 'C2'},
        {id: 5, prop: 'DQ'},
        {id: 6, prop: 'D8'},
        {id: 7, prop: 'SK'}
    ])

    const [isCameraOpen, setIsCameraOpen] = useState(true);

    const isCameraOpenHandler = () => {
        setIsCameraOpen((isCameraOpen) => {
            return !isCameraOpen;
        });
    }

    return (
        <>
            <div className="container-gamepage">
                {isCameraOpen ? (
                    <PlayingCardReg/>
                ) : <Tableau cards={cards}/>} 
                    {/* <MoveList moves={moves}/> */}
                {/* <div className="advance-div">
                    <AdvanceButton
                        cameraHandler={isCameraOpenHandler}
                    />
                </div> */}
            </div>
        </>
    )

}

export default GamePage