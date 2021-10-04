import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';


let net;

const classifier = knnClassifier.create();

export default async function train(cards, webcamEl) {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image 
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamEl);

  
  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = async (classTitle, imgSrc) => {
    // Capture an image from the web camera.
    // const img = await webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(imgSrc, true);

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classTitle);

    // Dispose the tensor to release the memory.
    // img.dispose();
  };

  cards.forEach(card => {
    let tempImageList = card.imageList;
    if(typeof tempImageList !== 'undefined' && tempImageList.length > 0) {
      console.log(typeof tempImageList[0]);
      tempImageList.forEach(image => {
        // blob to HTMLImageElement
        let tempImageEl = new Image(200,200);
        tempImageEl.src = image;
        addExample(card.title, tempImageEl);
      });
    }
  });

  while (true) {
    if (classifier.getNumClasses() > 0) {
      const img = await webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = net.infer(img, 'conv_preds');
      // Get the most likely class and confidence from the classifier module.
      const result = await classifier.predictClass(activation);

      const classes = ['A', 'B', 'C'];
      document.getElementById('console').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;

      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
  }
}
