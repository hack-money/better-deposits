import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { solidity } from 'ethereum-waffle';
import { EscrowState } from '../utils/escrowStates';
import { depositFixture, escrowTestData } from '../fixtures';

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

  let escrowId: bigint;

  beforeEach(async () => {
    [owner, userA, userB, adjudicator] = await ethers.getSigners();
    const escrowData: escrowTestData = {
      parties: [owner, userA, userB, adjudicator],
      firstUserDeposit: userADeposit,
      secondUserDeposit: userBDeposit,
      mintAmount,
    };
    ({
      erc20,
      betterDeposit,
      escrowId,
      userAAddress,
      userBAddress,
      adjudicatorAddress,
    } = await depositFixture(escrowData));

    // make deposit and start agreement
    await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    await betterDeposit.connect(userA).deposit(userADeposit, escrowId);

    await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
    await betterDeposit.connect(userB).deposit(userBDeposit, escrowId);
  });

  describe('Success states', async () => {
    it('should activate dispute and transfer funds to adjudicator', async () => {
      await betterDeposit.connect(userA).dispute(escrowId);

      const contractBalance = await erc20.balanceOf(betterDeposit.address);
      expect(contractBalance).to.equal(0);

      const userABalance = await erc20.balanceOf(userAAddress);
      expect(userABalance).to.equal(mintAmount - userADeposit);

      const userBBalance = await erc20.balanceOf(userBAddress);
      expect(userBBalance).to.equal(mintAmount - userBDeposit);

      const adjudicatorBalance = await erc20.balanceOf(adjudicatorAddress);
      expect(adjudicatorBalance).to.equal(userADeposit + userBDeposit);

      const totalHeldDeposit = await betterDeposit.getTotalDeposit(escrowId);
      expect(totalHeldDeposit).to.equal(0);

      const userAHeldDeposit = await betterDeposit.getUserDeposit(
        userAAddress,
        escrowId
      );
      expect(userAHeldDeposit).to.equal(0);

      const userBHeldDeposit = await betterDeposit.getUserDeposit(
        userBAddress,
        escrowId
      );
      expect(userBHeldDeposit).to.equal(0);
    });

    it('should set escrowState to DISPUTE', async () => {
      await betterDeposit.connect(userA).dispute(escrowId);
      const escrowState = await betterDeposit.getEscrowState(escrowId);
      expect(escrowState).to.equal(EscrowState.DISPUTE);
    });
  });

  describe('Failure states', async () => {
    it('should reject dispute when state not xx', async () => {
      await betterDeposit.connect(userA).dispute(escrowId);
    });
  });
});
