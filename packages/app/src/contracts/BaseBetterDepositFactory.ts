/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { BaseBetterDeposit } from "./BaseBetterDeposit";

export class BaseBetterDepositFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _linkedToken: string,
    overrides?: Overrides,
  ): Promise<BaseBetterDeposit> {
    return super.deploy(_linkedToken, overrides || {}) as Promise<
      BaseBetterDeposit
    >;
  }

  getDeployTransaction(
    _linkedToken: string,
    overrides?: Overrides,
  ): TransactionRequest {
    return super.getDeployTransaction(_linkedToken, overrides || {});
  }

  attach(address: string): BaseBetterDeposit {
    return super.attach(address) as BaseBetterDeposit;
  }

  connect(signer: Signer): BaseBetterDepositFactory {
    return super.connect(signer) as BaseBetterDepositFactory;
  }

  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BaseBetterDeposit {
    return new Contract(address, _abi, signerOrProvider) as BaseBetterDeposit;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_linkedToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userB",
        type: "address",
      },
    ],
    name: "AgreementFinish",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userADeposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userBDeposit",
        type: "uint256",
      },
    ],
    name: "AgreementStart",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userB",
        type: "address",
      },
    ],
    name: "Create",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "depositAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "DepositReleaseApproval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "adjudicator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDeposit",
        type: "uint256",
      },
    ],
    name: "Dispute",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        internalType: "address",
        name: "userB",
        type: "address",
      },
      {
        internalType: "address",
        name: "adjudicator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "enum State",
        name: "escrowState",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAgreementEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum State",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getEscrowState",
    outputs: [
      {
        internalType: "enum State",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumEscrows",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getRequiredUserDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getTotalDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getTotalRequiredDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getUserDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "getUserDepositReleaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "isDepositReleaseApproved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPastTimelock",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "linkedToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516111513803806111518339818101604052602081101561003357600080fd5b810190808051906020019092919050505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506110bc806100956000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063607110581161008c578063c656fc7011610066578063c656fc7014610568578063d23ab97a1461058a578063e1943eb6146105cc578063ea12489f146105d6576100cf565b806360711058146103b057806379a2a0fc146104125780638646405e14610478576100cf565b8063012f52ee146100d45780631b0d4789146101c45780631f41a274146102265780632f53a674146103005780633a49995b146103425780634379492614610392575b600080fd5b610100600480360360208110156100ea57600080fd5b8101908080359060200190929190505050610620565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018260048111156101ac57fe5b60ff1681526020019550505050505060405180910390f35b610210600480360360408110156101da57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106d0565b6040518082815260200191505060405180910390f35b6102e66004803603604081101561023c57600080fd5b810190808035906020019064010000000081111561025957600080fd5b82018360208201111561026b57600080fd5b8035906020019184602083028401116401000000008311171561028d57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506107dd565b604051808215151515815260200191505060405180910390f35b61032c6004803603602081101561031657600080fd5b8101908080359060200190929190505050610837565b6040518082815260200191505060405180910390f35b61036e6004803603602081101561035857600080fd5b8101908080359060200190929190505050610954565b6040518082600481111561037e57fe5b60ff16815260200191505060405180910390f35b61039a610acc565b6040518082815260200191505060405180910390f35b6103fc600480360360408110156103c657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ad8565b6040518082815260200191505060405180910390f35b61045e6004803603604081101561042857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b7c565b604051808215151515815260200191505060405180910390f35b6104a46004803603602081101561048e57600080fd5b8101908080359060200190929190505050610c96565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182600481111561055057fe5b60ff1681526020019550505050505060405180910390f35b610570610e34565b604051808215151515815260200191505060405180910390f35b6105b6600480360360208110156105a057600080fd5b8101908080359060200190929190505050610e3d565b6040518082815260200191505060405180910390f35b6105d4610f5a565b005b6105de610f5c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000818154811061062d57fe5b90600052602060002090600802016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060070160009054906101000a900460ff16905085565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610774576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f4265747465724465706f7369743a205a45524f5f41444452455353000000000081525060200191505060405180910390fd5b600080838154811061078257fe5b906000526020600020906008020190508060040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b600080600090505b835181101561082b57600061080d8583815181106107ff57fe5b602002602001015185610b7c565b90508061081f57600092505050610831565b506001810190506107e5565b50600190505b92915050565b6000806000838154811061084757fe5b9060005260206000209060080201905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008360040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008460040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506109488183610f8290919063ffffffff16565b95505050505050919050565b600061095e61100a565b6000838154811061096b57fe5b90600052602060002090600802016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600382015481526020016007820160009054906101000a900460ff166004811115610aae57fe5b6004811115610ab957fe5b8152505090508060800151915050919050565b60008080549050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b1357600080fd5b6000808381548110610b2157fe5b906000526020600020906008020190508060050160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c20576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f4265747465724465706f7369743a205a45524f5f41444452455353000000000081525060200191505060405180910390fd5b6000808381548110610c2e57fe5b906000526020600020906008020190508060060160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1691505092915050565b6000806000806000610ca661100a565b60008781548110610cb357fe5b90600052602060002090600802016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600382015481526020016007820160009054906101000a900460ff166004811115610df657fe5b6004811115610e0157fe5b81525050905080600001518160200151826040015183606001518460800151955095509550955095505091939590929450565b60006001905090565b60008060008381548110610e4d57fe5b9060005260206000209060080201905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008360050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008460050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610f4e8183610f8290919063ffffffff16565b95505050505050919050565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080828401905083811015611000576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000600481111561108057fe5b8152509056fea264697066735822122098f4df3140ac1b8076516b37d5d14ceab9170d99724a243030708c850d00d89564736f6c634300060a0033";