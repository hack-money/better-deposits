import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { getBetterDepositsContract } from '../../contracts';

interface CreateProps {
  provider: Web3Provider;
  betterDepositAddress: string;
}

// want to create an escrow arrangement
// need to instantiate the contracts
// need to input params - likely via a form
// need to send tx to contract, likely at press of a button
export default function Create({
  provider,
  betterDepositAddress,
}: CreateProps) {
  const [betterDepositsContract, setBetterDepositsContract] = useState<
    Contract
  >();

  useEffect(() => {
    try {
      const contract = getBetterDepositsContract(
        provider,
        betterDepositAddress
      );
      setBetterDepositsContract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [betterDepositAddress, provider]);

  return (
    <React.Fragment>
      <div>here</div>
    </React.Fragment>
  );
}
