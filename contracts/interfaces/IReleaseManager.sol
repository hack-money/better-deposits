// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

interface IReleaseManager {
    function isDepositReleaseApproved(address[] memory users)
        external
        view
        returns (bool);

    function getUserDepositReleaseApproval(address user)
        external
        view
        returns (bool);

    function isPastTimelock() external returns (bool);
}
