import { Container, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../useStyles';

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Better Deposits
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          A smart, coded, financial contract that acts as escrow for deposits in
          low trust renting environments. Rely on code, not law
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={1} justify="center">
            <Button variant="contained" color="primary" size="large">
              Launch
            </Button>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
