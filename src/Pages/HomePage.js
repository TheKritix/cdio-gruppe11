import React, { useState } from 'react';
import './HomePage.css';
import card1 from './card1.png';
import card2 from './card2.png';
import card3 from './card3.png';
import card4 from './card4.png';
import card5 from './card5.png';
import card7 from './card7.png';
import card8 from './card8.png';
import card9 from './card9.png';
import card10 from './card10.png';



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
<img src={card2}  height="150" ></img>
 </div>
 <div className='emoji bomb'>
 <img src={card1}  height="100"></img>
 </div>
 <div className='emoji fire'>
 <img src={card4} height="200"></img> 
 </div>
 <div className='emoji percent'>
 <img src={card8}  height="250"></img>
 </div>
 <div className='emoji heart'>
 <img src={card7} height="200"></img>
 </div>
 


 </div>

 
 
 
    )
}

export default HomePage;