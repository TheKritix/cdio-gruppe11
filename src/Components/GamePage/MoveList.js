import "../../Pages/GamePage.css"
import {useRef, useEffect} from "react"
 

const MoveList = ({moveList}) => {
    
    //source for scroll: https://codesandbox.io/s/scrolltobottomexample-f90lz
    const movesEndRef = useRef(null);

    const scrollToLast = () => {
        movesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }

    useEffect(() => {
        scrollToLast()
    }, [moveList]);

    //for debugging
    console.log(moveList);

    
    return (
        <div className="movelist-div">
            <div className="movelist-top">
                    <h3 className="movelist-title">
                        List of moves made: 
                    </h3>
                    <hr className="movelist-divider"/>
                </div>
            <div className="movelist-content">
            {moveList.filter((move) => (move.id > 0)).map((move) => (
                <p className="movelist-text" key={move.id}>
                        {move.id}: {move.desc}
                </p>
            ))}
            <div ref={movesEndRef}/>
            </div>
        </div>
    )
}

export default MoveList; 