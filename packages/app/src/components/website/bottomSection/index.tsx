import React from "react";
import { Divider } from "@material-ui/core";
import { useStyles } from "../../useStyles";
import Footer from "./Footer";

const BottomSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.bottomSection}>
      <Divider />
      <Footer />
    </div>
  );
};

export default BottomSection;
