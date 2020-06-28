import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';

import ERC20Mintable from '../../artifacts/ERC20Mintable.json';
import BetterDeposit from '../../artifacts/BetterDeposit.json';

const { deployContract } = waffle;

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

  it('should initialise escrow state variables: users, third party, linkedToken, owner', async function () {
    const linkedToken = await betterDeposit.linkedToken();
    const retrievedUserA = await betterDeposit.userA();
    const retrievedUserB = await betterDeposit.userB();
    const retrievedOwner = await betterDeposit.owner();
    const retrievedUserARequiredDeposit = await betterDeposit.getRequiredDeposit(
      userAAddress
    );
    const retrievedUserBRequiredDeposit = await betterDeposit.getRequiredDeposit(
      userBAddress
    );

    const ownerAddress = await owner.getAddress();
    expect(retrievedOwner).to.equal(ownerAddress);
    expect(retrievedUserA).to.equal(userAAddress);
    expect(retrievedUserB).to.equal(userBAddress);
    expect(linkedToken).to.equal(erc20.address);
    expect(retrievedUserARequiredDeposit).to.equal(userADeposit);
    expect(retrievedUserBRequiredDeposit).to.equal(userBDeposit);
  });
});
