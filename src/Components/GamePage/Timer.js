import "../../Pages/GamePage.css"
import {useEffect, useState, useRef} from "react"

const Timer = ({cd}) => {

    const [timer, setTimer] = useState(cd);

    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer -1 ), 1000);
      }, [timer])
    
    return (
        <div>
            <p>{timer}</p>
        </div>
    )
}

export default Timer; 