import Cards from "../../Components/GamePage/Cards.js";
import "../../Pages/GamePage.css";
import {useState} from "react";

const Foundation = ({cards}) => {

    return (
        <div className="foundation-div">
            {cards.filter((cards) => (cards.id === (1)) || (cards.id === (2)) || (cards.id === (3)) || (cards.id === (4))).map((cards) => (
               <Cards cards={cards}>
               </Cards>
           ))}
        </div>
    )
}

export default Foundation; 