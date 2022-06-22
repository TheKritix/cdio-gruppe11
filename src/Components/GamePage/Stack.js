import Cards from "../../Components/GamePage/Cards.js"
import "../../Pages/GamePage.css"

const Stack = ({cards}) => {

    return (
        <div className="stack-div">
            {cards.filter((cards) => (cards.id === (1)) || (cards.id === (2))).map((cards) => (
               <Cards cards={cards}>
               </Cards>
           ))}
        </div>
    )
}

export default Stack;