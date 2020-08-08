import React from 'react';
import CreateTable from '../../components/escrowApp/create/CreateTable';
import { Contract } from 'ethers';

interface CreateProps {
  escrowContract: Contract;
}

export default function Create({ escrowContract }: CreateProps) {
  return (
    <React.Fragment>
      <CreateTable escrowContract={escrowContract!} />
    </React.Fragment>
  );
}
