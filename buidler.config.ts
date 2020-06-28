import { ethers } from '@nomiclabs/buidler';
import { BuidlerConfig, task, usePlugin } from '@nomiclabs/buidler/config';

usePlugin('@nomiclabs/buidler-waffle');

const config: BuidlerConfig = {
  solc: {
    version: '0.6.10',
  },
  networks:{
    buidlerevm: {
        blockGasLimit: 10000000,
        gas: 8000000,
        hardfork: 'istanbul',
      },
  }
};

export default config;
