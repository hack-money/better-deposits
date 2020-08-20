import Onboard from "bnc-onboard";
import dotenv from "dotenv";
import {
  Initialization,
  WalletInitOptions,
  WalletCheckInit,
  Wallet,
} from "bnc-onboard/dist/src/interfaces";
import { Web3Provider } from "@ethersproject/providers";

dotenv.config();

export async function getOnboard(): Promise<Web3Provider> {
  let provider: any;

  const walletChecks: Array<WalletCheckInit> = [
    { checkName: "connect" },
    { checkName: "network" },
  ];

  const wallets: Array<WalletInitOptions> = [
    { walletName: "metamask", preferred: true },
  ];

  const config: Initialization = {
    dappId: process.env.ONBOARD_API_KEY,
    networkId: 31337, // networkId of buidlerEVM test network
    walletCheck: walletChecks,
    walletSelect: {
      heading: "Connect your wallet",
      description:
        "To use BetterDeposits, you need an Ethereum wallet. We support:",
      wallets,
    },
    subscriptions: {
      wallet: wallet => {
        provider = new Web3Provider(wallet.provider);
        console.log(`${wallet.name} connected!`);
      },
    },
    hideBranding: true,
  };

  const onboard = Onboard(config);
  await onboard.walletSelect();
  await onboard.walletCheck();

  return provider;
}
