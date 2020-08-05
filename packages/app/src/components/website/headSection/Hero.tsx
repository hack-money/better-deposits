import { Container, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../../useStyles';
import { questionnaireRoute, appRoute } from '../../../routes';

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Better Deposits
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Trustless, automated, escrow solution for your deposit. Agree on a set
          of rules with the other party and deposit into a smart contract
        </Typography>
        <Typography variant="h6" align="center" color="textPrimary">
          Rely on code, not trust
        </Typography>
      </Container>

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <div className={classes.heroButtons}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to={appRoute}
            >
              Launch App
            </Button>
          </div>
        </Grid>
        <Grid>
          <div className={classes.heroButtons}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to={questionnaireRoute}
            >
              Feedback
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
