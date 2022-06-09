import Cards from "../../Components/GamePage/Cards.js"
import Foundation from "../../Components/GamePage/Foundation.js"
import Stack from "../../Components/GamePage/Stack.js"
import "../../Pages/GamePage.css"

const Tableau = ({cards}) => {

    return (
        <div className="tableau-div">
            <div className="top-row-div">
                <Stack cards={cards}/>
                <Foundation cards={cards}/>
            </div>
            <div className="card-row-div">
                {cards.map((cards) => (
                <Cards cards={cards}/>
                ))}
            </div>
        </div>
    )
}

export default Tableau;