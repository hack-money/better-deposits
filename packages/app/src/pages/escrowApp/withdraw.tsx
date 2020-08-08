import React from 'react';
import WithdrawTable from '../../components/escrowApp/withdrawal/WithdrawTable';
import { Contract } from 'ethers';

interface WithdrawProps {
  escrowContract: Contract;
}

export default function Withdraw({ escrowContract }: WithdrawProps) {
  return (
    <React.Fragment>
      <WithdrawTable escrowContract={escrowContract!} />
    </React.Fragment>
  );
}
