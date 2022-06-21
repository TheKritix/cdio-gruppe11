import Webcam from "react-webcam";
import MoveList from "../../Components/GamePage/MoveList.js"
import Loader from "../../Components/GamePage/Loader.js"
import Timer from "../../Components/GamePage/Timer.js"
import React, { useEffect, useState } from "react";
import AdvanceButton from "../../Components/GamePage/AdvanceButton.js";
import "./rf-ir.css";
import "../../Pages/GamePage.css";
import SyncLoader from "react-spinners/SyncLoader";
import { AddLocationRounded } from "@mui/icons-material";

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
<<<<<<< HEAD
  const pKeys = "u8RcGfMlTYb8CXocUGM0GVEg78D3";
  //"rf_hB1FG8hLbwhs49HoSSxyjNek1up1";
  //"rf_dmfFx6VKjIWvGQt19T1bGnO3uVw1";
=======
  const pKeys =
  "rf_u8RcGfMlTYb8CXocUGM0GVEg78D3";
>>>>>>> 40a7c3ae84514a8edb59ed8cc59c1703433a4ca4
  const loadModel = "spilekort";
  const versionModel = 7;

  const [predModelState, setPredModelState] = useState();
  const [webcamCompState, setWebcamCompState] = useState();
  const [moveList, setMoveList] = useState([{
    id: 0,
    initialized: false,
    a: [],
    moves: [],
    moveHistory: []
    
  }]);
  const [loading, setLoading] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  //finder window størrelse
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  //checks if camera is live and then calls roboflow function
  //source: https://stackoverflow.com/questions/50311525/check-if-webcam-is-already-activated
  const isCamActive = () => {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream){
      var result = stream.getVideoTracks()
      .some(function (track) {
        return track.enabled && track.readyState === 'live';
      });
      if(result){
      console.log("camera loaded")
      setLoading(true);
      //timeout just to test if it works
        setTimeout(() => {
          roboflowFunc();
        }, 4000);
      }
    }).catch(function(err) {console.log(err.name + ": " + err.message + "... no cam bruv"); });
  }

  useEffect(() => {
    // window.roboflow
    //   .auth({
    //     publishable_key: pKeys,
    //   })
    //   .load({
    //     model: loadModel,
    //     version: versionModel,
    //   })
    //   .then(function (model) {
    //     console.log("Bitch ass model loaded");
    //     PCRegModel = model;

    //     //Shitty solution for it to wait for the Camera to wake up, but works.
    //     setTimeout(200)

    //     runModel();
    //     setWindowDimensions(getWindowDimensions());
    //   })>
    isCamActive();
    setWindowDimensions(getWindowDimensions());
  }, []);

  
  //from useEffect
  function roboflowFunc() {
    window.roboflow
      .auth({
        publishable_key: pKeys,
      })
      .load({
        model: loadModel,
        version: versionModel,
      })
      .then(function (model) {
        console.log("Bitch ass model loaded");
        PCRegModel = model;

        //Shitty solution for it to wait for the Camera to wake up, but works.
        //setTimeout(200)

        runModel()
        .then(setFinishedLoading(true))
        .then(
          setTimeout(() => {
            setLoading(false);
          }, 1000))
      })
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
      id: moveList.length,
      initialized: st.initialized,
      a: st.a,
      moves: st.moves,
      moveHistory: st.moveHistory 
      //desc: st.desc,
      
    }
    setMoveList(moveList.concat(moveObject))
    console.log(moveList);
}  



// const startUndoTimer = () => {
//   const timer = setTimeout(() => {
//     console.log("timer")
//     setMoveList(moveList.sort((move) => (move != moveList.pop())))
//   }, 30000);
//   return () => clearTimeout(timer);
// }
  // const [cd, setCd] = useState(0);
  // const [cdOver, setCdOver] = useState(false);

  // const tick = () => {
  //   if (cd === 0) {
  //       setCdOver(true)
  //   }
  //   else {
  //     setCd(cd - 1);
  //   }
  // }

  // const reset = () => {
  //   setCd(30);
  //   setCdOver(false)
  // }

  // //useeffect for timer 
  // useEffect(() => {
  //   const timerID = setInterval(() => tick(), 1000);
  //   return () => {
  //     clearInterval(timerID);
  //   }
  // });

  // const clear = () => {
  //   setMoveList(moveList.filter((move) => (move != moveList.pop())))
  // }

  var old;
  var st;

  const callAdvanceGS = () => {
    st = window.advanceGS(predModelState, webcamComp.current.video.videoWidth, webcamComp.current.video.videoHeight);
    old = JSON.parse(JSON.stringify(st));
    console.log(old);
    setRevShow(true);
    console.log("Predictions:", predModelState);
    addMoveToList(st);
    console.log(moveList);
}
 
const [revShow, setRevShow] = useState(false);
const callRevertGS = () => {
    window.revertGameState(st);
    setRevShow(false);
    moveList.pop();
    setMoveList(moveList);
}


  //source: https://www.codegrepper.com/code-examples/javascript/react+detect+screen+size
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const videoMax = {
    width: windowDimensions.width * 0.65,
    height: windowDimensions.width * 0.365,
    maxWidth: "100vw",
    facingMode: "environment",
  };

  //eslint-disable-next-line react-hooks/rules-of-hooks
  const webcamComp = React.useRef(null);

 

  return (
    <div className="table-div">
      <div className="left">
        <div id="overlay">
         <canvas id="canvas" width={windowDimensions.width * 0.65} height={windowDimensions.width * 0.365}/>
         {loading
          ? (<Loader loading={loading} finishedLoading={finishedLoading}/>)   
          : (<></>)// : (<canvas id="canvas" width={windowDimensions.width * 0.65} height={windowDimensions.width * 0.365} />)
        }
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
          {/* {revShow ?(<button style={{width: "100px", height: "100px"}} onClick={callRevertGS}>REVERT</button>) : (<></>)} */}
          {/* {cdOver && cd === 0 ? (<></>) : (<p>{cd}</p>)} */}
        </div>
      </div>
      <div className="right">
        <MoveList moveList={moveList}/>
      </div>
    </div>
  );
};

export default PlayingCardReg;
