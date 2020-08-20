import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "../../useStyles";

export default function IntroSection() {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.intro}>
        <Typography
          variant="h3"
          color="textPrimary"
          align="center"
          style={{ padding: "20px" }}
        >
          Better Deposits is financial software that allows you to manage your
          property deposits.
        </Typography>
        <Typography
          variant="h3"
          color="textPrimary"
          align="center"
          style={{ padding: "20px" }}
        >
          It uses cutting edge technology - smart contracts - so you don't have
          to rely on a third party.
        </Typography>
        <Typography
          variant="h3"
          color="textPrimary"
          align="center"
          style={{ padding: "20px" }}
        >
          You are in control.
        </Typography>
      </div>
    </Container>
  );
}
