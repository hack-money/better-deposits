import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Answer from '../../components/website/FAQ/Answer';
import Question from '../../components/website/FAQ/Question';

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
              answer="A smart contract is a piece of software that acts according to a set of pre-programmed rules. They are immutable (their code and rules 
                cannot be changed once deployed), always on 24/7, and are able to store and manipulate money.
                
                They are deployed on the Ethereum blockchain."
            />
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
              answer="It is the smart contract that holds your funds and acts on the funds according to the escrow rules you setup. This means that you're not trusting an individual or company to hold the deposit, rather 
              you rely on immutable, always-on and permissionless code. However, this is currently alpha software and not ready for real use. Better Deposits, at the moment, is a priviledged actor has various admin priviledges."
            />
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
            lending, borrowing and insurance amongst other common financial activities. Better Deposits uses this to generate passive interest on your escrowed deposit."
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="5. How do I get started using BetterDeposits?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer
              answer="Click 'Launch App' on the homepage. The software is currently under development, so in the meantime we would appreciate you filling in the feedback questionnaire
            to help us shape the product!"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="6. What rules can I set on the escrow or deposit arrangement?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer
              answer="All escrows and deposits can be customised according to your specific circumstance. You set the deposit required of each party, the time period over
            which the funds are locked and the third party who will resolve any deposit disputes."
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="7. What do I need to get started?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer answer="Getting started is simple and easy. You need an email address and an internet connection." />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Question question="8. Isn't crypto volatile? Won't my deposit fluctuate in value?" />
          </AccordionSummary>
          <AccordionDetails>
            <Answer
              answer="No, your deposit will not fluctuate in value. Your deposit is stored behind the scenes as a stablecoin (not as Ether for example).
            Stablecoins have their value pegged to $1, their value doesn't change. "
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
