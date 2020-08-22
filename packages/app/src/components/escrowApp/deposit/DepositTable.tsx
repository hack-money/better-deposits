import React, { useState } from "react";
import { Contract } from "@ethersproject/contracts";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Grid,
} from "@material-ui/core";

interface DepositTableProps {
  linkedERC20Contract: Contract;
  escrowContract: Contract;
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

const DepositTable: React.FC<DepositTableProps> = ({
  escrowContract,
  linkedERC20Contract,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    escrowId: 0n,
    depositAmount: 0n,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const approveContract = (amount: bigint) => {
    linkedERC20Contract.approve(escrowContract.address, amount);
  };

  const depositToContract = (escrowId: bigint, amount: bigint) => {
    escrowContract.deposit(amount, escrowId);
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
            value={values.escrowId}
            onChange={handleChange("escrowId")}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">
            Deposit amount
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.depositAmount}
            onChange={handleChange("depositAmount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => approveContract(values.depositAmount)}
            style={{
              marginTop: "10px",
              paddingRight: "20px",
            }}
          >
            Approve
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() =>
              depositToContract(values.escrowId, values.depositAmount)
            }
            style={{
              marginTop: "10px",
              paddingLeft: "20px",
            }}
          >
            Deposit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DepositTable;
