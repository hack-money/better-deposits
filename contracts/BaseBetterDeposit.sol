// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";

contract BaseBetterDeposit {
    using SafeMath for uint256;
    Escrow[] public escrows;
    IERC20 public linkedToken;

    constructor(address _linkedToken) public {
        linkedToken = IERC20(_linkedToken);
    }

    event Deposit(
        uint256 indexed escrowId,
        address indexed depositAddress,
        uint256 depositAmount
    );
    event Withdraw(
        uint256 indexed escrowId,
        address indexed withdrawAddress,
        uint256 withdrawAmount
    );
    event AgreementStart(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB,
        uint256 userADeposit,
        uint256 userBDeposit
    );
    event AgreementFinish(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB
    );
    event Create(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB
    );
    event Dispute(
        uint256 indexed escrowId,
        address indexed userA,
        address indexed userB,
        address adjudicator,
        uint256 totalDeposit
    );
    event DepositReleaseApproval(
        uint256 indexed escrowId,
        address indexed user
    );

    modifier onlyUser(uint256 escrowId) {
        Escrow memory escrow = escrows[escrowId];
        require(
            msg.sender == escrow.userA || msg.sender == escrow.userB,
            "BetterDeposit: NOT_VALID_USER"
        );
        _;
    }

    /**
     * @dev Get the currently escrowed user deposit
     * @param user - Ethereum address of user in question
     * @param escrowId - unique identifier for a particular escrow
     */
    function getUserDeposit(address user, uint256 escrowId)
        public
        override
        view
        returns (uint256)
    {
        require(user != address(0));
        Escrow storage escrow = escrows[escrowId];
        return escrow.balances[user];
    }

    /**
     * Get the number of escrow arrangements ever to be created
     */
    function getNumEscrows() external view returns (uint256) {
        return escrows.length;
    }

    /**
     * Get all info associated with a particular escrow
     * @param escrowId - unique identifier for a particular escrow
     */
    function getEscrowInfo(uint256 escrowId)
        external
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
        return (
            escrow.userA,
            escrow.userB,
            escrow.adjudicator,
            escrow.startTime,
            escrow.escrowState
        );
    }
}
