import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfoCard from '../components/howItWorksSection/InfoCard';
import { Typography, Container } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

import { useStyles } from '../components/useStyles';

const iconSize = '175px';
const localUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
}));

export default function HowItWorks() {
  const classes = useStyles();
  const localClasses = localUseStyles();

  return (
    <div className={classes.howItWorks}>
      <Typography variant="h3" align="center">
        How it works
      </Typography>
      <Grid container spacing={5} style={{ padding: '50px' }}>
        <Container>
          <Grid container className={localClasses.card}>
            <Grid item xs={6}>
              <InfoCard title="Test 1"></InfoCard>
            </Grid>
            <Grid item xs={2} style={{ margin: 'auto' }}>
              <PeopleIcon className={localClasses.icon} />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container className={localClasses.card}>
            <Grid item xs={6}>
              <InfoCard title="Test 1"></InfoCard>
            </Grid>
            <Grid item xs={2} style={{ margin: 'auto' }}>
              <PeopleIcon className={localClasses.icon} />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container className={localClasses.card}>
            <Grid item xs={6}>
              <InfoCard title="Test 1"></InfoCard>
            </Grid>
            <Grid item xs={2} style={{ margin: 'auto' }}>
              <PeopleIcon className={localClasses.icon} />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}
