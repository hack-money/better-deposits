import React from "react";
import WithdrawTable from "../../components/escrowApp/withdrawal/WithdrawTable";
import { BetterDeposit } from "../../contracts/BetterDeposit";

interface Props {
  escrowContract: BetterDeposit;
}

const Withdraw: React.FC<Props> = ({ escrowContract }) => (
  <WithdrawTable escrowContract={escrowContract} />
);

export default Withdraw;
