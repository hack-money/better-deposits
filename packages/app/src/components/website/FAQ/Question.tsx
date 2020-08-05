import React from 'react';
import { Typography } from '@material-ui/core';

type QuestionProps = {
  question: string;
};

export default function Question(props: QuestionProps) {
  const { question } = props;
  return (
    <Typography align="center" variant="h5" paragraph>
      {question}
    </Typography>
  );
}
