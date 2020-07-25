import { waffle } from '@nomiclabs/buidler';
import { Signer } from 'ethers';

import ERC20Mintable from '../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../src/artifacts/BetterDeposit.json';
import { Interface } from 'ethers/lib/utils';

const { deployContract } = waffle;

export const depositFixture = async (
  [owner, userA, userB, adjudicator]: Signer[],
  userADeposit: number,
  userBDeposit: number,
  mintAmount: number
) => {
  const ownerAddress = await owner.getAddress();
  const userAAddress = await userA.getAddress();
  const userBAddress = await userB.getAddress();
  const adjudicatorAddress = await adjudicator.getAddress();

  const erc20 = await deployContract(owner, ERC20Mintable);
  const betterDeposit = await deployContract(owner, BetterDeposit, [
    erc20.address,
  ]);
  await betterDeposit.deployed();
  const BetterDepositInterface = new Interface(BetterDeposit.abi);

  // mint users some tokens
  await erc20.mint(userAAddress, mintAmount);
  await erc20.mint(userBAddress, mintAmount);

  // create the escrow
  const tx = await betterDeposit.create(
    userAAddress,
    userBAddress,
    adjudicatorAddress,
    userADeposit,
    userBDeposit
  );
  const receipt = await tx.wait();
  const escrowId = BetterDepositInterface.parseLog(
    receipt.logs[receipt.logs.length - 1]
  ).args.escrowId;

  return {
    erc20,
    betterDeposit,
    escrowId,
    ownerAddress,
    userAAddress,
    userBAddress,
    adjudicatorAddress,
  };
};
