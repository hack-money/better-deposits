import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abi } from "../abis/BetterDeposit.json";

export function getEscrowContract(provider: Web3Provider, address: string) {
  const contract = new Contract(address, abi, provider.getSigner());
  return contract;
}
