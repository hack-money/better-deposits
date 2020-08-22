import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { useStyles } from "../../useStyles";
import DashboardImage from "../../../images/dashboard.png";
import ImageBox from "../howItWorksSection/ImageBox";

const ProductSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.product}>
      <Box m={5}>
        <Typography variant="h3" align="center" component="h2">
          Product
        </Typography>
      </Box>
      <Container>
        <ImageBox src={DashboardImage} />
      </Container>
    </div>
  );
};

export default ProductSection;
