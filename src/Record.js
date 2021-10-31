import React, { Component } from "react";
import { ReactMic } from "react-mic";

class AudioRecord extends Component {
    constructor(props) {
        super(props);
        this.onStop = this.onStop.bind(this);
        this.state = {
            sound: null,
            record: false
        };
    }
    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };

    onStop = recordedBlob => {
        const self = this;
        console.log(recordedBlob);
        self.setState({
            blobURL: recordedBlob.blobURL,
            recordedBlob: recordedBlob
        });
        console.log(this.state.recordedBlob);
    };

    onData() {
        console.log("recording");
    }
    render() {
        console.log(this.state)
        return (
            <div className="AudioRecord">
                <ReactMic
                    record={this.state.record}
                    visualSetting="sinewave"
                    className="Sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#111"
                    backgroundColor="#fff"
                />
                <button
                    color="blue"
                    onClick={this.startRecording}
                >
                    Record
                </button>
                <button onClick={this.stopRecording}>Stop</button>
                <p>{this.state.blobURL}</p>
            </div>
        );
    }
}

export default AudioRecord;