import React, { Component } from 'react';
import './Maker.css';

import {
  Paper,
  Grid,
  InputLabel,
  TextField,
  Radio,
  Fab,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  FormLabel,
  withStyles,
  Typography,
  Checkbox,
} from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker'

import html2canvas from 'html2canvas';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: '1em',
    bottom: '1em',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Maker extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      previewBackgroundColor: '',
      textPosition: 'text-centered',
      thumbWidth: 250,
      thumbHeight: 250,
      backgroundType: 'image',
      text: 'Sample Text',
      textColor: '#000000',
      textSize: 14,
      border: true,
    }

    // event method bind
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTextPositionChange = this.handleTextPositionChange.bind(this);
    this.handleThumbWidthChange = this.handleThumbWidthChange.bind(this);
    this.handleThumbHeightChange = this.handleThumbHeightChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSizeChange = this.handleTextSizeChange.bind(this);
    this.handleClickDownload = this.handleClickDownload.bind(this);
    this.downloadURI = this.downloadURI.bind(this);
    this.handleBackgroundTypeChange = this.handleBackgroundTypeChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    if (this.state.backgroundType === 'image') {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result,
        });
      }

      reader.readAsDataURL(file);
    } else
    if (this.state.backgroundType === 'url') {
      this.setState({
        imagePreviewUrl: e.target.value,
      })
    }
  }

  handleTextPositionChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleThumbWidthChange(e) {
    this.setState({
      thumbWidth: (Number(e.target.value) > 500 ? 500 : Number(e.target.value)),
    });
  }

  handleThumbHeightChange(e) {
    this.setState({
      thumbHeight: (Number(e.target.value) > 500 ? 500 : Number(e.target.value)),
    });
  }

  handleTextChange(e) {
    // let val = e.target.value;
    // val = val.split('\\n').join('\\n');
    this.setState({
      text: e.target.value,
    })
  }

  handleTextSizeChange(e) {
    this.setState({
      textSize: e.target.value,
    })
  }

  handleClickDownload(e) {
    e.preventDefault();

    const preview = document.getElementById('preview');
    html2canvas(preview).then((canvas) => {
      this.downloadURI(canvas.toDataURL('image/png'), 'thumb-baker.png');
    });
  }

  downloadURI(img, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = img;
    link.target = '_self';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  handleBackgroundTypeChange(e) {
    this.setState({
      backgroundType: e.target.value,
      previewBackgroundColor: '#ffffff',
      imagePreviewUrl: '',
    });
  }

  render() {
    const {
      imagePreviewUrl,
      textPosition,
      text,
      backgroundType,
    } = this.state;

    const textStyle = {
      color: this.state.textColor,
      fontSize: `${this.state.textSize}px`,
      display: 'table-cell',
      margin: 0,
    };

    const { classes } = this.props;

    let backgroundComp;
    switch (backgroundType) {
      case 'image':
        backgroundComp = (
          <input id="upload" type="file" accept="image/*" onChange={this.handleImageChange} />
        );
        break;
      case 'color':
        backgroundComp = (
          <ColorPicker
            name="backgroundColor"
            defaultValue="#000000"
            value={this.state.previewBackgroundColor}
            onChange={color => this.setState({ previewBackgroundColor: color })}
            label="Background Color"
          />
        );
        break;
      case 'url':
        backgroundComp = (
          <TextField
            id="standard-with-placeholder"
            label="URL"
            placeholder="ex) https://github.com/hwiveloper.png"
            className={classes.textField}
            onChange={this.handleImageChange}
            margin="none"
          />
        );
        break;
      default:
        backgroundComp = null;
    }

    return (
      <>
        <main className={classes.layout}>
          <Grid container spacig={24}>
            {/* Thumb Config Part */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField
                      id="thumbWidth"
                      label="Width (max: 500)"
                      className={classes.textField}
                      value={this.state.thumbWidth}
                      onChange={this.handleThumbWidthChange}
                      margin="normal"
                      type="number"
                      inputProps={{ min: '100', max: '500' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="thumbHeight"
                      label="Height (max: 500)"
                      className={classes.textField}
                      value={this.state.thumbHeight}
                      onChange={this.handleThumbHeightChange}
                      margin="normal"
                      type="number"
                      inputProps={{ min: '100', max: '500' }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <FormLabel component="legend">Background Type</FormLabel>
                    <FormControlLabel
                      control={(
                        <Radio
                          checked={this.state.backgroundType === 'image'}
                          onChange={this.handleBackgroundTypeChange}
                          value="image"
                          name="backgroundType"
                          color="primary"
                        />
                      )}
                      label="Image"
                    />
                    <FormControlLabel
                      control={(
                        <Radio
                          checked={this.state.backgroundType === 'color'}
                          onChange={this.handleBackgroundTypeChange}
                          value="color"
                          name="backgroundType"
                          color="primary"
                        />
                      )}
                      label="Color"
                    />
                    <FormControlLabel
                      control={(
                        <Radio
                          checked={this.state.backgroundType === 'url'}
                          onChange={this.handleBackgroundTypeChange}
                          value="url"
                          name="backgroundType"
                          color="primary"
                        />
                      )}
                      label="URL"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel component="legend">Border</FormLabel>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={this.state.border}
                          onChange={(checked) => {
                            console.log(checked.target.checked);
                            this.setState({ border: checked.target.checked })
                          }}
                        />
                      )}
                      label={this.state.border ? 'Use Border(1px solid black)' : 'Not Use Border'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {backgroundComp}
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      id="textValue"
                      label="Text"
                      multiline
                      rowsMax="4"
                      value={text}
                      onChange={this.handleTextChange}
                      className={classes.textField}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Text Position</InputLabel>
                      <Select
                        value={textPosition}
                        onChange={this.handleTextPositionChange}
                        displayEmpty
                        name="textPosition"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="text-centered">centered</MenuItem>
                        <MenuItem value="text-top-left">top-left</MenuItem>
                        <MenuItem value="text-top-right">top-right</MenuItem>
                        <MenuItem value="text-bottom-left">bottom-left</MenuItem>
                        <MenuItem value="text-bottom-right">bottom-right</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000000"
                      value={this.state.textColor}
                      onChange={color => this.setState({ textColor: color })}
                      label="Font Color"
                      style={{ color: '#000000' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="fontSize"
                      label="Font Size"
                      className={classes.textField}
                      value={this.state.textSize}
                      onChange={this.handleTextSizeChange}
                      type="number"
                      inputProps={{ min: '12', max: '100' }}
                    />
                  </Grid>
                </Grid>
              </Paper>
              {/* Thumb Preview */}
              <Paper className={classes.paper} align="center">
                <div
                  id="preview"
                  style={{
                    width: this.state.thumbWidth,
                    height: this.state.thumbHeight,
                    border: this.state.border ? '1px solid #000' : 'none',
                    backgroundImage: `url(${imagePreviewUrl})`,
                    backgroundColor: this.state.previewBackgroundColor,
                    backgroundSize: 'cover',
                    position: 'relative',
                    padding: 5,
                    display: 'table',
                  }}
                >
                  <Typography className={textPosition} style={textStyle}>
                    {/* {text} */}
                    {text.split('\n').map(line => (<span>{line}<br /></span>))}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} />
          </Grid>
        </main>
        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.handleClickDownload}>
          Download Preview
        </Fab>
      </>
    )
  }
}
export default withStyles(styles)(Maker);
