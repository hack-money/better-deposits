import React from "react";
import { Typography, Grid, Container, Box } from "@material-ui/core";

export default function GetStarted() {
  return (
    <div>
      <Container>
        <Box m={5}>
          <Typography variant="h3" align="center" component="h2">
            Get started
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
                  Two parties (e.g. tenant and landlord) want to make an
                  agreement and lock up a deposit for a period of time. They
                  agree on: value, duration, third party adjudicator.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h5" paragraph>
                  2. Deposit funds into smart contract
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Parties transfer the deposit funds to BetterDeposits financial
                  software - a smart contract. Funds are now locked until the
                  expiry.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div>
                <Typography variant="h5" paragraph>
                  3. Settle escrow or raise dispute
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  At end of deposit, if parties are happy then deposits are
                  returned. If not, the nominated third party adjudicator
                  settles the dispute.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
