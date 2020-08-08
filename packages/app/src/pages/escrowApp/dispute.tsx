import React from 'react';
import DisputeTable from '../../components/escrowApp/dispute/DisputeTable';
import { Contract } from 'ethers';

interface DisputeProps {
  escrowContract: Contract;
}

export default function Dispute({ escrowContract }: DisputeProps) {
  return (
    <React.Fragment>
      <DisputeTable escrowContract={escrowContract!} />
    </React.Fragment>
  );
}
