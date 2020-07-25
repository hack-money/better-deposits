// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

enum State {PRE_ACTIVE, ACTIVE, SETTLED, DISPUTE, COMPLETE}
struct Escrow {
    uint256 id;
    address userA;
    address userB;
    address adjudicator;
    uint256 startTime;
    mapping(address => uint256) requiredDeposits;
    mapping(address => uint256) balances;
    mapping(address => bool) depositReleaseApprovals;
    State escrowState;
}
