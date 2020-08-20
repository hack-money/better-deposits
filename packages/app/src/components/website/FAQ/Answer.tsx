import React from "react";
import { Typography } from "@material-ui/core";

type AnswerProps = {
  answer: string;
};

export default function Answer(props: AnswerProps) {
  const { answer } = props;
  return (
    <Typography align="left" variant="h6" paragraph>
      {answer}
    </Typography>
  );
}
