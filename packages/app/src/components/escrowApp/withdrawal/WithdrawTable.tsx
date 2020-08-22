import React, { useState } from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
} from "@material-ui/core";
import { BigNumberish } from "ethers";
import { BetterDeposit } from "../../../contracts/BetterDeposit";

interface WithdrawalTableProps {
  escrowContract: BetterDeposit;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
  escrowContract,
}) => {
  const classes = useStyles();
  const [selectedEscrowId, setSelectedEscrowId] = useState<BigNumberish>(0);

  const approveDepositRelease = (escrowId: BigNumberish) => {
    escrowContract.approveDepositRelease(escrowId);
  };

  const withdrawDeposit = (escrowId: BigNumberish) => {
    escrowContract.withdraw(escrowId);
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
            onChange={event => {
              setSelectedEscrowId(event.target.value);
            }}
          />
        </FormControl>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => approveDepositRelease(selectedEscrowId)}
            style={{
              marginTop: "10px",
              paddingRight: "20px",
            }}
          >
            Approve release
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => withdrawDeposit(selectedEscrowId)}
            style={{
              marginTop: "10px",
              paddingRight: "20px",
            }}
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default WithdrawalTable;
