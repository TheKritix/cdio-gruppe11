import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import ImageReg from './components/ImageReg';
import reportWebVitals from './reportWebVitals';
import RoboReg from './components/rf-imageReg/rf-ir';

ReactDOM.render(
  <React.StrictMode>
    <RoboReg/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
