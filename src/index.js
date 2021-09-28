import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Interface from './Interface';
import reportWebVitals from './reportWebVitals';

// import * as tf from '@tensorflow/tfjs';
// import * as tmImage from '@teachablemachine/image';
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import * as knnClassifier from '@tensorflow-models/knn-classifier';

ReactDOM.render(
  <React.StrictMode>
    <Interface />
  </React.StrictMode>,
  document.getElementById('root')
);
// let net;

// const classifier = knnClassifier.create();

// async function app() {
//   console.log('Loading mobilenet..');

//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Successfully loaded model');

//   // Create an object from Tensorflow.js data API which could capture image 
//   // from the web camera as Tensor.
//   const webcamElement = document.getElementById('webcam');
//   const webcam = await tf.data.webcam(webcamElement);

//   // Reads an image from the webcam and associates it with a specific class
//   // index.
//   const addExample = async classId => {
//     // Capture an image from the web camera.
//     const img = await webcam.capture();

//     // Get the intermediate activation of MobileNet 'conv_preds' and pass that
//     // to the KNN classifier.
//     const activation = net.infer(img, true);

//     // Pass the intermediate activation to the classifier.
//     classifier.addExample(activation, classId);

//     // Dispose the tensor to release the memory.
//     img.dispose();
//   };

//   // When clicking a button, add an example for that class.
//   document.getElementById('class-a').addEventListener('click', () => addExample(0));
//   document.getElementById('class-b').addEventListener('click', () => addExample(1));
//   document.getElementById('class-c').addEventListener('click', () => addExample(2));

//   while (true) {
//     if (classifier.getNumClasses() > 0) {
//       const img = await webcam.capture();

//       // Get the activation from mobilenet from the webcam.
//       const activation = net.infer(img, 'conv_preds');
//       // Get the most likely class and confidence from the classifier module.
//       const result = await classifier.predictClass(activation);

//       const classes = ['A', 'B', 'C'];
//       document.getElementById('console').innerText = `
//         prediction: ${classes[result.label]}\n
//         probability: ${result.confidences[result.label]}
//       `;

//       // Dispose the tensor to release the memory.
//       img.dispose();
//     }

//     await tf.nextFrame();
//   }
// }
// app();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
