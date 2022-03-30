import React, { useState } from 'react';
import './HomePage.css';
import card1 from './card1.png'
import card2 from './card2.png'
import card8 from './card8.png'
import card6 from './card6.png'
import card4 from './card4.png'





function HomePage() {
    return(
 <div className='sky'>
     <div className='title'>
    Solitaire
     </div>
     <ul className='buttons'>
     <button className='card1Btn'>1 Card</button>
     <button className='card3Btn'>3 Cards</button>
     </ul>
<div className='emoji iwazaru'>
<img src={card2}  ></img>
 </div>
 <div className='emoji bomb'>
 <img src={card1} className="card1"></img>
 </div>
 <div className='emoji fire'>
 <img src={card4} ></img> 
 </div>
 <div className='emoji percent'>
 <img src={card8} ></img>
 </div>
 <div className='emoji heart'>
 <img src={card6} ></img>
 </div>
 </div>

 
 
 
    )
}

export default HomePage;