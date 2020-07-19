import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from '../useStyles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          Better Deposits
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Copyright © {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
}
