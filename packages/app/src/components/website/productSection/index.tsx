import React from 'react';
import { useStyles } from '../../useStyles';
import DashboardImage from './Dashboard.png';
import { Container, Typography, Box } from '@material-ui/core';

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.product}>
      <Box m={5}>
        <Typography variant="h3" align="center" component="h2">
          Product
        </Typography>
      </Box>
      <Container>
        <img src={DashboardImage} alt="" width="100%" className="center"></img>
      </Container>
    </div>
  );
}
