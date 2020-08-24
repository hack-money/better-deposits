import React from "react";
import DepositTable from "../components/deposit/DepositTable";
import { BetterDeposit } from "../contracts/BetterDeposit";
import { Erc20 } from "../contracts/Erc20";

interface DepositProps {
  escrowContract: BetterDeposit;
  linkedERC20Contract: Erc20;
}

const Deposit: React.FC<DepositProps> = ({
  escrowContract,
  linkedERC20Contract,
}) => (
  <DepositTable
    escrowContract={escrowContract}
    linkedERC20Contract={linkedERC20Contract}
  />
);

export default Deposit;
