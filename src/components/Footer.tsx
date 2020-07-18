import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../styles/useStyles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        BetterDeposits
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        BetterDeposits
      </Typography>
    </footer>
  );
}
