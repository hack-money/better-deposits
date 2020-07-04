import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';

import ERC20Mintable from '../src/artifacts/ERC20Mintable.json';
import Security from '../src/artifacts/Security.json';

const { deployContract } = waffle;

describe('Security', () => {
  let security!: Contract;
  let erc20!: Contract;
  let owner!: Signer;
  let attacker!: Signer;
  let ownerAddress!: string;

  const mintAmount = 60;

  beforeEach(async () => {
    [owner, attacker] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();

    erc20 = await deployContract(owner, ERC20Mintable, []);
    security = await deployContract(owner, Security, []);

    // mint ERC20 tokens to contract
    await erc20.mint(security.address, mintAmount);
  });

  describe('Success states', async () => {
    it('should pause contract', async () => {
      await security.connect(owner).emergencyStop();
      const pauseState = await security.paused();
      expect(pauseState).to.equal(true);
    });

    it('should unpause contract', async () => {
      await security.emergencyStop();
      await security.releaseEmergencyStop();
      const pauseState = await security.paused();
      expect(pauseState).to.equal(false);
    });

    it('should allow owner to withdraw all funds when paused', async () => {
      const initialContractBalance = await erc20.balanceOf(security.address);
      expect(initialContractBalance).to.equal(mintAmount);

      const initialOwnerBalance = await erc20.balanceOf(ownerAddress);
      expect(initialOwnerBalance).to.equal(0);

      // pause and withdraw
      await security.emergencyStop();
      await security.withdrawAll(erc20.address);

      const postWithdrawContractBalance = await erc20.balanceOf(
        security.address
      );
      expect(postWithdrawContractBalance).to.equal(0);

      const postWithdrawOwnerBalance = await erc20.balanceOf(ownerAddress);
      expect(postWithdrawOwnerBalance).to.equal(mintAmount);
    });
  });

  describe('Failure states', async () => {
    it('should reject non-owner from pausing contract', async () => {
      await expect(
        security.connect(attacker).emergencyStop()
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});
