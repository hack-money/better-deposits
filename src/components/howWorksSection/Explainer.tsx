import React from 'react';
import { Typography, Grid, Container, Box } from '@material-ui/core';

export default function ProductHowItWorks() {
  return (
    <div>
      <Container>
        <Box m={5}>
          <Typography variant="h3" align="center" component="h2">
            How it works
          </Typography>
        </Box>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h5" paragraph>
                  1. Agree escrow
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Untrusting parties want to make an agreement and escrow funds.
                  They agree on the terms of the escrow: value, duration etc.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h5" paragraph>
                  2. Deposit funds into smart contract
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Deposit escrow funds to the smart contract. Funds are now
                  locked until the escrow expiry
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h5" paragraph>
                  3. Settle escrow or raise dispute
                </Typography>
                <Typography variant="body1" color="textSecondary">
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
