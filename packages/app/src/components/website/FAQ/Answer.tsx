import React from "react";
import { Typography } from "@material-ui/core";

type AnswerProps = {
  answer: string;
};

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <Typography align="left" variant="h6" paragraph>
      {answer}
    </Typography>
  );
};

export default Answer;
