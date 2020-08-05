import { waffle } from '@nomiclabs/buidler';
import { Signer } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ERC20Mintable from '../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../src/artifacts/BetterDeposit.json';

const { deployContract } = waffle;

export const depositFixture = async (escrowData: escrowTestData) => {
  const {
    parties,
    firstUserDeposit,
    secondUserDeposit,
    mintAmount,
  } = escrowData;
  const [owner, userA, userB, adjudicator] = parties;

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
    firstUserDeposit,
    secondUserDeposit
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
    BetterDepositInterface,
  };
};

export type escrowTestData = {
  parties: Signer[];
  firstUserDeposit: number;
  secondUserDeposit: number;
  mintAmount: number;
};

export const multiEscrowFixture = async (
  firstEscrow: escrowTestData,
  secondEscrow: escrowTestData
) => {
  const {
    betterDeposit,
    erc20,
    escrowId: firstEscrowId,
    userAAddress,
    userBAddress,
    BetterDepositInterface,
  } = await depositFixture(firstEscrow);

  const { parties } = secondEscrow;
  const [owner, userC, userD, secondAdjudicator] = parties;
  const userCAddress = await userC.getAddress();
  const userDAddress = await userD.getAddress();
  const secondAdjudicatorAddress = await secondAdjudicator.getAddress();

  // mint second escrow parties tokens
  await erc20.mint(userCAddress, secondEscrow.mintAmount);
  await erc20.mint(userDAddress, secondEscrow.mintAmount);

  // create the second escrow
  const tx = await betterDeposit.create(
    userCAddress,
    userDAddress,
    secondAdjudicatorAddress,
    secondEscrow.firstUserDeposit,
    secondEscrow.secondUserDeposit
  );
  const receipt = await tx.wait();
  const secondEscrowId = BetterDepositInterface.parseLog(
    receipt.logs[receipt.logs.length - 1]
  ).args.escrowId;

  return {
    betterDeposit,
    erc20,
    firstEscrowId,
    secondEscrowId,
    userAAddress,
    userBAddress,
    userCAddress,
    userDAddress,
  };
};
