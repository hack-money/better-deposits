import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { homeRoute, technologyRoute } from '../routes';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './useStyles';

export default function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Typography color="inherit" variant="h5" noWrap>
            Better Deposits
          </Typography>
          <Grid justify="flex-end" container>
            {' '}
            <Grid>
              <Button color="inherit" component={Link} to={homeRoute}>
                Home
              </Button>
            </Grid>
            <Button color="inherit" component={Link} to={technologyRoute}>
              Technology
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
