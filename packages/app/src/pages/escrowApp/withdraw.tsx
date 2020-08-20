import React from "react";
import { Contract } from "@ethersproject/contracts";
import WithdrawTable from "../../components/escrowApp/withdrawal/WithdrawTable";

interface WithdrawProps {
  escrowContract: Contract;
}

export default function Withdraw({ escrowContract }: WithdrawProps) {
  return (
    <React.Fragment>
      <WithdrawTable escrowContract={escrowContract} />
    </React.Fragment>
  );
}
