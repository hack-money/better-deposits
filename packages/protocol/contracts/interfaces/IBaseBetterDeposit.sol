// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.10 <0.7.0;

import { State } from "../Types.sol";

interface IBaseBetterDeposit {
    event Deposit(uint256 indexed escrowId, address indexed depositAddress, uint256 depositAmount);
    event Withdraw(uint256 indexed escrowId, address indexed withdrawAddress, uint256 withdrawAmount);
    event AgreementStart(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB,
        uint256 userADeposit,
        uint256 userBDeposit
    );
    event AgreementFinish(uint256 indexed escrowId, address indexed userA, address indexed userB);
    event Create(uint256 indexed escrowId, address indexed userA, address indexed userB);
    event Dispute(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB,
        address adjudicator,
        uint256 totalDeposit
    );
    event DepositReleaseApproval(uint256 indexed escrowId, address indexed user);

    function getUserDeposit(address user, uint256 escrowId) external view returns (uint256);

    function getNumEscrows() external view returns (uint256);

    function getEscrowInfo(uint256 escrowId)
        external
        view
        returns (
            address,
            address,
            address,
            uint256,
            State
        );

    function getRequiredUserDeposit(address user, uint256 escrowId) external view returns (uint256);

    function getTotalDeposit(uint256 escrowId) external view returns (uint256);

    function getTotalRequiredDeposit(uint256 escrowId) external view returns (uint256);

    function getAgreementEnd() external;

    function isDepositReleaseApproved(address[] memory users, uint256 escrowId) external view returns (bool);

    function isPastTimelock() external returns (bool);

    function getEscrowState(uint256 escrowId) external view returns (State);

    function getUserDepositReleaseApproval(address user, uint256 escrowId) external view returns (bool);
}
