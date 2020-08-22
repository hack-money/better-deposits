import React from "react";
import { Typography } from "@material-ui/core";

type QuestionProps = {
  question: string;
};

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <Typography align="center" variant="h5" paragraph>
      {question}
    </Typography>
  );
};

export default Question;
