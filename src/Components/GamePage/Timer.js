import "../../Pages/GamePage.css"
import {useEffect, useState} from "react"
import PulseLoader from "react-spinners/PulseLoader";
import DoneIcon from '@mui/icons-material/Done';


const Timer = ({cd}) => {

    const [timer, setTimer] = useState(cd);

    const startTimer = () => {
        
    }
    

    useEffect(() => {
         timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
      }, [timer]);

    return (
        <div>
            <p>
                {timer}
            </p>

        </div>
    )
}

export default Timer; 