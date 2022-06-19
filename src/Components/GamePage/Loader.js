import "../../Pages/GamePage.css"
import {useRef, useState} from "react"
import SyncLoader from "react-spinners/SyncLoader";

const Loader = ({loading, width, height}) => {

    return (
        <div>
            <div className="loader-div" style={{height: height * 0.2, width: width * 0.2}}>
                <SyncLoader loading={loading} color={"black"}/>
                <p className="loader-text">Loading model</p>
            </div>
        </div>
    )
}

export default Loader; 