import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useStyles } from '../useStyles';

export default function BottomSection() {
  const classes = useStyles();
  return (
    <div className={classes.bottomSection}>
      <Divider />
    </div>
  );
}
