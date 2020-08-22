import React from "react";
import Explainer from "./Explainer";
import { useStyles } from "../../useStyles";

const GetStartedSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.getStarted}>
      <Explainer />
    </div>
  );
};

export default GetStartedSection;
