import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';

import EscrowManagement from '../src/artifacts/EscrowManagement.json';

const { deployContract } = waffle;
use(solidity);

describe('Escrow management', () => {
  let escrowManagement!: Contract;
  let owner!: Signer;
  let userA!: Signer;
  let userB!: Signer;
  let userAAddress!: string;
  let userBAddress!: string;
  let allUsers!: string[];

  beforeEach(async () => {
    [owner, userA, userB] = await ethers.getSigners();
    userAAddress = await userA.getAddress();
    userBAddress = await userB.getAddress();
    allUsers = [userAAddress, userBAddress];

    escrowManagement = await deployContract(owner, EscrowManagement, []);
    await escrowManagement.deployed();
  });

  describe('Success states', async () => {
    it('should submit user approval for deposit to be released', async () => {
      await escrowManagement.connect(userA).approveDepositRelease();

      const approvalStatus = await escrowManagement.getUserDepositReleaseApproval(
        userAAddress
      );
      expect(approvalStatus).to.equal(true);
    });

    it('should return false for a user who has not approved deposit release', async () => {
      const approvalStatus = await escrowManagement.getUserDepositReleaseApproval(
        userAAddress
      );
      expect(approvalStatus).to.equal(false);
    });

    it('should approve deposit release if all users have individually approved', async () => {
      await escrowManagement.connect(userA).approveDepositRelease();
      await escrowManagement.connect(userB).approveDepositRelease();

      const depositReleaseApproval = await escrowManagement.isDepositReleaseApproved(
        allUsers
      );
      expect(depositReleaseApproval).to.equal(true);
    });
  });

  describe('Failure states', async () => {
    it('should reject deposit release if not all users have individually approved', async () => {
      await escrowManagement.connect(userA).approveDepositRelease();
      // userB not appproving

      const depositReleaseApproval = await escrowManagement.isDepositReleaseApproved(
        allUsers
      );
      expect(depositReleaseApproval).to.equal(false);
    });
  });
});
