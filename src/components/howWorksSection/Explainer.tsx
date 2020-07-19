import React from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import { useStyles } from '../useStyles';

export default function ProductHowItWorks() {
  const classes = useStyles();

  return (
    <div className={classes.productHowItWorks}>
      <Container>
        <Typography variant="h3" align="center" component="h2">
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h4" align="center">
                  1
                </Typography>
                <Typography variant="h5" align="center">
                  Untrusting parties want to make an agreement and escrow funds.
                  They agree on the terms of the escrow: value, duration etc.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h4" align="center">
                  2
                </Typography>
                <Typography variant="h5" align="center">
                  Deposit escrow funds to the smart contract. Funds are now
                  locked until the escrow expiry
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h4" align="center">
                  3
                </Typography>
                <Typography variant="h5" align="center">
                  At end of escrow, parties have deposits returned if both
                  parties happy. If not, nominated third party settles dispute.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
