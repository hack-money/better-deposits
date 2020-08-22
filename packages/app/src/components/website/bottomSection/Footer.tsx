import React from "react";
import { Container } from "@material-ui/core";
import { useStyles } from "../../useStyles";
import Copyright from "./Copyright";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
