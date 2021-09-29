import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import GestureIcon from '@material-ui/icons/Gesture';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

export default function Capture () {

  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  
  return (
    <Box>
      <Box overflow="visible">
        <ImageList rowHeight={120} cols={5}>
          {selectedFiles.map((item) => (
            <ImageListItem key={item} cols={item.cols || 1}>
              <img src={item} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box display="flex" pt={2}>
        <Box p={0.5}>
          <Button variant="contained" size="large" startIcon={<VideocamOutlinedIcon />}>
            Webcam
          </Button>
        </Box>
        <Box p={0.5}>
          <Button variant="contained" size="large" startIcon={<GestureIcon />}>
            Draw
          </Button>
        </Box>
        <Box p={0.5}>
          <input id="upload-image" accept="image/*" type="file" multiple hidden onChange={handleImageChange} />
          <label htmlFor="upload-image">
            <Button variant="contained" size="large" component="span" startIcon={<NoteAddIcon />}>
              Upload
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  );
};
