import { Container, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../useStyles';

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
          of rules with the other party (deposit, lock-up period) and deposit
          into a smart contract
        </Typography>
        <Typography variant="h6" align="center" color="textPrimary">
          Rely on code, not trust
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={1} justify="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Launch App
            </Button>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
