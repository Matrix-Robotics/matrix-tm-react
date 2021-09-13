let draw_canvas;
let select_class;
let statusEl;
let submitBtn;

let addshow;
let labelBox;
let buttonAddLabel;
let buttonShowLabel;
let predictResult;

let saveload;
let buttonSetData;
let buttonGetData;

// canvas settings
let canvasW = 400;
let canvasH = 400;

var class_index = 1;
let count = 0;
var predict_class;

// draw datas points on canvas
var datas = [
    // x, y, class_index, train_or_not
    // 0: train 1: test
    // [100, 50, 0, 0],
];

 // class_colors (RGB)
let class_colors = [
    // class_index: 0, undefined
    [0, 0, 0],
    // class_index: 1
    [255, 0, 0],
    // class_index: 2
    [0, 0, 255],
    // class_index: 3
    [0, 200, 0],
];
const knnClassifier = ml5.KNNClassifier();

function setup() {
    statusEl = createP('model loaded!');
    draw_canvas = createCanvas(canvasW, canvasH);

    select_class = createSelect();
    select_class.option('CLASS 1');
    select_class.option('CLASS 2');
    select_class.option('CLASS 3');
    select_class.option('Undefined');
    select_class.selected('CLASS 1');
    select_class.changed(SelectClass);

    submitBtn = createButton('submit');
    // submitBtn.mousePressed(aaa);
    addshow = createP();

    predictResult = createP('Data count: 0');
    predictResult.parent(addshow);

    saveload = createP();
    buttonSetData = createButton('Save Dataset');
    buttonSetData.mousePressed(saveMyKNN);
    buttonSetData.parent(saveload);

    // TODO:
    // buttonGetData = createButton('Load Dataset');
    // buttonGetData.mousePressed(loadMyKNN);
    // buttonGetData.parent(saveload);
    // TODO: Clear canvas
}

function SelectClass() {
    let item = select_class.value();
    if (item == 'CLASS 1'){
        class_index = 1
    }else if(item == 'CLASS 2'){
        class_index = 2
    }else if(item == 'CLASS 3'){
        class_index = 3
    }else{
        class_index = 0
    }
}


function gotResults(err, result) {
    if (err) {
        console.log(err);
    }
    predict_class = result.label;
    datas[datas.length-1][2] = predict_class;
    // 1 means test data
    datas[datas.length-1][3] = 1;

    let dataX = datas[datas.length-1][0];
    let dataY = datas[datas.length-1][1];

    statusEl.html('Predict: ('+ dataX + 
        ", " + dataY + '): is CLASS '+ result.label);
}

// function getLabel(result) {
//     const entries = Object.entries(result.confidencesByLabel);
//     let greatestConfidence = entries[0];
//     for(let i = 0; i < entries.length; i++) {
//       if(entries[i][1] > greatestConfidence[1]) {
//         greatestConfidence = entries[i];
//       }
//     }
//     return greatestConfidence[0];
//   }

// Save dataset as myKNNDataset.json
function saveMyKNN() {
    knnClassifier.save('KNN_Dataset');
}

// // Load dataset to the classifier
// function loadMyKNN() {
//     knnClassifier.load('./myKNNDataset.json', updateCounts);
// }

// Draw Canvas
function draw() {
    background(200);
    // point size
    strokeWeight(0.7);
    text("(x:"+Math.ceil(mouseX*10)/10+", y:"+Math.ceil(mouseY*10)/10+")", mouseX+10,mouseY+10);

    point(mouseX, mouseY);

    strokeWeight(10);
    // draw canvas
    Strive.drawTickAxes(0,1,10,0,0)

    // add points
    if (mouseIsPressed) {
        // console.log("IsClicked");
        if (mouseX <= canvasW && mouseY <= canvasH){
            // 0 means train data
            datas[datas.length] = [mouseX, mouseY, class_index, 0];
            addExample(mouseX, mouseY, class_index);
        }
    }

    // draw all of the points
    for (var i = 0; i < datas.length; i++) {
        // stroke: change color of point
        stroke(class_colors[datas[i][2]]);
        if (datas[i][3] == 0){
            point(datas[i][0], datas[i][1]);
        }else{
            noFill();
            square(datas[i][0], datas[i][1], 3);

        }
    }
}

function addExample(dataX, dataY, class_index) {
    if (class_index != 0) {
        knnClassifier.addExample([dataX, dataY], class_index);

        predictResult.html('Data count: ' + ++count);
        prediction = null;
        statusEl.html('Added Data: ('+ dataX + ", " + dataY + ')');
    }else{
        knnClassifier.classify([dataX, dataY], gotResults);
    }
}