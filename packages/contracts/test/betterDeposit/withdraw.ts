import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { EscrowState } from '../utils/escrowStates';
import { depositFixture, escrowTestData } from '../fixtures';

use(solidity);

describe('Withdraw', () => {
  let betterDeposit: Contract;
  let erc20: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let fakeUser: Signer;
  let adjudicator: Signer;

  let userAAddress: string;
  let userBAddress: string;
  let ownerAddress: string;
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
      ownerAddress,
      userAAddress,
      userBAddress,
      adjudicatorAddress,
    } = await depositFixture(escrowData));

    // make the deposits to start the agreement
    await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    await betterDeposit.connect(userA).deposit(userADeposit, escrowId);

    await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
    await betterDeposit.connect(userB).deposit(userBDeposit, escrowId);
  });

  describe('Success states', async () => {
    beforeEach(async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      await betterDeposit.connect(userB).approveDepositRelease(escrowId);
      await betterDeposit.settleAgreement(escrowId);
    });

    it('should settle agreement if all release approvals given', async () => {
      const escrowState = await betterDeposit.getEscrowState(escrowId);
      expect(escrowState).to.equal(EscrowState.SETTLED);
    });

    it('should allow users to withdraw once settled', async () => {
      await betterDeposit.connect(userA).withdraw(escrowId);
      await betterDeposit.connect(userB).withdraw(escrowId);

      const contractBalance = await erc20.balanceOf(betterDeposit.address);
      expect(contractBalance).to.equal(0);

      const userABalance = await erc20.balanceOf(userAAddress);
      expect(userABalance).to.equal(mintAmount);

      const userBBalance = await erc20.balanceOf(userBAddress);
      expect(userBBalance).to.equal(mintAmount);
    });

    it('should mark escrowState as complete once all withdrawn', async () => {
      await betterDeposit.connect(userA).withdraw(escrowId);
      await betterDeposit.connect(userB).withdraw(escrowId);

      const escrowState = await betterDeposit.getEscrowState(escrowId);
      expect(escrowState).to.equal(EscrowState.COMPLETE);
    });

    it('should update users escrowed deposits once withdrawn', async () => {
      await betterDeposit.connect(userA).withdraw(escrowId);
      await betterDeposit.connect(userB).withdraw(escrowId);

      const userAEscrowedDeposit = await betterDeposit.getUserDeposit(
        userAAddress,
        escrowId
      );
      const userBEscrowedDeposit = await betterDeposit.getUserDeposit(
        userBAddress,
        escrowId
      );
      const totalHeldDeposit = await betterDeposit.getTotalDeposit(escrowId);

      expect(userAEscrowedDeposit).to.equal(0);
      expect(userBEscrowedDeposit).to.equal(0);
      expect(totalHeldDeposit).to.equal(0);
    });
  });

  describe('Failure states', async () => {
    it('should reject settle agreement if not all release approvals given', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      await expect(betterDeposit.settleAgreement(escrowId)).to.be.revertedWith(
        'BetterDeposit: DEPOSIT_RELEASE_NOT_APPROVED'
      );
    });

    it('should reject withdraw attempt from user not part of the agreement', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      await betterDeposit.connect(userB).approveDepositRelease(escrowId);
      await betterDeposit.settleAgreement(escrowId);

      // fakeUser attempts to withdraw
      await expect(
        betterDeposit.connect(fakeUser).withdraw()
      ).to.be.revertedWith('BetterDeposit: NOT_VALID_USER');
    });

    it('should not mark escrowState as complete until all withdrawn', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      await betterDeposit.connect(userB).approveDepositRelease(escrowId);
      await betterDeposit.settleAgreement(escrowId);
      await betterDeposit.connect(userA).withdraw(escrowId);
      // userB not withdrawn yet

      const escrowState = await betterDeposit.getEscrowState(escrowId);
      expect(escrowState).to.not.equal(EscrowState.COMPLETE);
    });
  });
});
