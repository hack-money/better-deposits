// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.10 <0.7.0;

import {State} from "../Types.sol";

interface IBaseBetterDeposit {
    function getUserDeposit(address user, uint256 escrowId)
        external
        view
        returns (uint256);

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

    function getRequiredUserDeposit(address user, uint256 escrowId)
        external
        view
        returns (uint256);

    function getTotalDeposit(uint256 escrowId) external view returns (uint256);

    function getTotalRequiredDeposit(uint256 escrowId)
        external
        view
        returns (uint256);

    function getAgreementEnd() external;

    function isDepositReleaseApproved(address[] memory users, uint256 escrowId)
        external
        view
        returns (bool);

    function isPastTimelock() external returns (bool);

    function getEscrowState(uint256 escrowId) external view returns (State);

    function getUserDepositReleaseApproval(address user, uint256 escrowId)
        external
        view
        returns (bool);
}
