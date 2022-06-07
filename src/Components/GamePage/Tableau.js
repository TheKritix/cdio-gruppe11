import Cards from "../../Components/GamePage/Cards.js"
import "../../Pages/GamePage.css"

const Tableau = ({cards}) => {

    return (
        <div className="tableau-div">
            {cards.map((cards) => (
               <Cards cards={cards}>
               </Cards>
           ))}
        </div>
    )
}

export default Tableau;