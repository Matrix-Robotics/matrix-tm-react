let classifier = knnClassifier.create();
let net;

async function app() {
  console.log('Loading mobilenet...');
  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  // Reads an image from the webcam and associates it with a specific class index.
  const addEX = classId => {
    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const canvas = document.getElementById('canvas');
    const activation = net.infer(canvas, 'conv_preds');

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);
  };

  // When clicking a button, add an example for that class.
  document.getElementById('class-a').addEventListener('click', () => addEX(0));
  document.getElementById('class-b').addEventListener('click', () => addEX(1));
  document.getElementById('class-c').addEventListener('click', () => addEX(2));

  document.getElementById('train').addEventListener('click', () => getResult());


  const getResult = () => {
    const canvas = document.getElementById('video');
    const xlogits = net.infer(canvas, true);
    const result = classifier.predictClass(xlogits);
    console.log('Predictions:');
    console.log(result);
  }

}


app();