import React from "react";
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
}));

function WebcamCapture(props) {
  const webcamRef = React.useRef(null);

  const handleUpload = (e, imgSrc) => {
    props.onChange(e, imgSrc);
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
        style={{
          width: "100%"
        }}
      />
      <Button variant="contained" color="primary" size="medium" onClick={capture}>
        Capture Photo
      </Button>
    </Grid>
  );
};


export default function Capture(props) {

  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = React.useState([]);

  // React.useEffect(() => {
  //   props.onTrain(selectedFiles);
  // });

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

  const [toggleWebcam, setToggleWebcam] = React.useState(false);
  const handleToggle = () => setToggleWebcam(!toggleWebcam);

  return (
    <Box className={classes.root} key={props.cardId}>
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start" >
          {toggleWebcam ? <Grid item xs={6}><WebcamCapture onChange={handleUpload}/></Grid> : null}
        <Grid item xs={6} overflow="visible" >
          <Typography>
            Add Image Samples:
          </Typography>
          <ImageList className={classes.imageList} rowHeight={80} cols={4}>
            {selectedFiles.map((item) => (
              <ImageListItem key={item} cols={item.cols || 1}>
                <img src={item} alt={item.title} />
              </ImageListItem>
            ))}
            {console.log("this is: " + props.cardId)}
          </ImageList>
        </Grid>
      </Grid>
      <Box display="flex" pt={2}>
        <Box p={0.5}>
          <Button variant="outlined" size="large" color="primary" onClick={handleToggle} startIcon={<VideocamOutlinedIcon />}>
            Webcam
          </Button>
        </Box>
        <Box p={0.5}>
          <Button variant="outlined" size="large" color="primary" startIcon={<GestureIcon />}>
            Draw
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
