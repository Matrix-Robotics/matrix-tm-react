import React from "react";

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import UndoIcon from '@material-ui/icons/Undo';
import { makeStyles } from '@material-ui/core/styles';

import CanvasDraw from "react-canvas-draw";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

export default function Drawing(props) {

  const classes = useStyles();

  const canvasGrid = React.useRef(null);
  const canvasRef = React.useRef();

  function useParentWidthSize(node) {
    const [width, setWidth] = React.useState();
    React.useEffect(() => {
      let temp = getComputedStyle(node.current)
      function updateSize() {
        setWidth(node.current.clientWidth - parseFloat(temp.paddingLeft) - parseFloat(temp.paddingRight));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    });
    return width;
  }

  const handleDraw = (drawSrc) => {
    props.onChange(drawSrc);
  }

  return (
    <Grid item xs={6}>
      <Grid container ref={canvasGrid} direction="column" justifyContent="space-between" alignItems="stretch" >
        <CanvasDraw
          ref={canvasRef}
          hideGrid={true}
          brushColor="#1F1F1F"
          brushRadius={5}
          lazyRadius={0}
          canvasWidth="100%"
          canvasHeight={useParentWidthSize(canvasGrid)}
          style={{
            border: "1px solid black",
            aspectRatio: 1
          }}
        />
        <div className={classes.buttons}>
          <IconButton aria-label="delete"
            onClick={() => {
              canvasRef.current.clear();
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              canvasRef.current.undo();
            }}
          >
            <UndoIcon />
          </IconButton>
          <IconButton color="primary"
            onMouseDown={() => {
              handleDraw(canvasRef.current.canvasContainer.children[1].toDataURL())
              canvasRef.current.clear();
            }}
          >
            <AddToPhotosOutlinedIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}
