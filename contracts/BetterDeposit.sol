// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {IBetterDeposit} from "./interfaces/IBetterDeposit.sol";
import {Security} from "./Security.sol";
import {EscrowManagement} from "./EscrowManagement.sol";

contract BetterDeposit is IBetterDeposit, EscrowManagement, Security {
    using SafeMath for uint256;

    IERC20 public linkedToken;
    address public userA;
    address public userB;

    mapping(address => uint256) balances;
    mapping(address => uint256) requiredDeposits;

    event AgreementStart(
        address indexed userA,
        address indexed userB,
        uint256 userADeposit,
        uint256 userBDeposit
    );
    event AgreementFinish(address indexed userA, address indexed userB);
    event Deposit(address indexed depositAddress, uint256 depositAmount);
    event Withdraw(address indexed withdrawAddress, uint256 withdrawAmount);

    enum State {PRE_ACTIVE, ACTIVE, SETTLED, COMPLETE}
    State public escrowState; // current agreement status of the escrow

    constructor(
        address _linkedToken,
        address _userA,
        address _userB,
        uint256 _userARequiredDeposit,
        uint256 _userBRequiredDeposit
    ) public {
        linkedToken = IERC20(_linkedToken);
        userA = _userA;
        userB = _userB;
        requiredDeposits[_userA] = _userARequiredDeposit;
        requiredDeposits[_userB] = _userBRequiredDeposit;

        escrowState = State.PRE_ACTIVE;
    }

    modifier onlyUser() {
        require(
            msg.sender == userA || msg.sender == userB,
            "BetterDeposit: NOT_VALID_USER"
        );
        _;
    }

    /**
     * @dev Get the currently escrowed user deposit
     * @param user - Ethereum address of user in question
     */
    function getUserDeposit(address user)
        public
        override
        view
        returns (uint256)
    {
        require(user != address(0));
        return balances[user];
    }

    /**
     * @dev Get the deposit required of a user in order for this agreement to be in effect
     * @param user - Ethereum address of user in question
     * @return Amount a user is expected to deposit for agreement to be in effect
     */
    function getRequiredUserDeposit(address user)
        public
        override
        view
        returns (uint256)
    {
        require(user != address(0), "BetterDeposit: ZERO_ADDRESS");
        return requiredDeposits[user];
    }

    /**
     * @dev Get the total deposit escrowed by this contract in the agreement between
     * userA and userB
     *
     * Total deposit = userADeposit + userBDeposit
     * @return Total deposit escrowed by this contract
     */
    function getTotalDeposit() public override view returns (uint256) {
        uint256 userADeposit = getUserDeposit(userA);
        uint256 userBDeposit = getUserDeposit(userB);
        return userADeposit.add(userBDeposit);
    }

    /**
     * @dev Get the total deposit required for this contract to be considered active
     * @return Total deposit required for contract to be active
     */
    function getTotalRequiredDeposit() public override view returns (uint256) {
        uint256 userARequiredDeposit = getRequiredUserDeposit(userA);
        uint256 userBRequiredDeposit = getRequiredUserDeposit(userB);
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
     * @dev User deposits funds, their part of the deposit being escrowed
     * Currently, the whole deposit must be deposited in one go. Must be called by the
     * user themselves
     *
     * @param amount - amount to be deposited
     */
    function deposit(uint256 amount) external override onlyUser whenNotPaused {
        require(
            escrowState == State.PRE_ACTIVE,
            "BetterDeposit: AGREEMENT_NOT_PRE_ACTIVE"
        );
        require(
            amount == requiredDeposits[msg.sender],
            "BetterDeposit: INCORRECT_DEPOSIT"
        );
        uint256 approvedAllowance = linkedToken.allowance(
            msg.sender,
            address(this)
        );
        require(
            approvedAllowance >= amount,
            "BetterDeposit: INSUFFICIENT_APPROVAL"
        );

        balances[msg.sender] = balances[msg.sender].add(amount);

        require(
            linkedToken.transferFrom(msg.sender, address(this), amount),
            "BetterDeposit: DEPOSIT_FAILED"
        );

        // if both users have deposited, start the agreement
        if (getTotalRequiredDeposit() == getTotalDeposit()) {
            escrowState = State.ACTIVE;
            emit AgreementStart(
                userA,
                userB,
                getUserDeposit(userA),
                getUserDeposit(userB)
            );
        }

        emit Deposit(msg.sender, amount);
    }

    /**
     * @dev Mark the agreement as being settled and so enable a withdraw of funds
     * to occur. Requires the time lock to have passed and for all users to have
     * approved the deposit to be released
     */
    function settleAgreement() external override {
        require(isPastTimelock(), "BetterDeposit: TIME_LOCK_NOT_EXPIRED");

        address[] memory users = new address[](2);
        users[0] = userA;
        users[1] = userB;
        require(
            isDepositReleaseApproved(users),
            "BetterDeposit: DEPOSIT_RELEASE_NOT_APPROVED"
        );
        escrowState = State.SETTLED;
    }

    /**
     * @dev Withdraw a user's locked deposit. Requires that the locked deposit period
     * is past and both parties have agreed for the deposits to be released
     *
     * Withdraws the whole of the user's deposit to their address
     */
    function withdraw() external override onlyUser whenNotPaused {
        require(
            escrowState == State.SETTLED,
            "BetterDeposit: AGREEMENT_NOT_SETTLED"
        );

        uint256 userDeposit = getUserDeposit(msg.sender);
        require(userDeposit > uint256(0), "BetterDeposit: NO_USER_DEPOSIT");
        balances[msg.sender] = balances[msg.sender].sub(userDeposit);

        require(
            userDeposit <= linkedToken.balanceOf(address(this)),
            "BetterDeposit: INSUFFICIENT_FUNDS"
        );

        require(
            linkedToken.transfer(msg.sender, userDeposit),
            "BetterDeposit: WITHDRAW_FAILED"
        );

        emit Withdraw(msg.sender, userDeposit);

        // if both users have withdrawn, mark agreement status as complete
        if (getTotalDeposit() == uint256(0)) {
            escrowState = State.COMPLETE;
            emit AgreementFinish(userA, userB);
        }
    }
}
