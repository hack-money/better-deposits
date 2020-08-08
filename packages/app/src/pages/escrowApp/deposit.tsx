import React from 'react';
import { Contract } from 'ethers';
import DepositTable from '../../components/escrowApp/deposit/DepositTable';
interface DepositProps {
  escrowContract: Contract;
  linkedERC20Contract: Contract;
}

export default function Deposit({
  escrowContract,
  linkedERC20Contract,
}: DepositProps) {
  return (
    <React.Fragment>
      <DepositTable
        escrowContract={escrowContract}
        linkedERC20Contract={linkedERC20Contract}
      />
    </React.Fragment>
  );
}
