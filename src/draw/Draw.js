import React, { Component } from "react";

import CanvasDraw from "react-canvas-draw";
import classNames from "./Draw.css";

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      width: 200,
      height: 200,
      brushRadius: 5,
      lazyRadius: 0
    };
  }

  onBtnClick() {

  }

  render() {
    return (
      <div>
        <div className={classNames.tools}>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>

        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          hideGrid={true}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={0}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
      </div>
    );
  }
}

export default Drawing;