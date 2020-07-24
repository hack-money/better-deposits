import React from 'react';
import { Typography, Container, makeStyles, Box } from '@material-ui/core';
import Question from '../components/FAQ/Question';
import Answer from '../components/FAQ/Answer';

const useStyles = makeStyles((theme) => ({
  faq: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  question: {
    padding: theme.spacing(8, 0, 7),
    variant: 'h5',
    align: 'center',
    paragraph: true,
  },
  answer: {
    padding: theme.spacing(8, 0, 7),
    align: 'center',
    variant: 'body1',
    color: 'textSecondary',
  },
}));

export default function FAQ() {
  const styles = useStyles();

  return (
    <div className={styles.faq}>
      <Container>
        <Typography variant="h3" align="center">
          FAQ
        </Typography>
        <Box m={10}>
          <Question question="1. What is a smart contract?" />
          <Answer
            answer="A smart contract is a piece of software, code that acts according to a set of pre-programmed rules. They have a few properties that make them very useful for 
          acting as escrow for funds"
          />
          <Answer
            answer="a) Immutability - once deployed, their code can not be changed. This means you can have confidence that the rules 
          governing your deposit will not change"
          />
          <Answer
            answer="b) Always on, 24/7 - they are permissionless and always online. You can always query the status of your deposit
          "
          />
          <Answer answer="c) Store money - the software can store and process funds easily" />
        </Box>
        <Box m={10}>
          <Question question="2. How can this be trustless?" />
          <Answer
            answer="A smart contract is a piece of computer code that once deployed will perform as programmed in perpetuity. In addition, this computer code
            can store, transfer and manage funds. Together, this means that you rely on a smart contract to store and manage a deposit for you according to set of public, agreed upon rules.
            There isn't a need to trust an individual or company, you trust immutable code."
          />
          <Answer answer="This is however currently alpha software and not ready for real use. Better Deposits, at the moment, is a priviledged actor has various admin priviledges." />
        </Box>
        <Box m={10}>
          <Question question="3. What is DeFi?" />
          <Answer
            answer="DeFi stands for Decentralised Finance and is an ecosystem of financial software running on the Ethereum blockchain. It allows for
            lending, borrowing and insurance amongst common financial activities. Better Deposits uses this to generate passive interest on your escrowed deposit."
          />
        </Box>
        <Box m={10}>
          <Question question="4. What are the risks involved?" />
          <Answer answer="Security is a core focus for the development of the software. However, this is currently alpha software and not yet ready for real use." />
        </Box>
      </Container>
    </div>
  );
}
