import React, { Component, useState } from 'react';
import './HomePage.css';
import styled from 'styled-components';
import {useInterval} from 'react-use';

function Rain() {
    const [cardToRender, setCardToRender] = useState([{key: 0, card: '', offset: 0}]);

    useInterval(() => {
        if (cardToRender.length > 20){
            cardToRender.shift();
        }
        const offset = Math.floor(Math.random() * 1000); 
        const key = Math.floor(Math.random() * 100000);
        const card = '🃏'
        cardToRender.push({offset,key,card})

        setCardToRender([...cardToRender]);
    }, 100);

    return(
        <SuperContainer>
        {cardToRender.map(({key, card, offset}) => {
           return( 
           <CardContainer key={key} offset={offset}>
                {card}
            </CardContainer>
        )
        })}
        </SuperContainer>
    );
}

function Homepage() {
        return(
            <>
            <div className='landingpage'>
            <Rain></Rain>
            </div>
        
             </>
            
        )
}

const SuperContainer = styled.div `
    display: flex;
    witdh: 100%; 
    align-items: center;
`;

const CardContainer = styled.div`
@keyframes falldown {
        0% { margin-top: 0;}
        100% {margin-top: 1000px;}
}    

position: absolute;
top:80px;
left: ${props => props.offset}px;
font-size: 45px;
animation-name: falldown;
animation-duration: 4s;
`;



export default Homepage;