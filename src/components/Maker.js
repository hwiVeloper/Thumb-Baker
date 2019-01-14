import React, { Component } from 'react';
import './Maker.css';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import ColorPicker from 'material-ui-color-picker'
import Fab from '@material-ui/core/Fab';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

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
      textPosition: 'text-centered',
      thumbWidth: 500,
      thumbHeight: 500,
      text: 'Sample Text',
      textColor: '#000000',
      textSize: 14,
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
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    }

    reader.readAsDataURL(file);
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
      this.downloadURI(canvas.toDataURL(), 'thumb-baker.png');
    });
  }

  downloadURI(canvas, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = canvas;
    document.body.appendChild(link);
    link.click();
    // after creating link you should delete dynamic link
    // clearDynamicLink(link);
    link.remove();
  }

  render() {
    const {
      imagePreviewUrl,
      textPosition,
      text,
    } = this.state;

    const textStyle = {
      color: this.state.textColor,
      fontSize: `${this.state.textSize}px`,
    };

    const { classes } = this.props;

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
                      label="Width"
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
                      label="Height"
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
                  <Grid item xs={12}>
                    <input id="upload" type="file" accept="image/*" onChange={this.handleImageChange} />
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
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div
                  id="preview"
                  style={{
                    width: this.state.thumbWidth,
                    height: this.state.thumbHeight,
                    border: '1px solid #000',
                    backgroundImage: `url(${imagePreviewUrl})`,
                    backgroundSize: 'cover',
                    position: 'relative',
                  }}
                >
                  <div>
                    <span className={textPosition} style={textStyle}>
                      {text}
                    </span>

                  </div>
                </div>
                <div className="export-area">
                  <Button variant="contained" color="primary">
                    Download Image
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.handleClickDownload}>
          Download!
        </Fab>
      </>
    )
  }
}
export default withStyles(styles)(Maker);
