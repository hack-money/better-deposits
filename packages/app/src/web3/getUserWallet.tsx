import React, { useState } from 'react';
import Onboard from 'bnc-onboard';
import dotenv from 'dotenv';
import {
  Initialization,
  WalletInitOptions,
  WalletCheckInit,
  Wallet,
} from 'bnc-onboard/dist/src/interfaces';
dotenv.config();

export function getUserWallet() {
  const walletChecks: Array<WalletCheckInit> = [
    { checkName: 'connect' },
    { checkName: 'network' },
  ];

  const wallets: Array<WalletInitOptions> = [
    { walletName: 'metamask', preferred: true },
  ];

  const config: Initialization = {
    dappId: process.env.ONBOARD_API_KEY,
    networkId: 3, // ropsten
    walletCheck: walletChecks,
    walletSelect: {
      heading: 'Connect your wallet',
      description:
        'To use BetterDeposits, you need an Ethereum wallet. We support:',
      wallets,
    },
    hideBranding: true,
  };

  return Onboard(config);
}
