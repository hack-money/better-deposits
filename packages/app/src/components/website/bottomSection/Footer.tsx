import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from '../../useStyles';
import Copyright from './Copyright';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </footer>
  );
}
