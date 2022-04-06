import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Test from './Pages/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
