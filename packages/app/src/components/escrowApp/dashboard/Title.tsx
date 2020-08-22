import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

interface Props {
  children: ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
