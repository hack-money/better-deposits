import { ethers } from '@nomiclabs/buidler';
import { expect, use } from 'chai';
import { deployContract, solidity, MockProvider } from 'ethereum-waffle';
import { Contract } from 'ethers';

import BetterDeposit from '../artifacts/BetterDeposit.json';

use(solidity);

describe('BetterDeposit', function () {
  const provider = new MockProvider({ gasLimit: 9999999 });
  const [wallet] = provider.getWallets();

  let betterDeposit!: Contract;

  beforeEach(async () => {
    betterDeposit = await deployContract(wallet, BetterDeposit);
  });
  describe('Initialisation', () => {
    it('Initialisation', async function () {
    });
  });
});
