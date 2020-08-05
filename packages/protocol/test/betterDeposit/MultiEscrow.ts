import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { EscrowState } from '../utils/escrowStates';
import { multiEscrowFixture, escrowTestData } from '../fixtures';

use(solidity);

describe('Multi escrow', () => {
  let betterDeposit: Contract;
  let erc20: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let userC: Signer;
  let userD: Signer;
  let firstAdjudicator: Signer;
  let secondAdjudicator: Signer;
  let firstEscrowId: number;
  let secondEscrowId: number;
  let firstEscrow: escrowTestData;
  let secondEscrow: escrowTestData;

  beforeEach(async () => {
    [
      owner,
      userA,
      userB,
      firstAdjudicator,
      userC,
      userD,
      secondAdjudicator,
    ] = await ethers.getSigners();

    firstEscrow = {
      parties: [owner, userA, userB, firstAdjudicator],
      firstUserDeposit: 20,
      secondUserDeposit: 50,
      mintAmount: 100,
    };

    secondEscrow = {
      parties: [owner, userC, userD, secondAdjudicator],
      firstUserDeposit: 40,
      secondUserDeposit: 60,
      mintAmount: 100,
    };

    ({
      erc20,
      betterDeposit,
      firstEscrowId,
      secondEscrowId,
    } = await multiEscrowFixture(firstEscrow, secondEscrow));
  });
  it('should deposit and start both escrow arrangements', async () => {
    expect(firstEscrowId).to.equal(0);
    expect(secondEscrowId).to.equal(1);
    console.log('created fixture');
    const firstInitialEscrowState = await betterDeposit.getEscrowState(
      firstEscrowId
    );
    expect(firstInitialEscrowState).to.equal(EscrowState.PRE_ACTIVE);

    const secondInitialEscrowState = await betterDeposit.getEscrowState(
      secondEscrowId
    );
    expect(secondInitialEscrowState).to.equal(EscrowState.PRE_ACTIVE);

    // all users approve
    await erc20
      .connect(userA)
      .approve(betterDeposit.address, firstEscrow.firstUserDeposit);
    await erc20
      .connect(userB)
      .approve(betterDeposit.address, firstEscrow.secondUserDeposit);
    await erc20
      .connect(userC)
      .approve(betterDeposit.address, secondEscrow.firstUserDeposit);
    await erc20
      .connect(userD)
      .approve(betterDeposit.address, secondEscrow.secondUserDeposit);

    // all users deposit
    await betterDeposit
      .connect(userA)
      .deposit(firstEscrow.firstUserDeposit, firstEscrowId);
    await betterDeposit
      .connect(userB)
      .deposit(firstEscrow.secondUserDeposit, firstEscrowId);

    await betterDeposit
      .connect(userC)
      .deposit(secondEscrow.firstUserDeposit, secondEscrowId);
    await betterDeposit
      .connect(userD)
      .deposit(secondEscrow.secondUserDeposit, secondEscrowId);

    const firstEscrowStateFinal = await betterDeposit.getEscrowState(
      firstEscrowId
    );
    expect(firstEscrowStateFinal).to.equal(EscrowState.ACTIVE);

    const secondEscrowStateFinal = await betterDeposit.getEscrowState(
      secondEscrowId
    );
    expect(secondEscrowStateFinal).to.equal(EscrowState.ACTIVE);
  });
});
