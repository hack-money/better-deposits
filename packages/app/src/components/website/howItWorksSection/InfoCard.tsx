import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type InfoCardProps = {
  title: string;
  firstPara: string;
  secondPara: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  firstPara,
  secondPara,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h2" color="textPrimary">
        {title}
      </Typography>
      <Typography style={{ padding: "10px" }}>{firstPara}</Typography>
      <Typography style={{ padding: "10px" }}>{secondPara}</Typography>
    </Box>
  );
};

export default InfoCard;
