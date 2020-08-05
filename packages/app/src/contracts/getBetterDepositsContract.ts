import { Web3Provider } from '@ethersproject/providers';
import { abi } from '../abis/BetterDeposit.json';
import { Contract } from 'ethers';

export function getBetterDepositsContract(
  provider: Web3Provider,
  address: string
) {
  const contract = new Contract(address, abi, provider);
  return contract;
}
