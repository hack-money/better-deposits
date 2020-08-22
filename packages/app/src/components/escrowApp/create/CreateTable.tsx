import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { BetterDeposit } from "../../../contracts/BetterDeposit";

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

interface CreateTableProps {
  escrowContract: BetterDeposit;
}

const CreateTable: React.FC<CreateTableProps> = ({ escrowContract }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    currentUser: "0xBb29eAAFC879a8C22c4de2398c85437237d9d289",
    deposit: 2,
    counterpartyAddress: "0x11743b069F67FD5150950B72766D06dE8a62e5E6",
    counterpartyDeposit: 1,
    adjudicator: "0x5C983f7f954F84680381E816ca7e3385d15650Bc",
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createEscrow = (
    userA: string,
    userB: string,
    adjudicator: string,
    userARequiredDeposit: number,
    userBRequiredDeposit: number,
  ) => {
    try {
      escrowContract.create(
        userA,
        userB,
        adjudicator,
        userARequiredDeposit,
        userBRequiredDeposit,
      );
    } catch (err) {
      console.log(err.message);
    }
  };

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
            onChange={handleChange("currentUser")}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit amount
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.deposit}
            onChange={handleChange("deposit")}
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
            onChange={handleChange("counterpartyAddress")}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit required of counterparty
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.counterpartyDeposit}
            onChange={handleChange("counterpartyDeposit")}
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
            onChange={handleChange("adjudicator")}
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
              values.counterpartyDeposit,
            )
          }
        >
          Create
        </Button>
      </Grid>
    </div>
  );
};

export default CreateTable;
