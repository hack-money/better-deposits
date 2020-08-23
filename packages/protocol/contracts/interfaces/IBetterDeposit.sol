pragma solidity >=0.6.10 <0.7.0;

import { IBaseBetterDeposit } from "./IBaseBetterDeposit.sol";

/**
 * @title IBetterDeposit
 * @author Tom Waite, Tom French
 
 * Copyright 2020 Tom Waite, Tom French
 */
interface IBetterDeposit is IBaseBetterDeposit {
    function create(
        address _userA,
        address _userB,
        address _adjudicator,
        uint256 _userARequiredDeposit,
        uint256 _userBRequiredDeposit
    ) external returns (uint256);

    function deposit(uint256 amount, uint256 escrowId) external;

    function withdraw(uint256 escrowId) external;

    function settleAgreement(uint256 escrowId) external;

    function dispute(uint256 escrowId) external;

    function approveDepositRelease(uint256 escrowId) external;
}
