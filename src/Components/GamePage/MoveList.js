import "../../Pages/GamePage.css"



const MoveList = ({moves}) => {

    return (
        <div className="movelist-div">
            <h3 className="movelist-title">
                List of moves made: 
            </h3>
            <hr className="movelist-divider"/>
           {moves.map((move) => (
               <p className="movelist-text" key={move.id}>
                   {move.id}: {move.move}
               </p>
           ))}
        </div>
    )
}

export default MoveList; 