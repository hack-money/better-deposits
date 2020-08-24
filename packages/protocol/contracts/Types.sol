pragma solidity >=0.6.10 <0.7.0;

/**
 * @title Types
 * @author Tom Waite, Tom French
 
 * Copyright 2020 Tom Waite, Tom French
 */
enum State { PRE_ACTIVE, ACTIVE, SETTLED, DISPUTE, COMPLETE }
struct Escrow {
    address userA;
    address userB;
    address adjudicator;
    uint256 startTime;
    mapping(address => uint256) requiredDeposits;
    mapping(address => uint256) balances;
    mapping(address => bool) depositReleaseApprovals;
    State escrowState;
}
