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
    };

    downloadRecording() {
        let newBlob = new Blob(this.state.recordedBlob, { type: "audio/mpeg-3" });
    }

    onData() {
        console.log("recording");
    }
    render() {
        console.log(this.state)
        return (
            <div className="AudioRecord">
                <h1>Hello CodeSandbox</h1>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#111"
                    backgroundColor="#fcfcfc"
                />
                <button
                    style={{ marginTop: 25, marginBottom: 25 }}
                    color="blue"
                    onClick={this.startRecording}
                >
                    Record a sound
                </button>
                <button onClick={this.stopRecording}>Stop</button>
                <button onClick={this.downloadRecording}>Download</button>
                <p>{this.state.blobURL}</p>
            </div>
        );
    }
}

export default AudioRecord;