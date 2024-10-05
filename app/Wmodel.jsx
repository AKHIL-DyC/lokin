"use client"
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const WebcamObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [phoneWarning, setPhoneWarning] = useState(false); 

  const playSound = () => {
    const audio = new Audio('/warn.wav'); 
    audio.play();
  };

  useEffect(() => {
    // Load the COCO-SSD model
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  
  const detectObjects = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      model
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);
      setDetections(predictions);

      // Check if "cell phone" is detected
      const phoneDetected = predictions.some(
        (prediction) => prediction.class === 'cell phone'
      );

      if (phoneDetected) {
        setPhoneWarning(true); 
      } else {
        setPhoneWarning(false); 
      }
    }
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
    }, 1000); // Detect objects every second
    return () => clearInterval(interval);
  }, [model]);

  return (
    <div>
      
      <Webcam
        ref={webcamRef}
        audio={false}
        style={{
          width: '340px',
          height: '280px',
          borderRadius: '30px',
          border: phoneWarning ? '4px solid red' : '4px solid green', 
        }}
      />
      <div>
        {detections.map((detection, index) => (
          <div key={index}>
            {detection.class} - {Math.round(detection.score * 100)}%
          </div>
        ))}
      </div>

      {/* Display warning if a phone is detected */}
      {phoneWarning && (
        
        <div style={{ color: 'red', marginTop: '20px' }}>
            {playSound()}
          🚫 Please avoid using your phone!
        </div>
      )}
      {(phoneWarning)}
    </div>
  );
};

export default WebcamObjectDetection;
