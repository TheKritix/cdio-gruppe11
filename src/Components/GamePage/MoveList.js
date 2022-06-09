import "../../Pages/GamePage.css"
import {useState, useEffect} from "react"


const MoveList = ({moveList}) => {

    console.log(moveList);

    const [moves, setMoves] = useState(moveList);
    

    

    return (
        <div className="movelist-div">
            <h3 className="movelist-title">
                List of moves made: 
            </h3>
            <hr className="movelist-divider"/>
           {moveList.map((move) => (
               <p className="movelist-text">
                    {move.desc}
               </p>
           ))}
        </div>
    )
}

export default MoveList; 