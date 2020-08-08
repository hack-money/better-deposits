import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { getEscrowContract } from '../../contracts';
import CreateTable from '../../components/escrowApp/create/CreateTable';

interface CreateProps {
  provider: Web3Provider;
  escrowContractAddress: string;
}

export default function Create({
  provider,
  escrowContractAddress,
}: CreateProps) {
  const [escrowContract, setEscrowContract] = useState<Contract>();

  useEffect(() => {
    try {
      const contract = getEscrowContract(provider, escrowContractAddress);
      setEscrowContract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [escrowContractAddress, provider]);

  return (
    <React.Fragment>
      <CreateTable escrowContract={escrowContract!} />
    </React.Fragment>
  );
}
