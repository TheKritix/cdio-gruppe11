import Webcam from "react-webcam";
import React, { useEffect } from "react";
// eslint-disable-next-line no-lone-blocks
{
  /* <script src="https://cdn.roboflow.com/0.2.22/roboflow.js"></script>

roboflow.auth({
    publishable_key: "rf_hB1FG8hLbwhs49HoSSxyjNek1up1"
}).load({
    model: "playing-cards-ow27d",
    version: 1
}).then(function(model) {
    // model has loaded!
});

model.detect(video).then(function(predictions) {
    console.log("Predictions:", predictions);
}); */
}

const PlayingCardReg = () => {

//   const roboScript = document.createElement("script");
//   roboScript.async = false;
//   roboScript.src = "https://cdn.roboflow.com/0.2.22/roboflow.js";
//   document.body.appendChild(roboScript);

//   console.log(roboScript);



    useEffect(() => {
        window.roboflow.auth({
            publishable_key: "rf_hB1FG8hLbwhs49HoSSxyjNek1up1",
          })
          .load({
            model: "playing-cards-ow27d",
            version: 1,
          })
          .then(function (model) {
            console.log("Bitch ass model loaded")
            model.detect(document.getElementById("feed")).then(function(predictions) {
              console.log("Predictions:", predictions);
          });
          });
      }, []);

    
  const videoMax = {
    height: 1080,
    width: 1920,
    maxWidth: "100vw",
    facingMode: "environment",
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const webcamComp = React.useRef(null);


  return (
    <div>
      <div id="overlay">
        <canvas id="canvas" width={1280} height={720} />
      </div>
      <div id="webcamLayer">
        <Webcam id="feed" ref={webcamComp} videoConstraints={videoMax}/>
      </div>
    </div>
  );
    
};

export default PlayingCardReg;
