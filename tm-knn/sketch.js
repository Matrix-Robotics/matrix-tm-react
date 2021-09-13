function setup() {
//    createCanvas(400, 400);
   createCanvas(windowWidth, windowHeight);
}
  


function draw() {
    background(200);
    // point color
    stroke(0);
    // point size
    strokeWeight(0.7);

    text("(x:"+Math.ceil(mouseX*10)/10+", y:"+Math.ceil(mouseY*10)/10+")", mouseX+10,mouseY+10);

    strokeWeight(10);
    point(mouseX, mouseY);

    // draw canvas
    Strive.drawTickAxes(0,1,10,0,0)

    // draw points
    for (var i = 0; i < items.length; i++) {
        point(items[i][0], items[i][1]);
    }

    // add points
    mouseClicked();
}

function mouseClicked() {
    if (mouseIsPressed) {
        // console.log("IsClicked");
        items[items.length] = [mouseX, mouseY];
    }
  }
