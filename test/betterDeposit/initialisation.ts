import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { EscrowState } from '../utils/escrowStates';
import { depositFixture } from '../fixtures';

use(solidity);

describe('Initialisation', function () {
  let betterDeposit: Contract;
  let erc20: Contract;
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let adjudicator: Signer;

  let ownerAddress: string;
  let userAAddress: string;
  let userBAddress: string;
  let adjudicatorAddress: string;

  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  let escrowId: bigint;

  beforeEach(async () => {
    [owner, userA, userB, adjudicator] = await ethers.getSigners();
    ({
      erc20,
      betterDeposit,
      escrowId,
      ownerAddress,
      userAAddress,
      userBAddress,
      adjudicatorAddress,
    } = await depositFixture(
      [owner, userA, userB, adjudicator],
      userADeposit,
      userBDeposit,
      mintAmount
    ));
  });

  it('should initialise escrow state variables: users, third party, linkedToken, owner, escrowState', async function () {
    const linkedToken = await betterDeposit.linkedToken();
    const [
      recoveredUserA,
      recoveredUserB,
      recoveredAdjudicator,
      ,
      recoveredEscrowState,
    ] = await betterDeposit.getEscrowInfo(escrowId);

    const retrievedOwner = await betterDeposit.owner();
    const recoveredUserARequiredDeposit = await betterDeposit.getRequiredUserDeposit(
      userAAddress,
      escrowId
    );
    const recoveredUserBRequiredDeposit = await betterDeposit.getRequiredUserDeposit(
      userBAddress,
      escrowId
    );
    expect(retrievedOwner).to.equal(ownerAddress);

    expect(recoveredUserA).to.equal(userAAddress);
    expect(recoveredUserB).to.equal(userBAddress);
    expect(linkedToken).to.equal(erc20.address);
    expect(recoveredUserARequiredDeposit).to.equal(userADeposit);
    expect(recoveredUserBRequiredDeposit).to.equal(userBDeposit);
    expect(recoveredAdjudicator).to.equal(adjudicatorAddress);
    expect(recoveredEscrowState).to.equal(EscrowState.PRE_ACTIVE);
  });

  it('should get the total required deposit for the agreement', async () => {
    const totalRequiredDeposit = await betterDeposit.getTotalRequiredDeposit(
      escrowId
    );
    expect(totalRequiredDeposit).to.equal(userADeposit + userBDeposit);
  });
});
