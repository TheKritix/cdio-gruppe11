import "../../Components/rf-imageReg/rf-ir.css"
import Timer from "./Timer.js"
import {useState} from "react"

const AdvanceButton = ({cameraHandler}) => {

    
    return (
        <>
            <button className="advance-button" onClick={cameraHandler}>
                Advances gamestate
                       'OK'
            </button>
        </>
    )
}
export default AdvanceButton; 