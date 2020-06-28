import { ethers, waffle } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { Contract, Signer } from 'ethers';

import ERC20Mintable from '../../artifacts/ERC20Mintable.json';
import BetterDeposit from '../../artifacts/BetterDeposit.json';

const { deployContract } = waffle;

describe('Deposit', () => {
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

  it('should allow users to deposit funds', async () => {
    const initialContractBalance = await erc20.balanceOf(betterDeposit.address);
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
});
