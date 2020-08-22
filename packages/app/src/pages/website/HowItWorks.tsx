import React from "react";
import { Grid, makeStyles, Typography, Container } from "@material-ui/core";
import InfoCard from "../../components/website/howItWorksSection/InfoCard";

import ConnectWalletImage from "../../images/connectWallet.png";
import CreateEscrowImage from "../../images/createEscrow.png";
import DepositImage from "../../images/deposit.png";
import WithdrawImage from "../../images/withdraw.png";
import DisputeImage from "../../images/dispute.png";
import ImageBox from "../../components/website/howItWorksSection/ImageBox";

import { useStyles } from "../../components/useStyles";

const iconSize = "175px";
const localUseStyles = makeStyles(theme => ({
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

const HowItWorks: React.FC = () => {
  const classes = useStyles();
  const localClasses = localUseStyles();

  return (
    <Container>
      <div className={classes.howItWorks}>
        <Typography variant="h3" align="center">
          How it works
        </Typography>
        <Grid container spacing={5} style={{ padding: "50px" }}>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={11}>
                <InfoCard
                  title="1. Login and connect wallet"
                  firstPara="Login to the platform and connect your wallet"
                  secondPara=""
                ></InfoCard>
              </Grid>
              <Grid item xs={10} style={{ margin: "auto" }}>
                <Container>
                  <ImageBox src={ConnectWalletImage} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={11}>
                <InfoCard
                  title="2. Setup deposit"
                  firstPara="Fill out the details of the deposit arrangement you wish to setup:
                deposit amount, other party involved (e.g. landlord) and a third party adjudicator."
                  secondPara="Click 'Create' to setup the escrow on the Ethereum smart contract."
                ></InfoCard>
              </Grid>
              <Grid item xs={10} style={{ margin: "auto" }}>
                <Container>
                  <ImageBox src={CreateEscrowImage} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={11}>
                <InfoCard
                  title="3. Deposit funds"
                  firstPara="Both parties transfer funds through the platform to the Ethereum escrow smart contract. Once done, the funds are locked and the deposit arrangement is active."
                  secondPara="The status of the deposit can now be viewed through the dashboard."
                ></InfoCard>
              </Grid>
              <Grid item xs={10} style={{ margin: "auto" }}>
                <Container>
                  <ImageBox src={DepositImage} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={11}>
                <InfoCard
                  title="4. Withdraw"
                  firstPara="At the end of the escrow period, if both parties are happy happy that the terms of the arrangement were adhered to then they will signal their approval for the deposit to be released by clicking 'Approve Release'."
                  secondPara="Once all approvals have been received, uses will be able to click 'Withdraw' and withdraw their funds."
                ></InfoCard>
              </Grid>
              <Grid item xs={10} style={{ margin: "auto" }}>
                <Container>
                  <ImageBox src={WithdrawImage} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container className={localClasses.card}>
              <Grid item xs={11}>
                <InfoCard
                  title="5. Dispute"
                  firstPara="If one of the parties instead feels that the terms of the escrow were violated, they can dispute the deposit. This will make the smart contract transfer the 
                deposit to the third party adjudicator that both parties agreed on at the start of the arrangement."
                  secondPara="It is then the responsibility of the third party adjudicator to determine any possible deposit deducations."
                ></InfoCard>
              </Grid>
              <Grid item xs={10} style={{ margin: "auto" }}>
                <ImageBox src={DisputeImage} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </div>
    </Container>
  );
};

export default HowItWorks;
