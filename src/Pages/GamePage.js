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

const GamePage = () => {
  const [moves, setMoves] = useState([
    { id: 1, move: "Move 9 of hearts to pee of poo" },
    { id: 2, move: "Move X of X to X of X" },
    { id: 3, move: "Move X of X to X of X" },
  ]);

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const isCameraOpenHandler = () => {
    setIsCameraOpen((isCameraOpen) => {
      return !isCameraOpen;
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="container-gamepage">
        <div className="button-div">
          <IconButton
            classname=" helpIcon"
            display="flex"
            justifyContent="flex-end"
            style={{ color: "white" }}
            onClick={togglePopup}
          >
            <Help></Help>
          </IconButton>
        </div>
        {isOpen && (
          <PopUp
            content={
              <div className="popup-div">
                <IconButton
                  style={{ float: "right", color: "rgb(121,121,121)" }}
                  size="small"
                >
                  <Close className="closeBtn" onClick={togglePopup}></Close>
                </IconButton>

                <h3>Game rules</h3>

                <ol>
                  <li>
                    Lay up a solitaire game on your table, and use your computer
                    camera to take a picture. You can find the general solitaire
                    game rules in this link:{" "}
                    <a href="https://web.engr.oregonstate.edu/~afern/papers/solitaire.pdf">
                      {" "}
                      Solitaire game rules
                    </a>
                  </li>
                  <li> Open camera by using the button "Camera" </li>
                  <li>
                    {" "}
                    Take picture of your solitaire game and click "OK" to accept
                    the picture. The game will now begin!
                  </li>
                  <li>See suggestion for the next possible move.</li>
                  <li>
                    Once you have made your move. Take a new piture of your
                    solitaire, and you will now get a new posible move.
                  </li>
                  <li>To the right you will see the list of moves made.</li>
                  <li>
                    Continue until your solitaire is solved or it's no longer
                    possible to make a new move.
                  </li>
                </ol>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
        <div className="table-div">
          {isCameraOpen ? <PlayingCardReg /> : <></>}
          <MoveList moves={moves} />
        </div>

        <div className="advance-div">
          <AdvanceButton cameraHandler={isCameraOpenHandler} />
        </div>
      </div>
    </>
  );
};

export default GamePage;
