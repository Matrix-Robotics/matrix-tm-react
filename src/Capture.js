import React from "react";
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import GestureIcon from '@material-ui/icons/Gesture';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
  },
  imageList: {
    transform: 'translateZ(0)',
  },
  webcam: {
    flexBasis: 1
  },
  samples: {
    flexBasis: 1
  }
}));

export default function Capture(props) {

  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(
        (file) => URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const [toggleWebcam, setToggleWebcam] = React.useState(false);
  const handleToggle = () => setToggleWebcam(!toggleWebcam);

  function WebcamCapture() {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize="true"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            alt={"camAlt"}
            src={imgSrc}
          />
        )}
      </div>
    );
  };

  return (
    <Box className={classes.root} key={props.cardId}>
      <Box display="flex" >
        <Box className={classes.webcam}>
          { toggleWebcam ? <WebcamCapture /> : null }
        </Box>
        <Box display="flex" className={classes.samples} overflow="visible" >
          <ImageList className={classes.imageList} rowHeight={100} cols={5}>
            {selectedFiles.map((item) => (
              <ImageListItem key={item} cols={item.cols || 1}>
                <img src={item} alt={item.title} />
              </ImageListItem>
            ))}
            {console.log("this is: " + props.cardId)}
          </ImageList>
        </Box>
      </Box>
      <Box display="flex" pt={2}>
        <Box p={0.5}>
          <Button variant="contained" size="large" onClick={handleToggle} startIcon={<VideocamOutlinedIcon />}>
            Webcam
          </Button>
        </Box>
        <Box p={0.5}>
          <Button variant="contained" size="large" startIcon={<GestureIcon />}>
            Draw
          </Button>
        </Box>
        <Box p={0.5}>
          <input id={props.cardId} accept="image/*" type="file" multiple hidden onChange={handleUpload} />
          <label htmlFor={props.cardId}>
            <Button variant="contained" size="large" component="span" startIcon={<NoteAddIcon />}>
              Upload
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  );
};
