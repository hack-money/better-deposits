import React from 'react';
import Explainer from './Explainer';
import { useStyles } from '../useStyles';

export default function HowWorksSection() {
  const classes = useStyles();
  return (
    <div className={classes.howWorksSection}>
      <Explainer />
    </div>
  );
}
