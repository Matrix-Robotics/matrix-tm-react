import React from "react";
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import MicIcon from '@material-ui/icons/Mic';
import { makeStyles } from '@material-ui/core/styles';
import AudioRecord from './Record';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  imageList: {
    maxHeight: '300px',
    overflowY: 'auto',
    transform: 'translateZ(0)'
  },
  image: {
    height: '100%',
    maxWidth: '100%'
  }
}));


function WebcamCapture(props) {

  const webcamRef = React.useRef(null);
  const [mouseHandler, setMouseHandler] = React.useState(1);

  const handleUpload = (e, imgSrc) => {
    props.onChange(e, imgSrc);
  }

  const handleMouseDown = (e) => {
    setMouseHandler(setTimeout(capture, 10, e));
    if (mouseHandler) {
      setMouseHandler(setTimeout(handleMouseDown, 50, e));
    }
  }

  const handleMouseUp = () => {
    clearTimeout(mouseHandler);
  }

  const capture = (e) => {
    const imageSrc = webcamRef.current.getScreenshot();
    handleUpload(e, imageSrc);
  };

  return (
    <Grid container direction="column" justifyContent="space-between" alignItems="stretch" >
      <Webcam
        audio={false}
        ref={webcamRef}
        id="webcam"
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize="true"
        width={224}
        style={{
          width: "100%"
        }}
      />
      <Button variant="contained" color="primary" size="medium" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        Capture Photo
      </Button>
    </Grid>
  );
};


export default function Capture(props) {

  const classes = useStyles();

  const scrollRef = React.useRef();
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleUpload = (e, src) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(
        (file) => URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    } else if (src) {
      setSelectedFiles((prevImages) => prevImages.concat(src));
    }
  };

  const handleImageList = React.useCallback(() => {
    props.onChange(selectedFiles);
    setSelectedFiles(props.imageList);
  }, [props, selectedFiles]);

  React.useEffect(() => {
    if (props.captureEl) {
      props.captureEl.current = handleImageList;
    }
  }, [props.captureEl, handleImageList])

  React.useEffect(() => {
    if (props.imageList) {
      setSelectedFiles(props.imageList);
    }
  }, [props.imageList])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  })

  const [toggleWebcam, setToggleWebcam] = React.useState(false);
  const handleToggle = () => setToggleWebcam(!toggleWebcam);


  const [toggleRecord, settoggleRecord] = React.useState(false);
  const handleRecToggle = () => settoggleRecord(!toggleRecord);

  return (
    <Box className={classes.root} key={props.cardId}>
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start" >
        {/* {toggleWebcam ? <Grid item xs={6}><WebcamCapture onChange={handleUpload} /></Grid> : null} */}
        {/* {toggleRecord ? <Grid item xs={6}><AudioRecord onChange={toggleRecord} /></Grid> : null} */}

        <Grid item xs={6} overflow="visible" >
          <Typography>
            Add Audio Samples:
          </Typography>
          <ImageList className={classes.imageList} ref={scrollRef} rowHeight="auto" cols={4}>
            {selectedFiles.map((item) => (
              <ImageListItem key={item} cols={item.cols || 1}>
                <img className={classes.image} src={item} alt={item.title} />
              </ImageListItem>)
            )}
          </ImageList>
        </Grid>
      </Grid>
      <Button ><AudioRecord state={handleRecToggle}></AudioRecord>
      </Button>

      <Box display="flex" pt={2}>
        <Box p={0.5}>
          <Button variant="outlined" size="large" color="primary" onClick={handleRecToggle} startIcon={<MicIcon />}>
            Mic
          </Button>
        </Box>
        <Box p={0.5}>
          <input id={props.cardId} accept="image/*" type="file" multiple hidden onChange={handleUpload} />
          <label htmlFor={props.cardId}>
            <Button variant="outlined" size="large" color="primary" component="span" startIcon={<NoteAddIcon />}>
              Upload
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  );
};
