import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';

import { EscrowState } from '../utils/escrowStates';
import { depositFixture } from '../fixtures';

use(solidity);

describe('Deposit', () => {
  let betterDeposit: Contract;
  let erc20: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let fakeUser: Signer;
  let adjudicator: Signer;

  let userAAddress: string;
  let userBAddress: string;

  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  let escrowId: bigint;

  beforeEach(async () => {
    [owner, userA, userB, fakeUser, adjudicator] = await ethers.getSigners();
    ({
      erc20,
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
  });

  describe('Success states', async () => {
    it('should allow users to deposit funds and update balances', async () => {
      const initialContractBalance = await erc20.balanceOf(
        betterDeposit.address
      );
      expect(initialContractBalance).to.equal(0);

      // userA depositing funds
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
      await betterDeposit.connect(userA).deposit(userADeposit, escrowId);

      // userB depositing funds
      await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
      await betterDeposit.connect(userB).deposit(userBDeposit, escrowId);

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
        userAAddress,
        escrowId
      );
      expect(queriedUserADeposit).to.equal(userADeposit);

      const queriedUserBDeposit = await betterDeposit.getUserDeposit(
        userBAddress,
        escrowId
      );
      expect(queriedUserBDeposit).to.equal(userBDeposit);
    });

    it('should update escrow state on deposit', async () => {
      const initialEscrowState = await betterDeposit.getEscrowState(escrowId);
      expect(initialEscrowState).to.equal(EscrowState.PRE_ACTIVE);

      // userA depositing funds
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
      await betterDeposit.connect(userA).deposit(userADeposit, escrowId);

      // userB depositing funds
      await erc20.connect(userB).approve(betterDeposit.address, userBDeposit);
      await betterDeposit.connect(userB).deposit(userBDeposit, escrowId);

      const finalEscrowState = await betterDeposit.getEscrowState(escrowId);
      expect(finalEscrowState).to.equal(EscrowState.ACTIVE);
    });
  });

  describe('Failure states', async () => {
    beforeEach(async () => {
      await erc20.connect(userA).approve(betterDeposit.address, userADeposit);
    });

    it('should reject user not involved in agreement from depositing', async () => {
      await betterDeposit.connect(fakeUser);
      await expect(
        betterDeposit.deposit(userADeposit, escrowId)
      ).to.be.revertedWith('BetterDeposit: NOT_VALID_USER');
    });

    it('should reject incorrect deposit', async () => {
      const incorrectDeposit = 10;
      await expect(
        betterDeposit.connect(userA).deposit(incorrectDeposit, escrowId)
      ).to.be.revertedWith('BetterDeposit: INCORRECT_DEPOSIT');
    });
  });
});
