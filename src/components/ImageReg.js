import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as tensorflow from '@tensorflow/tfjs';
import * as coco from "@tensorflow-models/coco-ssd";
import './ImageReg.css'

// Source for ML https://github.com/manfye/tfjs-article-objDetection/blob/main/src/App.js

function ImageReg() {

    const [mlModel, setMlModel] = useState();
    const webcamComp = React.useRef(null)
    const [videoWidth, setVideoWidth] = useState(1280);
    const [videoHeight, setVideoHeight] = useState(720);
  

    const videoMax = {
        height: 1080,
        width: 1920,
        maxWidth: "100vw",
        facingMode: "environment",
    };

    async function modelLoad() {
        const mlModel = await coco.load();
        setMlModel(mlModel);
    }

    useEffect(() => {
        tensorflow.ready().then(() => {
            modelLoad();
        });
    }, []);

    //Yoinked direkte fra https://github.com/manfye/tfjs-article-objDetection/blob/main/src/App.js
    //til test. 
    async function runModel() {
        const predModel = await mlModel.detect(document.getElementById("feed"))
        var overlay = document.getElementById("canvas")

        var ctx = overlay.getContext("2d");
        ctx.clearRect(
            0,
            0,
            webcamComp.current.video.videoWidth,
            webcamComp.current.video.videoHeight
        );

        if (predModel.length > 0) {

            for (let n = 0; n < predModel.length; n++) {
                if (predModel[n].score > 0.8) {
                    let bboxLeft = predModel[n].bbox[0];
                    let bboxTop = predModel[n].bbox[1];
                    let bboxWidth = predModel[n].bbox[2];
                    let bboxHeight = predModel[n].bbox[3] - bboxTop;

                    ctx.beginPath();
                    ctx.font = "28px Arial";
                    ctx.fillStyle = "red";
          
                    ctx.fillText(
                      predModel[n].class +
                        ": " +
                        Math.round(parseFloat(predModel[n].score) * 100) +
                        "%",
                      bboxLeft,
                      bboxTop
                    );
          
                    ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                    ctx.strokeStyle = "#FF0000";
          
                    ctx.lineWidth = 3;
                    ctx.stroke();
          
                }
            }
        }

        setTimeout(() => runModel(), 50)
    }

    return (
        <div>
            <div id="overlay">
                <canvas
                    id = "canvas"
                    width = {1280}
                    height = {720}
                />
            </div>
            <div id="webcamLayer">
                <Webcam
                    id="feed"
                    ref={webcamComp}
                    videoConstraints={videoMax}
                />
            </div>
            <button id="start" onClick={runModel}>
                Start
            </button>

        </div>

    )
}

export default ImageReg;