import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from './Pages/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
