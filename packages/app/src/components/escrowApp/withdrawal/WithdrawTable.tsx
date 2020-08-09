import React, { useState } from 'react';
import { Contract } from 'ethers';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Grid,
} from '@material-ui/core';

interface WithdrawalTableProps {
  escrowContract: Contract;
}

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

export default function WithdrawalTable({
  escrowContract,
}: WithdrawalTableProps) {
  const classes = useStyles();
  const [escrowId, setEscrowId] = useState(0n);

  const approveDepositRelease = (escrowId: bigint) => {
    escrowContract.approveDepositRelease(escrowId);
  };

  return (
    <div>
      <div className={classes.root}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit ID
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            onChange={(event) => {
              setEscrowId(BigInt(event.target.value));
            }}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => approveDepositRelease(escrowId)}
        >
          Approve release
        </Button>
      </Grid>
    </div>
  );
}