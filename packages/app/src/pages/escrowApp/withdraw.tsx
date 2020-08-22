import React from "react";
import { Contract } from "@ethersproject/contracts";
import WithdrawTable from "../../components/escrowApp/withdrawal/WithdrawTable";

interface Props {
  escrowContract: Contract;
}

const Withdraw: React.FC<Props> = ({ escrowContract }) => (
  <WithdrawTable escrowContract={escrowContract} />
);

export default Withdraw;
