import Webcam from "react-webcam";
import MoveList from "../../Components/GamePage/MoveList.js"
import React, { useEffect, useState } from "react";
import AdvanceButton from "../../Components/GamePage/AdvanceButton.js";
import "./rf-ir.css";
import "../../Pages/GamePage.css";

//Author: Kristoffer T. Pedersen
//Source: https://docs.roboflow.com/inference/web-browser
//Source: https://towardsdatascience.com/how-to-use-tensorflow-js-in-react-js-object-detection-98b3782f08c2
//Source: https://www.section.io/engineering-education/building-an-object-detection-application-with-tensorflowjs-and-reactjs/

const PlayingCardReg = () => {
  //Test Flow Model
  // var PCRegModel;
  // const pKeys =
  // "rf_hB1FG8hLbwhs49HoSSxyjNek1up1";
  // const loadModel = "playing-cards-ow27d";
  // const versionModel = 1;

  //Prod model
  var PCRegModel;
  const pKeys =
  "rf_dmfFx6VKjIWvGQt19T1bGnO3uVw1";
  const loadModel = "spilekort";
  const versionModel = 7;

  const [predModelState, setPredModelState] = useState();
  const [webcamCompState, setWebcamCompState] = useState();
  const [moveList, setMoveList] = useState([{
    desc: "",
    id: 0,
  }]);
  const [cameraIsLoaded, setCameraIsLoaded] = useState();
  
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  //from useEffect
  function roboflowFunc() {
    console.log("loadeddata event")
    window.roboflow
      .auth({
        publishable_key: pKeys,
      })
      .load({
        model: loadModel,
        version: versionModel,
      })
      .then(function (model) {
        console.log("TensorFlowJS Model loaded successfully");
        PCRegModel = model;

        //Shitty solution for it to wait for the Camera to wake up, but works.
        setTimeout(200)

        runModel();
      });
  }

  async function runModel() {
    var predModel;
    
    await PCRegModel.detect(document.getElementById("feed")).then(function (
      predictions
    ) {
      predModel = predictions;
    });

    var overlay = document.getElementById("canvas");

    var ctx = overlay.getContext("2d");
    ctx.clearRect(
      0,
      0,
      webcamComp.current.video.videoWidth,
      webcamComp.current.video.videoHeight
    );
    
    if (predModel.length > 0) {
      for (let n = 0; n < predModel.length; n++) {
        if (predModel[n].confidence > 0.6) {
          let bboxLeft = predModel[n].bbox.x-(predModel[n].bbox.width/2);
          let bboxTop = predModel[n].bbox.y-(predModel[n].bbox.height/2);
          let bboxWidth = predModel[n].bbox.width;
          let bboxHeight = predModel[n].bbox.height;

          ctx.beginPath();
          ctx.font = "28px Arial";
          ctx.fillStyle = predModel[n].color;

          ctx.fillText(
            predModel[n].class,
            bboxLeft,
            bboxTop
          );

          ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
          ctx.strokeStyle = predModel[n].color;

          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      //Advance for GameLogic.js Script
      //Skal køre på click af advance button.

      setPredModelState(predModel);
      setWebcamCompState(webcamCompState);

      //callAdvanceGS(predModel, webcamComp)
      //window.advanceGS(predModel, webcamComp.current.video.videoWidth, webcamComp.current.video.videoHeight);
    }

    setTimeout(() => runModel(), 1000);  
}

  const addMoveToList = (st) => {
    const moveObject = {
      desc: st.desc,
      id: moveList.length 
    }
    setMoveList(moveList.concat(moveObject))
}  
  const [mlStart, setMlStart] = useState(false)

  const callAdvanceGS = () => {
    if (mlStart === false) {
    roboflowFunc();
    setMlStart(current => !current)
    }
    else {
    var st = window.advanceGS(predModelState, webcamComp.current.video.videoWidth, webcamComp.current.video.videoHeight);
    console.log("Predictions:", predModelState);
    addMoveToList(st.moves[0]);
    console.log(moveList);
    }
}


  //source: https://www.codegrepper.com/code-examples/javascript/react+detect+screen+size
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  //finder window størrelse
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const videoMax = {
    width: windowDimensions.width * 0.65,
    height: windowDimensions.width * 0.365,
    maxWidth: "100vw",
    facingMode: "environment",
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const webcamComp = React.useRef(null);

  return (
    <div className="table-div">
      <div className="left">
      <div id="overlay">
        <canvas id="canvas" width={windowDimensions.width * 0.65} height={windowDimensions.width * 0.365} />
      </div>
      <div id="webcamLayer">
        <Webcam id="feed" ref={webcamComp} videoConstraints={videoMax} style={{
            width: "65%",
            objectFit: "fill",
            position: "absolute"
          }}/>  
      </div>
      <div className="advance-div">
        <AdvanceButton cameraHandler={callAdvanceGS}/>
      </div>
      </div>
      <div className="right">
        <MoveList moveList={moveList}/>
      </div>
    </div>
  );
};

export default PlayingCardReg;
