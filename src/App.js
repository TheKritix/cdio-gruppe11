import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import HomePage from './Pages/HomePage';
import PopUpPage from './Pages/PopUpPage';
import GamePage from './Pages/GamePage';


function App() {
  document.title = "Solitaire"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path= "#" element={<PopUpPage/>}></Route>
        <Route path="/gamepage" element={<GamePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
