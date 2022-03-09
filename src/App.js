import logo from './logo.svg';
import './App.css';
import React from "react";
import Webcam from "react-webcam";
import * as tf from '@tensorflow/tfjs';

function App() {
  const WebcamComponent = () => <Webcam />;
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
        ></Webcam>
      </header>
    </div>
  );
}

export default App;
