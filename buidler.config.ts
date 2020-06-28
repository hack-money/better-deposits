import { ethers } from '@nomiclabs/buidler';
import { BuidlerConfig, task, usePlugin } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-waffle");

const config: BuidlerConfig = {
  solc: {
    version: "0.6.10",
  },
};

export default config;
