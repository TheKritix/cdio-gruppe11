import React, { Component} from "react";
import './PopUp.css';


class PopUp extends Component {
    render() {
        return <div class = "confirm">
            <h1>Before you begin playing Solitaire</h1>
            <p>Take a picture with your phone.......</p>
            <button>Cancel</button>
            <button>Confirm</button>


        </div>
    }
}

export default PopUp;