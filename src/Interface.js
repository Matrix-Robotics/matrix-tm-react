import React from 'react';
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
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from "@material-ui/icons/Edit";
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Capture from './Capture.js';

import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tmImage from '@teachablemachine/image';


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

let classifier, webcam;

let modelOptions: tmImage.ModelOptions = {
  version: 2,
  checkpointUrl: null,
  alpha: 1,
  trainingLayer: 'out_relu',
};


let metadata: tmImage.Metadata = {
  tfjsVersion: "1.3.1",
  tmVersion: "2.4.4",
  packageVersion: "0.1.0",
  packageName: "matrix-tm-react",
  modelName: "MobileNet-cp13r",
  timeStamp: "11-19-2021",
  labels: [],
  userMetadata: {},
  grayscale: false,
  imageSize: 224,
};

// TODO: Use real parameters.
let parameters = tmImage.TrainingParameters = {
  // denseUnits: Positive integer, dimensionality of the output space.
  denseUnits: 100,
  epochs: 50,
  learningRate: 0.001,
  batchSize: 16,
}

async function loadPretrained() {
  // Load the model.
  // TODO: To load pre-trained model in "Train"
  classifier = await tmImage.createTeachable(metadata, modelOptions);
}

async function train(cards) {
  // training graph settings
  const metrics = ['acc', 'val_acc', 'loss', 'val_loss']
  const container = {
    tab: "Training Process",
    name: '',
    styles: {
      height: '80%'
    }
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics)
  // This will call prepareDataset and map title to card index.

  classifier.setLabels(cards.map(({ title }) => title));

  cards.forEach((card, card_index) => {
    let tempImageList = card.imageList;
    if (typeof tempImageList !== 'undefined' && tempImageList.length > 0) {
      tempImageList.forEach(image => {
        // blob to HTMLImageElement
        let tempImageEl = new Image(224, 224);
        tempImageEl.src = image;
        classifier.addExample(card_index, tempImageEl);
      });
    }
  })

  // TODO: Use Real parameters.
  await classifier.train(parameters, fitCallbacks);
  console.log(classifier);
  return true;
}

async function preview() {
  if (classifier) {
    let flipped = false;
    let prediction = await classifier.predict(webcam.canvas, flipped);
    return prediction;
  }
}


export default function Interface() {

  const classes = useStyles();

  const webcamCanvas = React.useRef(null);
  const captureElList = React.useRef([]);
  const trainGrid = React.useRef(null);
  const previewGrid = React.useRef(null);

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
    // Load the model
    loadPretrained();
  }, [])

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
              <Capture key={props.cardId} cardId={props.cardId} imageList={props.imageList}
                captureEl={captureElList.current[cards.map(card => card.cardId).indexOf(props.cardId)]}
                onChange={handleImageList} onCameraOn={closeCamera} />
            </CardActions>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

  function TrainColumn(props) {
    const width = useParentWidthSize(props);
    const [isUploadModel, setIsUploadModel] = React.useState(false);
    const [isUploadWeights, setIsUploadWeights] = React.useState(false);

    const [splitValue, setSplitValue] = React.useState(0.9);
    const [epochsValue, setEpochsValue] = React.useState(50);
    const [batchValue, setBatchValue] = React.useState(16);
    const [lRateValue, setLRateValue] = React.useState(0.001);
    const [isShowGraph, setIsShowGraph] = React.useState(true);

    // Reset Training Parameters
    const resetAllValues = () => {
      setSplitValue(0.9);
      setEpochsValue(50);
      setBatchValue(16);
      setLRateValue(0.001);
    };

    const handleTrainParameters = () => {
      parameters["epochs"] = Number(epochsValue);
      parameters["learningRate"] = Number(lRateValue);
      parameters["batchSize"] = Number(batchValue);
    }

    const handleTrain = () => {
      handleTrainParameters();
      props.captureEl.current.forEach(f => f.current.forEach(f => f()));
      // Check is total sample count > 0
      // TODO: ZeroSampleError
      if (cards.map(({ imageList }) => imageList).flat(1).length > 0) {
        setIsTraining((prev) => !prev);

        train(cards).then(res => {
          setIsTrained(res);
        });
      }
    };

    const handleGraph = () => {
    };

    const handleSplitValue = (event, newValue) => {
      setSplitValue(newValue);
    };

    /* tf loadLayersModel inputs are image-model.json and image-model.weights.bin 
    */
    async function handleUploadModel() {
      const uploadModel = document.getElementById('json-upload');
      const uploadWeights = document.getElementById('weights-upload');

      // fileName extension Check
      if (uploadModel.files.length !== 0) {
        // TODO:　Need to change file name to image-model.json
        setIsUploadModel(true);
      }
      if (uploadWeights.files.length !== 0) {
        // TODO:　Need to change file name to image-model.weights.bin
        setIsUploadWeights(true);
      }
      // Load Model if both files are uploaded
      if (uploadModel.files.length === 1 & uploadWeights.files.length === 1) {
        tf.loadLayersModel(tf.io.browserFiles([uploadModel.files[uploadModel.files.length - 1],
        uploadWeights.files[uploadWeights.files.length - 1]])).then(res => {
          classifier.model = res;
          setIsTrained(true);
        }).catch(err => {
          console.error(err);
        });
      }
    }

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
          <CardActions className={classes.cardButton}>
            <Button variant="contained" size="large" fullWidth={true} disabled={isUploadModel}
              component="label" startIcon={<ExitToAppRoundedIcon />} onChange={handleUploadModel}
            >
              <input id="json-upload" type="file" accept="*,.json" hidden />
              Upload Json
            </Button>
            <Button variant="contained" size="large" fullWidth={true} disabled={isUploadWeights}
              component="label" startIcon={<ExitToAppRoundedIcon />} onChange={handleUploadModel}
            >
              <input id="weights-upload" type="file" accept="*,.bin" hidden />
              Upload Weights
            </Button>

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
                    Train/Test-split:
                  </Typography>
                  <Slider
                    id="train-test-split"
                    defaultValue={0.9}
                    valueLabelDisplay="auto"
                    step={0.1}
                    marks
                    min={0}
                    max={1}
                    value={splitValue}
                    onChange={handleSplitValue}
                  />
                </div>
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
                  <Select
                    id="batch-size"
                    value={batchValue}
                    onChange={(e) => setBatchValue(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                    <MenuItem value={64}>64</MenuItem>
                    <MenuItem value={128}>128</MenuItem>
                    <MenuItem value={256}>256</MenuItem>
                    <MenuItem value={512}>512</MenuItem>
                  </Select>
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
                    inputProps={{ step: 0.001 }}
                    onChange={(e) => setLRateValue(parseFloat(e.target.value).toFixed(3))}
                  />

                </div>
                <Button onClick={resetAllValues} size="small" color="primary" endIcon={<RotateLeftIcon />} disableElevation>
                  Reset Default
                </Button>
                <Button size="small" color="primary" endIcon={<AssessmentOutlinedIcon />}
                  onClick={() => {
                    handleGraph()
                  }}>
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
                {predictClass[1].className}
              </Typography>
            </Box>
            <Box minWidth="75%" mr={1}>
              <LinearProgress classes={props.color} variant="determinate" value={predictClass[1].probability * 100} />
            </Box>
            <Box minWidth="10%">
              <Typography variant="body2" color="textSecondary">
                {`${Math.round(
                  predictClass[1].probability * 100
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

    const [timeoutHandler, setTimeoutHandler] = React.useState(1);
    const [state, setState] = React.useState({
      inputSrc: false,
      predictClasses: {}
    });

    const handleCheck = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      clearTimeout(timeoutHandler);
    };

    async function loadWebEl() {
      webcam = new tmImage.Webcam(224, 224, false);
      await webcam.setup();
      webcam.play();
    }

    const previewLoop = React.useCallback(() => {
      webcam.update(); // update the webcam frame

      let prediction = preview();
      console.log(prediction);
      prediction.then(res => {
        console.log(res);
        if (res.label !== "") {
          let probability = res;
          console.log(probability);
          setState(state => ({ ...state, predictClasses: probability }));
        }
      });

      if (state.inputSrc) setTimeoutHandler(setTimeout(previewLoop, 100))
    }, [state.inputSrc]);

    // TODO: Nees to fix: After import model, refreshing the page, then the webcam is not working.
    React.useEffect(() => {
      if (isTrained) {
        let webcamLoaded = loadWebEl();

        webcamLoaded.then(() => {
          if (state.inputSrc) {
            webcamCanvas.current.appendChild(webcam.canvas);
            previewLoop();
          } else {
            webcamCanvas.current.innerHTML = '';
          }
        })
      }
      return () => {
      };
    }, [previewLoop, state.inputSrc]);

    return (
      <Grid container direction="column" justifyContent="space-between" alignItems="stretch" >
        {isTrained ?
          <CardActions className={classes.cardButton}>
            <dev ref={webcamCanvas}></dev>
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
            You can preview the prediction here after training a model on the left.
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

    async function handleExportModel() {
      if (classifier) {
        const exportConfig: tf.io.SaveConfig = {
          "trainableOnly": false,
          "includeOptimizer": true,
        };
        // the array is defined and has at least one element
        await classifier.save('downloads://image-model', exportConfig);
      }
    }

    return (
      <React.Fragment>
        <Card style={{ width: width }} className={classes.cardCenter}>
          <CardHeader title="Preview" action={
            <Button variant="contained" size="large" fullWidth={true} onClick={handleExportModel} startIcon={<PublishRoundedIcon />} disableElevation>
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