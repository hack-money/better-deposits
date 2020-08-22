import React from "react";
import { Contract } from "@ethersproject/contracts";
import DepositTable from "../../components/escrowApp/deposit/DepositTable";

interface DepositProps {
  escrowContract: Contract;
  linkedERC20Contract: Contract;
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
