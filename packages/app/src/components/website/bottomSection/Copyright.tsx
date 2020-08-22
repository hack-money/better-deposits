import { Container, Typography } from "@material-ui/core";
import React from "react";

const Copyright: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" align="center">
        Better Deposits
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Copyright © {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default Copyright;
