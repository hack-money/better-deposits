import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';

import ERC20Mintable from '../../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../../src/artifacts/BetterDeposit.json';
import { EscrowState } from '../utils/escrowStates';

const { deployContract } = waffle;

use(solidity);

describe('Deposit', () => {
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
  });

  describe('Success states', async () => {
    it('should allow users to deposit funds and update balances', async () => {
      const initialContractBalance = await erc20.balanceOf(
        betterDeposit.address
      );
      expect(initialContractBalance).to.equal(0);

      // userA depositing funds
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
      await betterDeposit.connect(userA).deposit(userADeposit);

      // userB depositing funds
      await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
      await betterDeposit.connect(userB).deposit(userBDeposit);

      const postDepositContractBalance = await erc20.balanceOf(
        betterDeposit.address
      );
      expect(postDepositContractBalance).to.equal(
        parseInt(initialContractBalance) + userADeposit + userBDeposit
      );

      const postDepositUserABalance = await erc20.balanceOf(userAAddress);
      expect(postDepositUserABalance).to.equal(mintAmount - userADeposit);

      const postDepositUserBBalance = await erc20.balanceOf(userBAddress);
      expect(postDepositUserBBalance).to.equal(mintAmount - userBDeposit);

      const queriedUserADeposit = await betterDeposit.getUserDeposit(
        userAAddress
      );
      expect(queriedUserADeposit).to.equal(userADeposit);

      const queriedUserBDeposit = await betterDeposit.getUserDeposit(
        userBAddress
      );
      expect(queriedUserBDeposit).to.equal(userBDeposit);
    });

    it('should update escrow state on deposit', async () => {
      const initialEscrowState = await betterDeposit.escrowState();
      expect(initialEscrowState).to.equal(EscrowState.PRE_ACTIVE);
      // userA depositing funds
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
      await betterDeposit.connect(userA).deposit(userADeposit);

      // userB depositing funds
      await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
      await betterDeposit.connect(userB).deposit(userBDeposit);

      const finalEscrowState = await betterDeposit.escrowState();
      expect(finalEscrowState).to.equal(EscrowState.ACTIVE);
    });
  });

  describe('Failure states', async () => {
    beforeEach(async () => {
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    });

    it('should reject user not involved in agreement from depositing', async () => {
      await betterDeposit.connect(fakeUser);
      await expect(betterDeposit.deposit(userADeposit)).to.be.revertedWith(
        'BetterDeposit: NOT_VALID_USER'
      );
    });

    it('should reject incorrect deposit', async () => {
      const incorrectDeposit = 10;
      await expect(
        betterDeposit.connect(userA).deposit(incorrectDeposit)
      ).to.be.revertedWith('BetterDeposit: INCORRECT_DEPOSIT');
    });
  });
});
