import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';

import ERC20Mintable from '../../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../../src/artifacts/BetterDeposit.json';
import { solidity } from 'ethereum-waffle';
import { EscrowState } from '../utils/escrowStates';

const { deployContract } = waffle;
use(solidity);

describe.only('Withdraw', () => {
  let betterDeposit!: Contract;
  let erc20!: Contract;
  let owner!: Signer;
  let userA!: Signer;
  let userB!: Signer;
  let fakeUser!: Signer;
  let userAAddress!: string;
  let userBAddress!: string;

  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  beforeEach(async () => {
    [owner, userA, userB, fakeUser] = await ethers.getSigners();
    userAAddress = await userA.getAddress();
    userBAddress = await userB.getAddress();

    erc20 = await deployContract(owner, ERC20Mintable, []);

    betterDeposit = await deployContract(owner, BetterDeposit, [
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

    // make deposit and start agreement
    await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    await betterDeposit.connect(userA).deposit(userADeposit);

    await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
    await betterDeposit.connect(userB).deposit(userBDeposit);
  });

  describe('Success states', async () => {
    beforeEach(async () => {
      await betterDeposit.connect(userA).approveDepositRelease();
      await betterDeposit.connect(userB).approveDepositRelease();
      await betterDeposit.settleAgreement();
    });

    it('should settle agreement if all release approvals given', async () => {
      const escrowState = await betterDeposit.escrowState();
      expect(escrowState).to.equal(EscrowState.SETTLED);
    });

    it('should allow users to withdraw once settled', async () => {
      await betterDeposit.connect(userA).withdraw();
      await betterDeposit.connect(userB).withdraw();

      const contractBalance = await erc20.balanceOf(betterDeposit.address);
      expect(contractBalance).to.equal(0);

      const userABalance = await erc20.balanceOf(userAAddress);
      expect(userABalance).to.equal(mintAmount);

      const userBBalance = await erc20.balanceOf(userBAddress);
      expect(userBBalance).to.equal(mintAmount);
    });

    it('should mark escrowState as complete once all withdrawn', async () => {
      await betterDeposit.connect(userA).withdraw();
      await betterDeposit.connect(userB).withdraw();

      const escrowState = await betterDeposit.escrowState();
      expect(escrowState).to.equal(EscrowState.COMPLETE);
    });

    it('should update users escrowed deposits once withdrawn', async () => {
      await betterDeposit.connect(userA).withdraw();
      await betterDeposit.connect(userB).withdraw();

      const userAEscrowedDeposit = await betterDeposit.getUserDeposit(
        userAAddress
      );
      const userBEscrowedDeposit = await betterDeposit.getUserDeposit(
        userBAddress
      );
      const totalHeldDeposit = await betterDeposit.getTotalDeposit();

      expect(userAEscrowedDeposit).to.equal(0);
      expect(userBEscrowedDeposit).to.equal(0);
      expect(totalHeldDeposit).to.equal(0);
    });
  });

  describe('Failure states', async () => {
    it('should reject settle agreement if not all release approvals given', async () => {
      await betterDeposit.connect(userA).approveDepositRelease();
      await expect(betterDeposit.settleAgreement()).to.be.revertedWith(
        'BetterDeposit: DEPOSIT_RELEASE_NOT_APPROVED'
      );
    });

    it('should reject withdraw attempt from user not part of the agreement', async () => {
      await betterDeposit.connect(userA).approveDepositRelease();
      await betterDeposit.connect(userB).approveDepositRelease();
      await betterDeposit.settleAgreement();

      // fakeUser attempts to withdraw
      await expect(
        betterDeposit.connect(fakeUser).withdraw()
      ).to.be.revertedWith('BetterDeposit: NOT_VALID_USER');
    });

    it('should not mark escrowState as complete until all withdrawn', async () => {
      await betterDeposit.connect(userA).approveDepositRelease();
      await betterDeposit.connect(userB).approveDepositRelease();
      await betterDeposit.settleAgreement();
      await betterDeposit.connect(userA).withdraw();
      // userB not withdrawn yet

      const escrowState = await betterDeposit.escrowState();
      expect(escrowState).to.not.equal(EscrowState.COMPLETE);
    });
  });
});
