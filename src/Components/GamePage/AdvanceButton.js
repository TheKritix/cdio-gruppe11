import "../../Pages/GamePage.css"

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