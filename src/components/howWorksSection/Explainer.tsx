import React from 'react';
import { Container, Typography } from '@material-ui/core';
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded';
import Looks4RoundedIcon from '@material-ui/icons/Looks4Rounded';
import Looks5RoundedIcon from '@material-ui/icons/Looks5Rounded';

export default function Explainer() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        How it works
      </Typography>
      <Container>
        <LooksOneRoundedIcon color="primary" fontSize="large" />
      </Container>
      <Container>
        <LooksTwoRoundedIcon color="primary" fontSize="large" />
      </Container>
      <Container>
        <Looks3RoundedIcon color="primary" fontSize="large" />
      </Container>
      <Container>
        <Looks4RoundedIcon color="primary" fontSize="large" />
      </Container>
      <Container>
        <Looks5RoundedIcon color="primary" fontSize="large" />
      </Container>
    </div>
  );
}
