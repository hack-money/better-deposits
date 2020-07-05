// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

import {IEscrowManagement} from "./interfaces/IEscrowManagement.sol";

contract EscrowManagement is IEscrowManagement {
    mapping(address => bool) depositReleaseApprovals;

    constructor() public {}

    /**
     * @dev Get the status of whether a user has approved their part of the deposit to be
     * released or not
     * @param user - Ethereum address who's deposit release approval is being queried
     * @return Bool indicating whether approval has been given by the user for the deposit
     * to be released (true) or not (false)
     */
    function getUserDepositReleaseApproval(address user)
        public
        override
        view
        returns (bool)
    {
        require(user != address(0), "BetterDeposit: ZERO_ADDRESS");
        return depositReleaseApprovals[user];
    }

    /**
     * @dev Allow a party to the agreement to approve the deposit to be
     * released at the end of the agreement
     */
    function approveDepositRelease() external override {
        require(isPastTimelock(), "BetterDeposit: TIME_LOCK_NOT_EXPIRED");
        depositReleaseApprovals[msg.sender] = true;
    }

    /**
     * @dev Determines whether all parties to the agreement have approved
     * for the deposit to be released
     * @return Bool determining whether all parties have approved the
     * release of the deposit
     */
    function isDepositReleaseApproved(address[] memory users)
        public
        override
        view
        returns (bool)
    {
        for (uint256 i = 0; i < users.length; i += 1) {
            bool userApproval = getUserDepositReleaseApproval(users[i]);
            if (!userApproval) {
                return false;
            }
        }
        return true;
    }

    /**
     * @dev Determine if funds time-lock is expired
     */
    function isPastTimelock() public override returns (bool) {
        return true;
    }
}
