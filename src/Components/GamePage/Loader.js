import "../../Pages/GamePage.css"
import {useRef, useState} from "react"
import PulseLoader from "react-spinners/PulseLoader";
import DoneIcon from '@mui/icons-material/Done';


const Loader = ({loading, finishedLoading}) => {

    return (
        <div>
            <div className="loader-div" >
                {finishedLoading
                ? (<>
                    <p className="loader-text">Model Loaded</p>
                    <DoneIcon/>
                  </>)
                : (<>
                    <p className="loader-text">Loading model</p>
                    <PulseLoader loading={loading} color={"black"}/>
                  </>)            
                }
            </div>
        </div>
    )
}

export default Loader; 