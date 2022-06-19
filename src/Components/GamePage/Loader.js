import "../../Pages/GamePage.css"
import {useRef, useState} from "react"
import PulseLoader from "react-spinners/PulseLoader";
import DoneIcon from '@mui/icons-material/Done';


const Loader = ({loading, width, height, finishedLoading}) => {

    return (
        <div>
            <div className="loader-div" style={{height: height * 0.2, width: width * 0.2}}>
                {finishedLoading
                ? (<>
                    <DoneIcon/>
                    <p className="loader-text">Model Loaded</p>
                  </>)
                : (<>
                    <PulseLoader loading={loading} color={"black"}/>
                    <p className="loader-text">Loading model</p>
                  </>)            
                }
            </div>
        </div>
    )
}

export default Loader; 