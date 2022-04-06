import React, { useState } from 'react';
import LandingPage from '../Components/LandingPage';
import PopUp from '../Components/PopUp';
import './HomePage.css';



function HomePage() {
return(
    <>
    <LandingPage id='landingpage'></LandingPage>
    <PopUp id='popup'></PopUp>
    </>
    )
}

export default HomePage;