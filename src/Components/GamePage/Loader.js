import "../../Pages/GamePage.css"
import {useRef, useState} from "react"
import PulseLoader from "react-spinners/PulseLoader";


const Loader = ({loading, width, height}) => {

    return (
        <div>
            <div className="loader-div" style={{height: height * 0.2, width: width * 0.2}}>
                <PulseLoader loading={loading} color={"black"}/>
                <p className="loader-text">Loading model</p>
            </div>
        </div>
    )
}

export default Loader; 