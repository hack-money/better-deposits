import React from 'react';
import Explainer from './Explainer';
import { useStyles } from '../useStyles';

export default function GetStartedSection() {
  const classes = useStyles();
  return (
    <div className={classes.getStarted}>
      <Explainer />
    </div>
  );
}
