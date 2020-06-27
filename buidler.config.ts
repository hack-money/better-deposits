import { ethers } from '@nomiclabs/buidler';
import { BuidlerConfig, task, usePlugin } from "@nomiclabs/buidler/config";


usePlugin("@nomiclabs/buidler-waffle");

const config: BuidlerConfig = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: "0.6.8",
  },
};

export default config;
