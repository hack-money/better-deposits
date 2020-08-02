import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfoCard from '../components/howItWorksSection/InfoCard';
import { Typography, Container } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SendIcon from '@material-ui/icons/Send';
import BlockIcon from '@material-ui/icons/Block';

import { useStyles } from '../components/useStyles';
import { shadeColor } from '../components/shadeColor';

const iconSize = '175px';
const localUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
}));

export default function HowItWorks() {
  const classes = useStyles();
  const localClasses = localUseStyles();

  return (
    <Container>
      <div className={classes.howItWorks}>
        <Typography variant="h3" align="center">
          How it works
        </Typography>
        <Grid container spacing={5} style={{ padding: '50px' }}>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={6}>
                <InfoCard
                  title="Escrow setup"
                  firstPara="Two parties that want to setup a trustless escrow arrangement make an account and login to the platform. They agree the rules of the escrow:
                deposit amount, timelock and a third party adjudicator. "
                  secondPara="The escrow is then created on the Ethereum smart contract."
                ></InfoCard>
              </Grid>
              <Grid item xs={2} style={{ margin: 'auto' }}>
                <Container
                  style={{
                    color: shadeColor('#FCB539', 0.5),
                  }}
                >
                  <PeopleIcon className={localClasses.icon} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={6}>
                <InfoCard
                  title="Deposit and activate"
                  firstPara="Next both parties will deposit their parts of the deposit through the platform to the escrow smart contract. Once done, the funds are locked and the escrow is treated
                as active."
                  secondPara="The status of the deposit can now be viewed through the dashboard."
                ></InfoCard>
              </Grid>
              <Grid item xs={2} style={{ margin: 'auto' }}>
                <Container
                  style={{
                    color: shadeColor('#8A39FC', 0.5),
                  }}
                >
                  <AccountBalanceIcon className={localClasses.icon} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={6}>
                <InfoCard
                  title="Withdraw"
                  firstPara="At the end of the escrow period, the deposit becomes unlocked and available for the parties involved to signal that it should be
                released. If both parties are happy that the terms of the arrangement were adhered to, they will both approve the deposit release."
                  secondPara="Once all approvals have been received, the smart contract unlocks the deposit and makes it available for withdraw."
                ></InfoCard>
              </Grid>
              <Grid item xs={2} style={{ margin: 'auto' }}>
                <Container
                  style={{
                    color: shadeColor('#39FC64', 0.5),
                  }}
                >
                  <SendIcon className={localClasses.icon} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={6}>
                <InfoCard
                  title="Dispute"
                  firstPara="If one of the parties instead feels that the terms of the escrow were violated, they can dispute the deposit. This will make the smart contract transfer the 
                deposit to the third party adjudicator that both parties agreed on at the start of the arrangement."
                  secondPara="It is then the responsibility of the third party adjudicator to determine any possible deposit deducations."
                ></InfoCard>
              </Grid>
              <Grid item xs={2} style={{ margin: 'auto' }}>
                <Container
                  style={{
                    color: shadeColor('#FC3945', 0.5),
                  }}
                >
                  <BlockIcon className={localClasses.icon} />
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </div>
    </Container>
  );
}
