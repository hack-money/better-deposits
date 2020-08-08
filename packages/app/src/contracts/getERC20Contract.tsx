import { Web3Provider } from '@ethersproject/providers';
import { abi } from '../abis/ERC20.json';
import { Contract } from 'ethers';

export function getERC20Contract(provider: Web3Provider, address: string) {
  const contract = new Contract(address, abi, provider);
  return contract;
}
