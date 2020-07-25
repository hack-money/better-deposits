import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { homeRoute, howItWorksRoute, faqRoute } from '../routes';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './useStyles';

export default function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '30rem',
            }}
          >
            <Typography color="inherit" variant="h4" noWrap>
              Better Deposits
            </Typography>
          </div>
          <Grid justify="flex-end" container>
            <Grid>
              <Button
                color="inherit"
                component={Link}
                to={homeRoute}
                size="large"
              >
                Home
              </Button>
            </Grid>
            <Button
              color="inherit"
              component={Link}
              to={howItWorksRoute}
              size="large"
            >
              How it works
            </Button>
          </Grid>
          <Grid>
            <Button color="inherit" component={Link} to={faqRoute} size="large">
              FAQ
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
