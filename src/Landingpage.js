import './Landingpage.css';
import React from "react";
import Button from './Components/Button';
import logo from './assets/images/logo.frontpage.jpg';



function Landingpage() {
  return (
    <div className="landingpage">
      <div className='Img'>
      <img src={logo} className = "frontpage-logo" alt="logo" />
         <h1 className='title'>Welcome to solve Solitaire</h1>
         </div>
         <div>
         <ul className='button'>
         <button className='buttonDesign'>One Card</button>
         <button className='buttonDesign'>Tree Card</button>
         </ul>
         </div>
        </div> 
  );
}

export default Landingpage;
