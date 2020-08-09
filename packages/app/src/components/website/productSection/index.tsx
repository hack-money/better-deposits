import React from 'react';
import { useStyles } from '../../useStyles';
import DashboardImage from '../../../images/dashboard.png';
import { Container, Typography, Box } from '@material-ui/core';
import ImageBox from '../howItWorksSection/ImageBox';

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
        <ImageBox src={DashboardImage} />
      </Container>
    </div>
  );
}
