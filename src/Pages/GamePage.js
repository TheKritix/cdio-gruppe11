import "./GamePage.css";
import "../Components/GamePage/AdvanceButton.js"
import AdvanceButton from "../Components/GamePage/AdvanceButton.js";
import Tableau from "../Components/GamePage/Tableau.js"


const GamePage = () => {

    return (
        <>
            <div className="container-gamepage">    
                <div className="table-div">
                    Test this thing
                </div>
                <div className="advance-div">
                    <AdvanceButton/>
                </div>
            </div>
        </>
    )

}

export default GamePage