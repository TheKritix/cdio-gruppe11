import "../../Pages/GamePage.css"

const AdvanceButton = ({cameraHandler}) => {
    
    return (
        <>
            <button className="advance-button" onClick={cameraHandler}>
                Take picture of Solitaire
            </button>
        </>
    )
}
export default AdvanceButton; 