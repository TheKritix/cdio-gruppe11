import React, { useState } from 'react';
import './HomePage.css';
import card1 from './card1.png';
import card2 from './card2.png';
import card3 from './card3.png';
import card4 from './card4.png';
import card5 from './card5.png';
import card6 from './card6.png';
import card7 from './card7.png';



function HomePage() {
    return(
 <div className='sky'>
     <div className='title'>
    Solitaire
     </div>
     <ul className='buttons'>
     <button className='oneCardBtn'>1 Card</button>
     <button className='threeCardBtn'>3 Cards</button>
     </ul>
     
<div className='card one'>
<img src={card1}  height="130" ></img>
 </div>
 <div className='card two'>
 <img src={card2}  height="120"></img>
 </div>
 <div className='card three'>
 <img src={card3} height="180"></img> 
 </div>
 <div className='card four'>
 <img src={card4}  height="100"></img>
 </div>
 <div className='card five'>
 <img src={card5} height="130"></img>
 </div>
 <div className='card six'>
 <img src={card6} height="180"></img>
 </div>
 <div className='card seven'>
 <img src={card7} height="125"></img>
 </div>

 
 </div>

 
    )
}

export default HomePage;