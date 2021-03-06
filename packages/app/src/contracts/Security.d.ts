/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides
} from "@ethersproject/contracts";
import {BytesLike} from "@ethersproject/bytes";
import {Listener, Provider} from "@ethersproject/providers";
import {FunctionFragment, EventFragment, Result} from "@ethersproject/abi";

interface SecurityInterface extends ethers.utils.Interface {
  functions: {
    "emergencyStop()": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "releaseEmergencyStop()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawAll(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "emergencyStop",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "releaseEmergencyStop",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "withdrawAll", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "emergencyStop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "releaseEmergencyStop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
    "WithdrawAll(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawAll"): EventFragment;
}

export class Security extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SecurityInterface;

  functions: {
    emergencyStop(overrides?: Overrides): Promise<ContractTransaction>;

    "emergencyStop()"(overrides?: Overrides): Promise<ContractTransaction>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    paused(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "paused()"(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    releaseEmergencyStop(overrides?: Overrides): Promise<ContractTransaction>;

    "releaseEmergencyStop()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdrawAll(
      linkedToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdrawAll(address)"(
      linkedToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  emergencyStop(overrides?: Overrides): Promise<ContractTransaction>;

  "emergencyStop()"(overrides?: Overrides): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  "paused()"(overrides?: CallOverrides): Promise<boolean>;

  releaseEmergencyStop(overrides?: Overrides): Promise<ContractTransaction>;

  "releaseEmergencyStop()"(overrides?: Overrides): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdrawAll(
    linkedToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdrawAll(address)"(
    linkedToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    emergencyStop(overrides?: CallOverrides): Promise<void>;

    "emergencyStop()"(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    "paused()"(overrides?: CallOverrides): Promise<boolean>;

    releaseEmergencyStop(overrides?: CallOverrides): Promise<void>;

    "releaseEmergencyStop()"(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawAll(linkedToken: string, overrides?: CallOverrides): Promise<void>;

    "withdrawAll(address)"(
      linkedToken: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Paused(account: null): EventFilter;

    Unpaused(account: null): EventFilter;

    WithdrawAll(
      from: string | null,
      to: string | null,
      assetAddress: string | null,
      amount: null
    ): EventFilter;
  };

  estimateGas: {
    emergencyStop(overrides?: Overrides): Promise<BigNumber>;

    "emergencyStop()"(overrides?: Overrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    "paused()"(overrides?: CallOverrides): Promise<BigNumber>;

    releaseEmergencyStop(overrides?: Overrides): Promise<BigNumber>;

    "releaseEmergencyStop()"(overrides?: Overrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    withdrawAll(linkedToken: string, overrides?: Overrides): Promise<BigNumber>;

    "withdrawAll(address)"(
      linkedToken: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    emergencyStop(overrides?: Overrides): Promise<PopulatedTransaction>;

    "emergencyStop()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "paused()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releaseEmergencyStop(overrides?: Overrides): Promise<PopulatedTransaction>;

    "releaseEmergencyStop()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      linkedToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdrawAll(address)"(
      linkedToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
