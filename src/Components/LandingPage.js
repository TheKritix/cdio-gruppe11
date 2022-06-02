<<<<<<< HEAD
import React, { Component } from 'react';
import Card1 from '../assets/Images/card1.png';
import Card2 from '../assets/Images/card2.png';
import Card3 from '../assets/Images/card3.png';
import Card4 from '../assets/Images/card4.png';
import Card5 from '../assets/Images/card5.png';
import Card6 from '../assets/Images/card6.png';
import Card7 from '../assets/Images/card7.png';
import Card8 from '../assets/Images/card8.png';
import Card9 from '../assets/Images/card9.png';
import Card10 from '../assets/Images/card10.png';
import './LandingPage.css';

=======
import React, { Component } from "react";
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
import { Link } from "react-router-dom";
>>>>>>> 203f8dca34f01e23fff8496dd9847527cb738414

class LandingPage extends Component {
  render() {
    return (
      <>
        {/* <div className='popup-wrap'>
            <div className='popup-div'>
                <h1>Welcome to Solitaire</h1>
                    <p>
                     Take a picture of you solitaire and get the best next move. 
                    </p>
                    <button><a href='#'> Got it!</a></button>
                </div>
             </div> */}
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
        <ul className="button-list">
          <a href="http://senguash.com">
            <button id="startButton" className="button">
              Start Game
            </button>
          </a>
        </ul>
      </>
    );
  }
}
export default LandingPage;

