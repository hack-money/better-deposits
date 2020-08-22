import React, { useState } from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { BigNumberish } from "ethers";
import { BetterDeposit } from "../../../contracts/BetterDeposit";

interface DisputeTableProps {
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

const DisputeTable: React.FC<DisputeTableProps> = ({ escrowContract }) => {
  const classes = useStyles();
  const [escrowId, setEscrowId] = useState<BigNumberish>(0);

  const disputeDeposit = (disputedEscrowId: BigNumberish) => {
    escrowContract.dispute(disputedEscrowId);
  };

  return (
    <div>
      <Container>
        <div className={classes.root}>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">
              Deposit ID
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              onChange={event => {
                setEscrowId(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => disputeDeposit(escrowId)}
          >
            Dispute
          </Button>
        </Grid>
      </Container>
    </div>
  );
};
export default DisputeTable;
