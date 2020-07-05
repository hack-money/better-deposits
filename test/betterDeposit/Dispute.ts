import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';

import ERC20Mintable from '../../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../../src/artifacts/BetterDeposit.json';
import { EscrowState } from '../utils/escrowStates';

const { deployContract } = waffle;

use(solidity);

describe('Dispute', () => {
  let betterDeposit: Contract;
  let erc20: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let adjudicator: Signer;

  let userAAddress: string;
  let userBAddress: string;
  let adjudicatorAddress: string;

  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  beforeEach(async () => {
    [owner, userA, userB, adjudicator] = await ethers.getSigners();
    userAAddress = await userA.getAddress();
    userBAddress = await userB.getAddress();
    adjudicatorAddress = await adjudicator.getAddress();

    erc20 = await deployContract(owner, ERC20Mintable, []);
    betterDeposit = await deployContract(owner, BetterDeposit, [
      erc20.address,
      userAAddress,
      userBAddress,
      userADeposit,
      userBDeposit,
      adjudicatorAddress,
    ]);
    await betterDeposit.deployed();

    // mint users some tokens
    await erc20.mint(userAAddress, mintAmount);
    await erc20.mint(userBAddress, mintAmount);

    // make deposit and start agreement
    await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    await betterDeposit.connect(userA).deposit(userADeposit);

    await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
    await betterDeposit.connect(userB).deposit(userBDeposit);
  });

  describe('Success states', async () => {
    it('should activate dispute and transfer funds to adjudicator', async () => {
      await betterDeposit.connect(userA).dispute();

      const contractBalance = await erc20.balanceOf(betterDeposit.address);
      expect(contractBalance).to.equal(0);

      const userABalance = await erc20.balanceOf(userAAddress);
      expect(userABalance).to.equal(mintAmount - userADeposit);

      const userBBalance = await erc20.balanceOf(userBAddress);
      expect(userBBalance).to.equal(mintAmount - userBDeposit);

      const adjudicatorBalance = await erc20.balanceOf(adjudicatorAddress);
      expect(adjudicatorBalance).to.equal(userADeposit + userBDeposit);

      const totalHeldDeposit = await betterDeposit.getTotalDeposit();
      expect(totalHeldDeposit).to.equal(0);

      const userAHeldDeposit = await betterDeposit.getUserDeposit(userAAddress);
      expect(userAHeldDeposit).to.equal(0);

      const userBHeldDeposit = await betterDeposit.getUserDeposit(userBAddress);
      expect(userBHeldDeposit).to.equal(0);
    });

    it('should set escrowState to DISPUTE', async () => {
      await betterDeposit.connect(userA).dispute();
      const escrowState = await betterDeposit.escrowState();
      expect(escrowState).to.equal(EscrowState.DISPUTE);
    });
  });

  describe('Failure states', async () => {
    it('should reject dispute when state not xx', async () => {
      await betterDeposit.connect(userA).dispute();
    });
  });
});
