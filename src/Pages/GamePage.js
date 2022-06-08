import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js";
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import PlayingCardReg from "../Components/rf-imageReg/rf-ir";
import Tableau from "../Components/GamePage/Tableau.js";
import MoveList from "../Components/GamePage/MoveList.js";
import React, { useState, useEffect } from "react";
import PopUp from "../Components/PopUp";
import { IconButton } from "@material-ui/core";
import { Help } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { color } from "@mui/system";

//test 
const GamePage = () => {
  const [moves, setMoves] = useState([
    { id: 1, move: "Move 9 of hearts to pee of poo" },
    { id: 2, move: "Move X of X to X of X" },
    { id: 3, move: "Move X of X to X of X" },
  ]);

  

    const [cards, setCards] = useState([
        {id: 1, prop: 'H3'},
        {id: 2, prop: 'S4'},
        {id: 3, prop: 'HA'},
        {id: 4, prop: 'C2'},
        {id: 5, prop: 'DQ'},
        {id: 6, prop: 'D8'},
        {id: 7, prop: 'SK'}
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
                    ) : <Tableau cards={cards}/>} 
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
  