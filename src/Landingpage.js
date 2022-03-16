import './Landingpage.css';
import React from "react";
import Button from './Components/Button';
import logo from './assets/images/logo.frontpage.jpg';



function Landingpage() {
  return (
    <div className="landingpage">
      <img src={logo} className = "frontpage-logo" alt="logo" />
         <h1 className='title'>Welcome to solve Solitaire</h1>
         <ul className='button'>
         <button className='buttonDesign'>One Card</button>
         <button className='buttonDesign'>Tree Card</button>
         </ul>
        </div>
  );
}

export default Landingpage;
