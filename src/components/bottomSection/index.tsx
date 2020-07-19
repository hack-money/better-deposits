import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useStyles } from '../useStyles';
import Footer from './Footer';

export default function BottomSection() {
  const classes = useStyles();
  return (
    <div className={classes.bottomSection}>
      <Divider />
      <Footer />
    </div>
  );
}
