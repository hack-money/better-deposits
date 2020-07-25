// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {IBetterDeposit} from "./interfaces/IBetterDeposit.sol";
import {Security} from "./Security.sol";
import {State, Escrow} from "./Types.sol";

contract BetterDeposit is IBetterDeposit, Security {
    /**
     * @dev Get the deposit required of a user in order for this agreement to be in effect
     * @param user - Ethereum address of user in question
     * @param escrowId - unique identifier for a particular escrow
     * @return Amount a user is expected to deposit for agreement to be in effect
     */
    function getRequiredUserDeposit(address user, uint256 escrowId)
        public
        override
        view
        returns (uint256)
    {
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
    function getTotalDeposit(uint256 escrowId)
        public
        override
        view
        returns (uint256)
    {
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
    function getTotalRequiredDeposit(uint256 escrowId)
        public
        override
        view
        returns (uint256)
    {
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
     * Create an escrow arrangement. Initialises it, but the escrow is not yet active - users need to deposit
     * the required amounts using deposit() to enact the agreement
     */
    function create(
        address _userA,
        address _userB,
        address _adjudicator,
        uint256 _userARequiredDeposit,
        uint256 _userBRequiredDeposit
    ) external override returns (uint256) {
        require(_userA != address(0), "BetterDeposits: ZERO_ADDRESS");
        require(_userB != address(0), "BetterDeposits: ZERO_ADDRESS");
        require(_adjudicator != address(0), "BetterDeposits: ZERO_ADDRESS");
        require(_userARequiredDeposit > 0, "BetterDeposits: ZERO_VALUE");
        require(_userBRequiredDeposit > 0, "BetterDeposits: ZERO_VALUE");

        Escrow memory newEscrow = Escrow({
            userA: _userA,
            userB: _userB,
            adjudicator: _adjudicator,
            startTime: now,
            escrowState: State.PRE_ACTIVE
        });

        escrows.push(newEscrow);
        uint256 escrowId = escrows.length;

        Escrow storage createdEscrow = escrows[escrowId];
        createdEscrow.requiredDeposits[_userA] = _userARequiredDeposit;
        createdEscrow.requiredDeposits[_userB] = _userBRequiredDeposit;
        createdEscrow.id = escrowId;

        emit Create(escrowId, _userA, _userB);
        return escrowId;
    }

    /**
     * @dev User deposits funds, their part of the deposit being escrowed
     * Currently, the whole deposit must be deposited in one go. Must be called by the
     * user themselves
     *
     * @param amount - amount to be deposited
     * @param escrowId - unique identifier for a particular escrow
     *
     * Only calleable by parties involved in the agreement
     */
    // TODO: add escape mechanism to pull funds if other party to the agreement
    // doesn't deposit
    function deposit(uint256 amount, uint256 escrowId)
        external
        override
        onlyUser(escrowId)
        whenNotPaused
    {
        Escrow storage escrow = escrows[escrowId];
        require(
            escrow.escrowState == State.PRE_ACTIVE,
            "BetterDeposit: AGREEMENT_NOT_PRE_ACTIVE"
        );
        require(
            amount == escrow.requiredDeposits[msg.sender],
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

        escrow.balances[msg.sender] = escrow.balances[msg.sender].add(amount);

        require(
            linkedToken.transferFrom(msg.sender, address(this), amount),
            "BetterDeposit: DEPOSIT_FAILED"
        );

        // if both users have deposited, start the agreement
        if (getTotalRequiredDeposit(escrowId) == getTotalDeposit(escrowId)) {
            escrow.escrowState = State.ACTIVE;
            emit AgreementStart(
                escrowId,
                escrow.userA,
                escrow.userB,
                getUserDeposit(escrow.userA, escrowId),
                getUserDeposit(escrow.userB, escrowId)
            );
        }

        emit Deposit(escrowId, msg.sender, amount);
    }

    /**
     * @dev Mark the agreement as being settled and so enable a withdraw of funds
     * to occur. Requires the time lock to have passed and for all users to have
     * approved the deposit to be released
     * @param escrowId - unique identifier for a particular escrow
     *
     * Calleable by anyone - by definition when this will execute successfully, all
     * parties have given their approval for the deposit to be released
     */
    function settleAgreement(uint256 escrowId) external override {
        require(isPastTimelock(), "BetterDeposit: TIME_LOCK_NOT_EXPIRED");

        Escrow storage escrow = escrows[escrowId];

        address[] memory users = new address[](2);
        users[0] = escrow.userA;
        users[1] = escrow.userB;
        require(
            isDepositReleaseApproved(users),
            "BetterDeposit: DEPOSIT_RELEASE_NOT_APPROVED"
        );
        escrow.escrowState = State.SETTLED;
    }

    /**
     * @dev Withdraw a user's locked deposit. Requires that the locked deposit period
     * is past and both parties have agreed for the deposits to be released
     * @param escrowId - unique identifier for a particular escrow
     * Withdraws the whole of the user's deposit to their address.
     *
     * Only calleable by parties involved in the agreement
     */
    function withdraw(uint256 escrowId)
        external
        override
        onlyUser(escrowId)
        whenNotPaused
    {
        Escrow storage escrow = escrows[escrowId];

        require(
            escrow.escrowState == State.SETTLED,
            "BetterDeposit: AGREEMENT_NOT_SETTLED"
        );

        uint256 userDeposit = getUserDeposit(msg.sender, escrowId);
        require(userDeposit > uint256(0), "BetterDeposit: NO_USER_DEPOSIT");
        escrow.balances[msg.sender] = escrow.balances[msg.sender].sub(
            userDeposit
        );

        require(
            userDeposit <= linkedToken.balanceOf(address(this)),
            "BetterDeposit: INSUFFICIENT_FUNDS"
        );

        require(
            linkedToken.transfer(msg.sender, userDeposit),
            "BetterDeposit: WITHDRAW_FAILED"
        );

        emit Withdraw(escrowId, msg.sender, userDeposit);

        // if both users have withdrawn, mark agreement status as complete
        if (getTotalDeposit(escrowId) == uint256(0)) {
            escrow.escrowState = State.COMPLETE;
            emit AgreementFinish(escrowId, escrow.userA, escrow.userB);
        }
    }

    /**
     * @dev Start a dispute over the deposit. If successfully called, it will
     * transfer the deposit held by the contract to the third party adjudicator
     * address.
     * @param escrowId - unique identifier for a particular escrow
     *
     * Adjudicator then resolves dispute off-chain
     *
     * Only calleable by parties involved in agreement
     * TODO: restrict to only be calleable when agreement term is expired
     */
    function dispute(uint256 escrowId) external override onlyUser(escrowId) {
        Escrow storage escrow = escrows[escrowId];
        // TODO: only allow this to be called when agreement term has expired
        escrow.escrowState = State.DISPUTE;

        // local variable holding deposit, will decrease to 0 when
        // user deposit balances decremented
        uint256 totalDeposit = getTotalDeposit(escrowId);
        address userA = escrow.userA;
        address userB = escrow.userB;

        // decrement deposit balances of users
        escrow.balances[userA] = escrow.balances[userA].sub(
            getUserDeposit(userA, escrowId)
        );
        escrow.balances[userB] = escrow.balances[userB].sub(
            getUserDeposit(userB, escrowId)
        );

        require(
            linkedToken.transfer(escrow.adjudicator, totalDeposit),
            "BetterDeposit: DISPUTE_TRANSFER_FAILED"
        );
        emit Dispute(escrowId, userA, userB, escrow.adjudicator, totalDeposit);
    }

    /**
     * @dev Allow a party to the agreement to approve the deposit to be
     * released at the end of the agreement
     * @param escrowId - unique identifier for a particular escrow
     *
     * Only calleable by parties involved in agreement
     */
    function approveDepositRelease(uint256 escrowId)
        external
        override
        onlyUser(escrowId)
    {
        Escrow storage escrow = escrows[escrowId];
        internalApproveDepositRelease(escrow);
    }

    /**
     * @dev Get the status of whether a user has approved their part of the deposit to be
     * released or not
     * @param user - Ethereum address who's deposit release approval is being queried
     * @return Bool indicating whether approval has been given by the user for the deposit
     * to be released (true) or not (false)
     */
    function getUserDepositReleaseApproval(Escrow storage escrow, address user)
        internal
        view
        returns (bool)
    {
        require(user != address(0), "BetterDeposit: ZERO_ADDRESS");
        return escrow.depositReleaseApprovals[user];
    }

    /**
     * @dev Determines whether all parties to the agreement have approved
     * for the deposit to be released
     * @return Bool determining whether all parties have approved the
     * release of the deposit
     */
    function isDepositReleaseApproved(uint256 escrowId, address[] memory users)
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

    /**
     * @dev Allow a party to the agreement to approve the deposit to be
     * released at the end of the agreement
     *
     * Should be called in child inheriting contract, where appropriate
     * permissioning is performed
     */
    function internalApproveDepositRelease(Escrow storage escrow) internal {
        require(isPastTimelock(), "BetterDeposit: TIME_LOCK_NOT_EXPIRED");
        escrow.depositReleaseApprovals[msg.sender] = true;

        emit DepositReleaseApproval(escrow.id, msg.sender);
    }
}
