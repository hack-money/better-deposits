import React from 'react';
import { Container, Grid, Paper, Box } from '@material-ui/core';
import { useStyles } from '../../components/escrowApp/useStyles';
import EscrowSummary from '../../components/escrowApp/dashboard/EscrowSummary';

export default function Dashboard() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <EscrowSummary />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}></Box>
      </Container>
    </main>
  );
}
