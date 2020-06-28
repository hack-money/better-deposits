import { ethers, waffle } from '@nomiclabs/buidler';
import { Signer, Wallet } from 'ethers';

import ERC20Mintable from '../artifacts/ERC20Mintable.json';
import BetterDeposit from '../artifacts/BetterDeposit.json';

const { deployContract } = waffle;

export const depositFixture = async (
  [owner, userA, userB]: Wallet[],
  provider: any,
) => {
  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  const ownerAddress = await owner.address;
  const userAAddress = await userA.address;
  const userBAddress = await userB.address;

  const erc20 = await deployContract(owner, ERC20Mintable);

  const betterDeposit = await deployContract(owner, BetterDeposit, [
    erc20.address,
    userAAddress,
    userBAddress,
    userADeposit,
    userBDeposit,
  ]);
  await betterDeposit.deployed();

  // mint users some tokens
  await erc20.mint(userAAddress, mintAmount);
  await erc20.mint(userBAddress, mintAmount);

  return {
    erc20,
    betterDeposit,
    mintAmount,
    userADeposit,
    userBDeposit,
  };
}
