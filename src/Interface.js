import React from 'react';
import Capture from './Capture.js';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
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

import train from './train.js';

const ITEM_HEIGHT = 80;

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(8)
  },
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
}));

export default function Interface() {

  const classes = useStyles();
  const trainGrid = React.useRef(null);
  const previewGrid = React.useRef(null);

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

  const [classTitle, setClassTitle] = React.useState([]);
  const [list, setList] = React.useState([
    1,
    2
  ]);
  

  // // let tempArray = []
  // const handleTrain = () => {
  //   // console.log("test");
  // }

  function ClassColumn() {

    const onAddClassBtnClick = () => {
      let tempCards = [...cards];
      if (tempCards.length) {
        setCards([...tempCards, tempCards.at(-1).cardId + 1]);
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
          <ClassCard key={card.cardId} cardId={card.cardId} cards={cards} title={card.title} onChange={handleCards} />
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

    
    const [isNameFocused, setIsNamedFocused] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCards = (card) => {
      props.onChange(card);
    }

    const handleOpe = (opt) => {
      let tempCards = [...cards];
      switch (opt) {
        case 'Delete Class':
          let index = tempCards.map(card => card.cardId).indexOd(props.cardId);
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
              title={!isNameFocused ? (
                <Typography
                  className={classes.classTitle}
                  onClick={() => {
                    setIsNamedFocused(true);
                  }}
                >
                  {props.title}
                  <IconButton aria-label="settings" onClick={() => {
                    setIsNamedFocused(true)
                  }}>
                    <Edit />
                  </IconButton>
                </Typography>
              ) : (
                <TextField
                  autoFocus
                  inputProps={{ className: classes.classTitle }}
                  value={props.title}
                  onKeyDown={
                    event => {
                      if (event.key === 'Enter') {
                        setIsNamedFocused(false)
                      }
                    }
                  }
                  onBlur={event => setIsNamedFocused(false)}
                  onChange={event => {
                    let prevArray = classTitle.slice();
                    prevArray[props.cardId] = event.target.value;
                    setClassTitle(prevArray)}}
                />
              )}
            />
            <CardActions className={classes.cardButton}>
            {/* <Capture key={props.cardId} cardId={props.cardId} onTrain={handleTrain}/> */}
              <Capture key={props.cardId} cardId={props.cardId} />
            </CardActions>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

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

  function TrainColumn(props) {
    const width = useParentWidthSize(props);
    
    return (
      <React.Fragment>
        <Card style={{ width: width }} className={classes.cardCenter} >
          <CardHeader classes="title" title="Training" />
          <CardActions className={classes.cardButton}>
            <Button variant="contained" size="medium" fullWidth="true" disableElevation>
              Train Model
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
                    Epochs:
                  </Typography>
                  <TextField
                    id="epochs-number"
                    defaultValue="50"
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <Typography>
                    Batch Size:
                  </Typography>
                  <TextField
                    id="batch-size-number"
                    defaultValue="16"
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <Typography>
                    Learning Rate:
                  </Typography>
                  <TextField
                    id="learning-rate-number"
                    defaultValue="0.001"
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <Button size="small" color="primary" endIcon={<RotateLeftIcon />} disableElevation>
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

  function PreviewColumn(props) {
    const width = useParentWidthSize(props);
    return (
      <React.Fragment>
        <Card style={{ width: width }} className={classes.cardCenter}>
          <CardHeader title="Preview" action={
            <Button variant="contained" size="large" fullWidth="true" startIcon={<PublishIcon />} disableElevation>
              Export Model
            </Button>
          } />
          <CardContent className={classes.cardContent}>
            <Typography>
              You can preview the result here after training a model on the left.
            </Typography>
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
              <TrainColumn parentNode={trainGrid} />
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