import React from "react";
import { Container, Grid, Paper, Box } from "@material-ui/core";
import { useStyles } from "../components/useStyles";
import EscrowSummary from "../components/dashboard/EscrowSummary";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};

export default Dashboard;
