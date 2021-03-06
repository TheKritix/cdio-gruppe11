import Card1 from "../Assets/Images/card1.png";
import Card2 from "../Assets/Images/card2.png";
import Card3 from "../Assets/Images/card3.png";
import Card4 from "../Assets/Images/card4.png";
import Card5 from "../Assets/Images/card5.png";
import Card6 from "../Assets/Images/card6.png";
import Card7 from "../Assets/Images/card7.png";
import Card8 from "../Assets/Images/card8.png";
import Card9 from "../Assets/Images/card9.png";
import Card10 from "../Assets/Images/card10.png";
import "./LandingPage.css";
import { useState } from "react";
import PopUp from "./PopUp";

const Landingpage = () => {



  return (
    <>
     
      <div className="landingpage">
        <div className="title">Solitaire</div>

        <div className="deck card1">
          <img src={Card1} alt="Joker" height="150"></img>
        </div>
        <div className="deck card2">
          <img src={Card2} alt="Card facing down" height="300"></img>
        </div>
        <div className="deck card3">
          <img src={Card3} alt="cloves of 5" height="150"></img>
        </div>
        <div className="deck card4">
          <img src={Card4} alt="Diamonds of ace" height="200"></img>
        </div>
        <div className="deck card5">
          <img src={Card5} alt="Diamonds of king" height="200"></img>
        </div>
        <div className="deck card9">
          <img src={Card9} alt="Back of card" height="250"></img>
        </div>
        <div className="deck card7">
          <img src={Card7} alt="spade of 4" height="150"></img>
        </div>
        <div className="deck card8">
          <img src={Card8} alt="clove of king" height="250"></img>
        </div>
        <div className="deck card10">
          <img src={Card10} alt="Back of card2" height="200"></img>
        </div>
      </div>
      <div className="button-list">
        <a href="/gamepage">
          <button id="startButton" className="button" >
            Start Game
          </button>
        </a>
      </div>
    </>
  )
}

export default Landingpage;