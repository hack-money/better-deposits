import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Answer from '../components/FAQ/Answer';
import Question from '../components/FAQ/Question';

const useStyles = makeStyles((theme) => ({
  faq: {
    padding: theme.spacing(8, 0, 7),
    width: '100%',
  },
  accordionStart: {
    padding: theme.spacing(3),
  },
}));

export default function FAQ() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.faq}>
        <Typography
          variant="h3"
          align="center"
          className={classes.accordionStart}
        >
          FAQ
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Question question="1. What is a smart contract?" />
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="2. How can this be trustless?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer
              answer="A smart contract is a piece of computer code that once deployed will perform as programmed in perpetuity. In addition, this computer code
            can store, transfer and manage funds. Together, this means that you rely on a smart contract to store and manage a deposit for you according to set of public, agreed upon rules.
            There isn't a need to trust an individual or company, you trust immutable code."
            />
            <Answer answer="This is however currently alpha software and not ready for real use. Better Deposits, at the moment, is a priviledged actor has various admin priviledges." />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="3. What is DeFi?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer
              answer="DeFi stands for Decentralised Finance and is an ecosystem of financial software running on the Ethereum blockchain. It allows for
            lending, borrowing and insurance amongst common financial activities. Better Deposits uses this to generate passive interest on your escrowed deposit."
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="4. What are the risks involved?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer answer="Security is a core focus for the development of the software. However, this is currently alpha software and not yet ready for real use." />
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
