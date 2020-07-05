import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';

import ReleaseManager from '../src/artifacts/ReleaseManagerTest.json';

const { deployContract } = waffle;
use(solidity);

describe('Release manager', () => {
  let releaseManager!: Contract;
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

    releaseManager = await deployContract(owner, ReleaseManager, []);
    await releaseManager.deployed();
  });

  describe('Success states', async () => {
    it('should submit user approval for deposit to be released', async () => {
      await releaseManager.connect(userA).approveDepositRelease();

      const approvalStatus = await releaseManager.getUserDepositReleaseApproval(
        userAAddress
      );
      expect(approvalStatus).to.equal(true);
    });

    it('should return false for a user who has not approved deposit release', async () => {
      const approvalStatus = await releaseManager.getUserDepositReleaseApproval(
        userAAddress
      );
      expect(approvalStatus).to.equal(false);
    });

    it('should approve deposit release if all users have individually approved', async () => {
      await releaseManager.connect(userA).approveDepositRelease();
      await releaseManager.connect(userB).approveDepositRelease();

      const depositReleaseApproval = await releaseManager.isDepositReleaseApproved(
        allUsers
      );
      expect(depositReleaseApproval).to.equal(true);
    });
  });

  describe('Failure states', async () => {
    it('should reject deposit release if not all users have individually approved', async () => {
      await releaseManager.connect(userA).approveDepositRelease();
      // userB not appproving

      const depositReleaseApproval = await releaseManager.isDepositReleaseApproved(
        allUsers
      );
      expect(depositReleaseApproval).to.equal(false);
    });
  });
});
