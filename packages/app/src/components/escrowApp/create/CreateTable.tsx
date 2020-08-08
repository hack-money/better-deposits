import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Button, Grid } from '@material-ui/core';
import { Contract } from 'ethers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

interface CreateTableProps {
  escrowContract: Contract;
}

export default function CreateTable({ escrowContract }: CreateTableProps) {
  const classes = useStyles();
  const [values, setValues] = useState({
    currentUser: '',
    deposit: 0n,
    counterpartyAddress: '',
    counterpartyDeposit: 0n,
    adjudicator: '',
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createEscrow = (
    userA: string,
    userB: string,
    adjudicator: string,
    userARequiredDeposit: bigint,
    userBRequiredDeposit: bigint
  ) => {
    try {
      escrowContract.create(
        userA,
        userB,
        adjudicator,
        userARequiredDeposit,
        userBRequiredDeposit
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // TODO: format better, stop text entererd in one box being entered in all
  // make a submit button, which will send all data off to smart contract
  return (
    <div>
      <div className={classes.root}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            User (Ethereum address)
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.currentUser}
            onChange={handleChange('currentUser')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit amount
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.deposit}
            onChange={handleChange('deposit')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Counterparty (Ethereum address)
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.counterpartyAddress}
            onChange={handleChange('counterpartyAddress')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit required of counterparty
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.counterpartyDeposit}
            onChange={handleChange('counterpartyDeposit')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Third party adjudicator (Ethereum address)
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.adjudicator}
            onChange={handleChange('timeLock')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() =>
            createEscrow(
              values.currentUser,
              values.counterpartyAddress,
              values.adjudicator,
              values.deposit,
              values.counterpartyDeposit
            )
          }
        >
          Create
        </Button>
      </Grid>
    </div>
  );
}
