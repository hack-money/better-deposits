// SPDX-License-Identifier: GPL-3.0-only
pragma solidity >=0.6.10 <0.7.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { IBaseBetterDeposit } from "./interfaces/IBaseBetterDeposit.sol";
import { State, Escrow } from "./Types.sol";

contract BaseBetterDeposit is IBaseBetterDeposit {
    using SafeMath for uint256;

    Escrow[] public escrows;
    IERC20 public linkedToken;

    constructor(address _linkedToken) public {
        linkedToken = IERC20(_linkedToken);
    }

    modifier onlyUser(uint256 escrowId) {
        Escrow memory escrow = escrows[escrowId];
        require(msg.sender == escrow.userA || msg.sender == escrow.userB, "BetterDeposit: NOT_VALID_USER");
        _;
    }

    /**
     * @dev Get the currently escrowed user deposit
     * @param user - Ethereum address of user in question
     * @param escrowId - unique identifier for a particular escrow
     */
    function getUserDeposit(address user, uint256 escrowId) public override view returns (uint256) {
        require(user != address(0));
        Escrow storage escrow = escrows[escrowId];
        return escrow.balances[user];
    }

    /**
     * Get the number of escrow arrangements ever to be created
     */
    function getNumEscrows() external override view returns (uint256) {
        return escrows.length;
    }

    /**
     * Get all info associated with a particular escrow
     * @param escrowId - unique identifier for a particular escrow
     * @return userA, userB, ajudicator, startTime, escrowState
     */
    function getEscrowInfo(uint256 escrowId)
        external
        override
        view
        returns (
            address,
            address,
            address,
            uint256,
            State
        )
    {
        Escrow memory escrow = escrows[escrowId];
        return (escrow.userA, escrow.userB, escrow.adjudicator, escrow.startTime, escrow.escrowState);
    }

    /**
     * Get the state of an escrow - whether it is PRE-ACTIVE, ACTIVE etc
     */
    function getEscrowState(uint256 escrowId) external override view returns (State) {
        Escrow memory escrow = escrows[escrowId];
        return escrow.escrowState;
    }

    /**
     * @dev Get the deposit required of a user in order for this agreement to be in effect
     * @param user - Ethereum address of user in question
     * @param escrowId - unique identifier for a particular escrow
     * @return Amount a user is expected to deposit for agreement to be in effect
     */
    function getRequiredUserDeposit(address user, uint256 escrowId) public override view returns (uint256) {
        require(user != address(0), "BetterDeposit: ZERO_ADDRESS");
        Escrow storage escrow = escrows[escrowId];
        return escrow.requiredDeposits[user];
    }

    /**
     * @dev Get the total deposit escrowed by this contract in the agreement between
     * userA and userB
     *
     * Total deposit = userADeposit + userBDeposit
     * @param escrowId  - nique identifier for a particular escrow
     * @return Total deposit escrowed by this contract
     */
    function getTotalDeposit(uint256 escrowId) public override view returns (uint256) {
        Escrow storage escrow = escrows[escrowId];
        address userA = escrow.userA;
        address userB = escrow.userB;

        uint256 userADeposit = escrow.balances[userA];
        uint256 userBDeposit = escrow.balances[userB];
        return userADeposit.add(userBDeposit);
    }

    /**
     * @dev Get the total deposit required for this contract to be considered active
     * @param escrowId - unique identifier for a particular escrow
     * @return Total deposit required for contract to be active
     */
    function getTotalRequiredDeposit(uint256 escrowId) public override view returns (uint256) {
        Escrow storage escrow = escrows[escrowId];
        address userA = escrow.userA;
        address userB = escrow.userB;

        uint256 userARequiredDeposit = escrow.requiredDeposits[userA];
        uint256 userBRequiredDeposit = escrow.requiredDeposits[userB];
        return userARequiredDeposit.add(userBRequiredDeposit);
    }

    /**
     * @dev Get the time that this agreement ends. The escrowed funds are locked
     * and cannot be withdrawn until this period is past
     */
    function getAgreementEnd() public override {
        uint256 temp;
    }

    /**
     * @dev Determines whether all parties to the agreement have approved
     * for the deposit to be released
     * @return Bool determining whether all parties have approved the
     * release of the deposit
     */
    function isDepositReleaseApproved(address[] memory users, uint256 escrowId) public override view returns (bool) {
        for (uint256 i = 0; i < users.length; i += 1) {
            bool userApproval = getUserDepositReleaseApproval(users[i], escrowId);
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

    /**
     * @dev Get the status of whether a user has approved their part of the deposit to be
     * released or not
     * @param user - Ethereum address who's deposit release approval is being queried
     * @return Bool indicating whether approval has been given by the user for the deposit
     * to be released (true) or not (false)
     */
    function getUserDepositReleaseApproval(address user, uint256 escrowId) public override view returns (bool) {
        require(user != address(0), "BetterDeposit: ZERO_ADDRESS");
        Escrow storage escrow = escrows[escrowId];
        return escrow.depositReleaseApprovals[user];
    }
}
