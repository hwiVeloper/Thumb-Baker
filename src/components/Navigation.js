import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, CssBaseline } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Navigation = memo(({ classes }) => (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Thumb Baker
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
))

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
