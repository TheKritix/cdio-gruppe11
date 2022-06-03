import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js"
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import PlayingCardReg from "../Components/rf-imageReg/rf-ir";
import Tableau from "../Components/GamePage/Tableau.js"


const GamePage = () => {

    return (
        <>
            <div className="container-gamepage">    
                <div className="table-div">
                    <PlayingCardReg/>
                </div>
                <div className="advance-div">
                    <AdvanceButton/>
                </div>
            </div>
        </>
    )
    
}

export default GamePage