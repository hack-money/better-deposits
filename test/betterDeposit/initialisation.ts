import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';

import ERC20Mintable from '../../src/artifacts/ERC20Mintable.json';
import BetterDeposit from '../../src/artifacts/BetterDeposit.json';
import { solidity } from 'ethereum-waffle';

const { deployContract } = waffle;

use(solidity);

describe('Initialisation', function () {
  let betterDeposit!: Contract;
  let erc20!: Contract;
  let owner!: Signer;
  let userA!: Signer;
  let userB!: Signer;
  let userAAddress!: string;
  let userBAddress!: string;

  const mintAmount = 100;
  const userADeposit = 20;
  const userBDeposit = 50;

  beforeEach(async () => {
    [owner, userA, userB] = await ethers.getSigners();
    userAAddress = await userA.getAddress();
    userBAddress = await userB.getAddress();

    erc20 = await deployContract(owner, ERC20Mintable, []);

    betterDeposit = await deployContract(owner, BetterDeposit, [
      erc20.address,
      await userA.getAddress(),
      userB.getAddress(),
      userADeposit,
      userBDeposit,
    ]);
    await betterDeposit.deployed();

    // mint users some tokens
    await erc20.mint(userAAddress, mintAmount);
    await erc20.mint(userBAddress, mintAmount);
  });

  it('should initialise escrow state variables: users, third party, linkedToken, owner, escrowState', async function () {
    const linkedToken = await betterDeposit.linkedToken();
    const retrievedUserA = await betterDeposit.userA();
    const retrievedUserB = await betterDeposit.userB();
    const retrievedOwner = await betterDeposit.owner();
    const retrievedUserARequiredDeposit = await betterDeposit.getRequiredUserDeposit(
      userAAddress
    );
    const retrievedUserBRequiredDeposit = await betterDeposit.getRequiredUserDeposit(
      userBAddress
    );
    const escrowState = await betterDeposit.escrowState();

    const ownerAddress = await owner.getAddress();
    expect(retrievedOwner).to.equal(ownerAddress);
    expect(retrievedUserA).to.equal(userAAddress);
    expect(retrievedUserB).to.equal(userBAddress);
    expect(linkedToken).to.equal(erc20.address);
    expect(retrievedUserARequiredDeposit).to.equal(userADeposit);
    expect(retrievedUserBRequiredDeposit).to.equal(userBDeposit);
    expect(escrowState).to.equal(0);
  });

  it('should get the total required deposit for the agreement', async () => {
    const totalRequiredDeposit = await betterDeposit.getTotalRequiredDeposit();
    expect(totalRequiredDeposit).to.equal(userADeposit + userBDeposit);
  });
});
