import React, { Component } from 'react';
import './PopUp.css';



class PopUp extends Component {
    render() {
        return( 
         <div className='popup-div'>
             <h1>Welcome to Solitaire</h1>
             <p>
                 Take a picture of you solitaire and get the best next move. 
             </p>
             <button>Got It!</button>
         </div>
        );
    }
}
  export default PopUp;
