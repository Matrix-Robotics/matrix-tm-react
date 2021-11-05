import React from 'react';
import Webcam from "react-webcam";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from "@material-ui/icons/Edit";
import PublishIcon from '@material-ui/icons/Publish';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Capture from './Capture.js';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const ITEM_HEIGHT = 80;
const useStyles = makeStyles((theme) => ({
  classGrid: {
    minHeight: '100vh'
  },
  classTitle: {
    fontSize: '1.4rem'
  },
  cardClass: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4)
  },
  cardButton: {
    padding: theme.spacing(2)
  },
  cardAction: {
    alignSelf: 'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardCenter: {
    position: 'fixed',
    top: '50vh',
    transform: 'translate(0, -50%)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  grid: {
    padding: theme.spacing(8)
  },
  progressColorPrimary: {
    backgroundColor: '#DEDEDE'
  },
  progressBarActive: {
    backgroundColor: '#00A1E9'
  },
  progressBarDisable: {
    backgroundColor: '#6D6D6D'
  }
}));

let net;
const classifier = knnClassifier.create();

async function train(cards) {
  // Load the model.
  console.log('Loading mobilenet..');
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = async (classTitle, imgSrc) => {
    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(imgSrc, true);

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classTitle);

  };

  cards.forEach(card => {
    let tempImageList = card.imageList;
    if (typeof tempImageList !== 'undefined' && tempImageList.length > 0) {
      tempImageList.forEach(image => {
        // blob to HTMLImageElement
        let tempImageEl = new Image(200, 200);
        tempImageEl.src = image;
        addExample(card.title, tempImageEl);
      });
    }
  })

  return true;
}

async function preview(webcam) {
  if (classifier.getNumClasses() > 0) {
    const webcamRes = await webcam;
    const img = await webcamRes.capture();

    // Get the activation from mobilenet from the webcam.
    const activation = net.infer(img, 'conv_preds');
    // Get the most likely class and confidence from the classifier module.
    const result = await classifier.predictClass(activation);

    // Dispose the tensor to release the memory.
    img.dispose();

    return result;
  }

  await tf.nextFrame();
}


export default function Interface() {

  const classes = useStyles();

  const captureElList = React.useRef([]);
  const trainGrid = React.useRef(null);
  const previewGrid = React.useRef(null);
  const previewCamRef = React.useRef(null);

  const [isTraining, setIsTraining] = React.useState(false);
  const [isTrained, setIsTrained] = React.useState(false);
  const [cards, setCards] = React.useState([
    {
      cardId: 1,
      title: 'Class ' + 1,
      imageList: []
    },
    {
      cardId: 2,
      title: 'Class ' + 2,
      imageList: []
    }
  ]);

  React.useEffect(() => {
    if (captureElList.current.length !== cards.length) {
      captureElList.current = Array(cards.length).fill().map((_, i) => captureElList.current[i] || React.createRef());
    }
  }, [captureElList, cards.length])

  function useParentWidthSize(porps) {
    const [width, setWidth] = React.useState();
    React.useEffect(() => {
      let temp = getComputedStyle(porps.parentNode.current)
      function updateSize() {
        setWidth(porps.parentNode.current.clientWidth - parseFloat(temp.paddingLeft) - parseFloat(temp.paddingRight));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    });
    return width;
  }


  function ClassColumn() {

    const onAddClassBtnClick = () => {
      // update global cards imageList state before add new class
      captureElList.current.forEach(f => f.current[0]());

      let tempCards = [...cards];
      if (tempCards.length) {
        let newCardId = tempCards.at(-1).cardId + 1;
        let newCard = {
          cardId: newCardId,
          title: 'Class ' + newCardId,
          imageList: []
        };
        setCards([...tempCards, newCard]);
      } else {
        setCards([{
          cardId: 1,
          title: 'Class ' + 1,
          imageList: []
        }]);
      }
    };

    const handleCards = (newCards) => {
      setCards(newCards);
    }

    return (
      <React.Fragment>
        {cards.map((card, index) => (
          <ClassCard key={card.cardId} cardId={card.cardId} cards={cards} title={card.title} imageList={card.imageList} onChange={handleCards} />
        ))}
        <Grid item xs={12}>
          <Card className={classes.cardClass}>
            <Button size="large" color="primary" onClick={onAddClassBtnClick} startIcon={<AddOutlinedIcon />}>
              Add New Class
            </Button>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

  function ClassCard(props) {
    const options = [
      'Delete Class',
      'Disable Class',
      'Remove All Samples'
    ];

    const [cardTitle, setCardTitle] = React.useState();
    const [isTitleFocused, setIsTitleFocused] = React.useState(false);

    const cardTitleRef = React.useRef();

    React.useEffect(() => {
      if (props.title) {
        setCardTitle(props.title);
      }
    }, [props.title]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCards = (cards) => {
      props.onChange(cards);
    }

    const handleTitle = (e) => {
      let tempCards = [...cards];
      let index = tempCards.map(card => card.cardId).indexOf(props.cardId);
      tempCards[index].title = e.currentTarget.value;
      handleCards(tempCards);
      setIsTitleFocused(false);

      // update global cards imageList state after title updated
      captureElList.current.forEach(f => f.current[0]());
    }

    const handleImageList = (imageList) => {
      let tempCards = [...cards];
      let index = tempCards.map(card => card.cardId).indexOf(props.cardId);
      tempCards[index].imageList = [...imageList];
      handleCards(tempCards);
    };

    const closeCamera = () => {
      captureElList.current.forEach(f => f.current[1]());
    }

    const handleOpe = (opt) => {
      let tempCards = [...cards];
      switch (opt) {
        case 'Delete Class':
          // update global cards imageList state before delete class
          captureElList.current.forEach(f => f.current[0]());

          let index = tempCards.map(card => card.cardId).indexOf(props.cardId);
          tempCards.splice(index, 1);
          handleCards(tempCards);
          break
        case 'Disable Class':
          break
        case 'Remove All Samples':
          break
        default:
      };
    }

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Card className={classes.cardClass}>
            <CardHeader
              action={
                <div>
                  <IconButton aria-label="settings" onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 'auto',
                      },
                    }}
                  >
                    {options.map((value, index) => (
                      <MenuItem key={index} onClick={() => handleOpe(value)}>
                        {value}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              }
              title={!isTitleFocused ? (
                <Typography
                  className={classes.classTitle}
                  onClick={() => {
                    setIsTitleFocused(true);
                  }}
                >
                  {cardTitle}
                  <IconButton aria-label="settings" onClick={() => {
                    setIsTitleFocused(true)
                  }}>
                    <Edit />
                  </IconButton>
                </Typography>
              ) : (
                <TextField
                  autoFocus
                  inputProps={{ className: classes.classTitle }}
                  inputRef={cardTitleRef}
                  value={cardTitle}
                  onBlur={e => handleTitle(e)}
                  onChange={e => setCardTitle(e.currentTarget.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      cardTitleRef.current.blur();
                      setCardTitle(cardTitleRef.current.value);
                    }
                  }}
                />
              )}
            />
            <CardActions className={classes.cardButton}>
              <Capture key={props.cardId} cardId={props.cardId} imageList={props.imageList} captureEl={captureElList.current[cards.map(card => card.cardId).indexOf(props.cardId)]} onChange={handleImageList} onCameraOn={closeCamera} />
            </CardActions>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

  function TrainColumn(props) {
    const width = useParentWidthSize(props);
    const [epochsValue, setEpochsValue] = React.useState("10");
    const [batchValue, setBatchValue] = React.useState("4");
    const [lRateValue, setLRateValue] = React.useState("0.001");

    // Reset Input Field handler
    const resetAllValues = () => {
      setEpochsValue("10");
      setBatchValue("4");
      setLRateValue("0.001");
    };

    const handleTrain = () => {

      props.captureEl.current.forEach(f => f.current.forEach(f => f()));

      setIsTraining((prev) => !prev);

      train(cards).then(res => {
        setIsTrained(res);
      });

    };

    return (
      <React.Fragment>
        <Card style={{ width: width }} className={classes.cardCenter} >
          <CardHeader title="Train" />
          <CardActions className={classes.cardButton}>
            {isTrained ?
              <Button variant="contained"
                size="medium"
                fullWidth={true}
                onClick={() => {
                  handleTrain()
                }}
                disableElevation
                disabled={isTrained}>
                Trained
              </Button>
              :
              <Button variant="contained"
                size="medium"
                fullWidth={true}
                onClick={() => {
                  handleTrain()
                }}
                disableElevation
                disabled={isTraining}>
                {isTraining ? `Training` : `Train Model`}
              </Button>
            }
          </CardActions>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Advanced</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form className={classes.form}>
                <div>
                  <Typography>
                    Epochs:
                  </Typography>
                  <TextField
                    id="epochs"
                    InputProps={{ inputProps: { min: 1, max: 200 } }}
                    value={epochsValue}
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setEpochsValue(e.target.value)}
                  />
                </div>
                <div>
                  <Typography>
                    Batch Size:
                  </Typography>
                  <TextField
                    id="batch-size"
                    InputProps={{ inputProps: { min: 4, max: 512 } }}
                    value={batchValue}
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setBatchValue(e.target.value)}
                  />
                </div>
                {/* TODO: Set learning Rate by step: 0.001 */}
                <div>
                  <Typography>
                    Learning Rate:
                  </Typography>
                  <TextField
                    id="learning_rate"
                    type="number"
                    InputProps={{
                      maxLength: 13,
                      step: "1"
                    }}
                    value={lRateValue}
                    variant="outlined"
                    size="small"
                    inputProps={{step: 0.001}}
                    onChange={(e) => setLRateValue(parseFloat(e.target.value).toFixed(1))}
                  />

                </div>
                <Button onClick={resetAllValues} size="small" color="primary" endIcon={<RotateLeftIcon />} disableElevation>
                  Reset Default
                </Button>
                <Button size="small" color="primary" endIcon={<AssessmentOutlinedIcon />} disableElevation>
                  Graph
                </Button>
              </form>
            </AccordionDetails>
          </Accordion>
        </Card>
      </React.Fragment>
    );
  }


  function PreviewClassConfidence(props) {

    return (
      <React.Fragment>
        {Object.entries(props.predictClasses).map((predictClass, index) =>
          <Box key={index} display="flex" alignItems="center">
            <Box minWidth="15%">
              <Typography variant="body2" color="textSecondary">
                {predictClass[0]}
              </Typography>
            </Box>
            <Box minWidth="75%" mr={1}>
              <LinearProgress classes={props.color} variant="determinate" value={predictClass[1] * 100} />
            </Box>
            <Box minWidth="10%">
              <Typography variant="body2" color="textSecondary">
                {`${Math.round(
                  predictClass[1] * 100
                )}%`
                }
              </Typography>
            </Box>
          </Box>
        )}
      </React.Fragment>
    )
  }

  function PreviewCam(props) {

    // const [barColor, setBarColor] = React.useState(barActiveColor);
    const [previewHandler, setPreviewHandler] = React.useState(1);
    const [state, setState] = React.useState({
      inputSrc: false,
      predictClasses: {}
    });

    const handleCheck = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      clearTimeout(previewHandler);
    };

    async function loadWebEl() {
      const webcamEl = document.getElementById('webcam');
      const webcam = await tf.data.webcam(webcamEl);
      return webcam
    }

    const startPreview = React.useCallback((webcam) => {
      let result = preview(webcam);

      result.then(res => {
        if (res.label !== "") {
          let confidences = res.confidences;
          setState(state => ({ ...state, predictClasses: confidences }));
        }
      });

      if (state.inputSrc) setPreviewHandler(setTimeout(startPreview, 100, webcam))
    }, [state.inputSrc]);

    React.useEffect(() => {
      if (isTrained) {
        const webcam = loadWebEl();
        if (state.inputSrc) {
          startPreview(webcam);
        }
      }
      return () => {
      };
    }, [startPreview, state.inputSrc]);

    return (
      <Grid container direction="column" justifyContent="space-between" alignItems="stretch" >
        {isTrained ?
          <CardActions className={classes.cardButton}>
            <Webcam
              audio={false}
              ref={previewCamRef}
              id="webcam"
              screenshotFormat="image/jpeg"
              forceScreenshotSourceSize="true"
              width="224"
              height="224"
              style={{
                width: "100%"
              }}
            />
            <FormGroup row>
              <Box>
                <Typography>
                  {state.inputSrc ? "Input ON" : "Input OFF"}
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.inputSrc}
                      onChange={handleCheck}
                      name="inputSrc"
                      color="primary"
                    />
                  }
                  label={state.inputSrc}
                />
              </Box>
            </FormGroup>
          </CardActions>
          :
          <Typography>
            You can preview the result here after training a model on the left.
          </Typography>
        }
        {state.inputSrc ?
          <PreviewClassConfidence predictClasses={state.predictClasses} color={{ bar: classes.progressBarActive, colorPrimary: classes.progressColorPrimary }} />
          :
          <PreviewClassConfidence predictClasses={state.predictClasses} color={{ bar: classes.progressBarDisable, colorPrimary: classes.progressColorPrimary }} />
        }
      </Grid>
    );
  };

  function PreviewColumn(props) {
    const width = useParentWidthSize(props);

    return (
      <React.Fragment>
        <Card style={{ width: width }} className={classes.cardCenter}>
          <CardHeader title="Preview" action={
            <Button variant="contained" size="large" fullWidth={true} startIcon={<PublishIcon />} disableElevation>
              Export Model
            </Button>
          } />
          <CardContent className={classes.cardContent}>
            <PreviewCam />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="xl">
          <Grid container spacing={8}>
            <Grid container item className={classes.classGrid} key={1} xs={12} sm={6} md={6} alignContent="center">
              <ClassColumn />
            </Grid>
            <Grid item ref={trainGrid} key={2} xs={12} sm={6} md={2}>
              <TrainColumn captureEl={captureElList} parentNode={trainGrid} />
            </Grid>
            <Grid item ref={previewGrid} key={3} xs={12} sm={6} md={4}>
              <PreviewColumn parentNode={previewGrid} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}