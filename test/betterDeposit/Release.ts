import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { depositFixture } from '../fixtures';

use(solidity);

describe('Release manager', () => {
  let betterDeposit: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let adjudicator: Signer;
  let userAAddress: string;
  let userBAddress: string;
  let allUsers: string[];
  let escrowId: bigint;

  beforeEach(async () => {
    [owner, userA, userB, adjudicator] = await ethers.getSigners();
    const userADeposit = 100;
    const userBDeposit = 50;
    const mintAmount = 200;

    ({
      betterDeposit,
      escrowId,
      userAAddress,
      userBAddress,
    } = await depositFixture(
      [owner, userA, userB, adjudicator],
      userADeposit,
      userBDeposit,
      mintAmount
    ));

    allUsers = [userAAddress, userBAddress];
  });

  describe('Success states', async () => {
    it('should submit user approval for deposit to be released', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      const approvalStatus = await betterDeposit.getUserDepositReleaseApproval(
        userAAddress,
        escrowId
      );
      expect(approvalStatus).to.equal(true);
    });

    it('should return false for a user who has not approved deposit release', async () => {
      const approvalStatus = await betterDeposit.getUserDepositReleaseApproval(
        userAAddress,
        escrowId
      );
      expect(approvalStatus).to.equal(false);
    });

    it('should approve deposit release if all users have individually approved', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      await betterDeposit.connect(userB).approveDepositRelease(escrowId);

      const depositReleaseApproval = await betterDeposit.isDepositReleaseApproved(
        allUsers,
        escrowId
      );
      expect(depositReleaseApproval).to.equal(true);
    });
  });

  describe('Failure states', async () => {
    it('should reject deposit release if not all users have individually approved', async () => {
      await betterDeposit.connect(userA).approveDepositRelease(escrowId);
      // userB not appproving

      const depositReleaseApproval = await betterDeposit.isDepositReleaseApproved(
        allUsers,
        escrowId
      );
      expect(depositReleaseApproval).to.equal(false);
    });
  });
});
