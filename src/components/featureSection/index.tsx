import React from 'react';
import {
  Typography,
  Grid,
  isWidthUp,
  withWidth,
  Container,
} from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import SpeedIcon from '@material-ui/icons/Speed';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import FeatureCard from './FeatureCard';
import { useStyles } from '../useStyles';

const iconSize = 30;

function calculateSpacing(width: Breakpoint) {
  if (isWidthUp('lg', width)) {
    return 5;
  }
  if (isWidthUp('md', width)) {
    return 4;
  }
  if (isWidthUp('sm', width)) {
    return 3;
  }
  return 2;
}

const features = [
  {
    color: '#00C853',
    headline: 'Trustless',
    text:
      'No need to trust a third party. Your deposit is locked and treated according to deterministic computer code',
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: '0',
    smDelay: '0',
  },
  {
    color: '#6200EA',
    headline: 'Earn high yield interest',
    text:
      'Earn interest on the deposit throughout via DeFi money market protocols',
    icon: <MonetizationOnIcon style={{ fontSize: iconSize }} />,
    mdDelay: '200',
    smDelay: '200',
  },
  {
    color: '#0091EA',
    headline: 'Speed',
    text: 'Deposit and withdraw within seconds, not days',
    icon: <SpeedIcon style={{ fontSize: iconSize }} />,
    mdDelay: '400',
    smDelay: '0',
  },
];

type FeatureProps = { width: Breakpoint };

function FeatureSection(props: FeatureProps) {
  const { width } = props;
  const classes = useStyles();
  return (
    <div className={classes.featureSection}>
      <Container>
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <Typography variant="h3" align="center" className="lg-mg-bottom">
            Features
          </Typography>
          <div className="container-fluid">
            <Grid container spacing={calculateSpacing(width)}>
              {features.map((element) => (
                <Grid
                  item
                  xs={6}
                  md={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    isWidthUp('md', width) ? element.mdDelay : element.smDelay
                  }
                  key={element.headline}
                >
                  <FeatureCard
                    Icon={element.icon}
                    color={element.color}
                    headline={element.headline}
                    text={element.text}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default withWidth()(FeatureSection);
