import Onboard from 'bnc-onboard';
import dotenv from 'dotenv';
import {
  Initialization,
  WalletInitOptions,
  WalletCheckInit,
} from 'bnc-onboard/dist/src/interfaces';
import { Web3Provider } from '@ethersproject/providers';
dotenv.config();

export function getOnboard() {
  let provider: any;

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
    subscriptions: {
      wallet: (wallet) => {
        provider = new Web3Provider(wallet.provider);
        console.log(`${wallet.name} connected!`);
      },
    },
    hideBranding: true,
  };

  return { onboard: Onboard(config), provider };
}
