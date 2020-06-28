pragma solidity >=0.6.10 <0.7.0;

import {IBetterDeposit} from "./interfaces/IBetterDeposit.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {Security} from "./Security.sol";

contract BetterDeposit is IBetterDeposit, Security {
    using SafeMath for uint256;

    IERC20 public linkedToken;
    address public userA;
    address public userB;
    uint256 public userARequiredDeposit;
    uint256 public userBRequiredDeposit;

    mapping(address => uint256) balances;
    mapping(address => uint256) requiredDeposits;

    event Deposit(address indexed depositAddress, uint256 depositAmount);
    event Withdraw(address indexed withdrawAddress, uint256 withdrawAmount);

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
    }

    modifier onlyUser() {
        require(
            msg.sender == userA || msg.sender == userB,
            "BetterDeposit: NOT_VALID_USER"
        );
        _;
    }

    /// GETTERS and SETTERS
    function getRequiredDeposit(address user) public view returns (uint256) {
        require(user != address(0), 'BetterDeposit: ZERO_ADDRESS');
        return requiredDeposits[user];
    }

    function getUserDeposit(address user) public view override returns (uint256) {
        require(user != address(0));
        return balances[user];
    }

    function getTotalDeposit() external view override returns (uint256) {
        uint256 userADeposit = getUserDeposit(userA);
        uint256 userBDeposit = getUserDeposit(userB);
        return userADeposit.add(userBDeposit);
    }

    /// EFFECTS and INTERACTIONS
    function deposit(uint256 amount) external override onlyUser whenNotPaused {
        require(amount == requiredDeposits[msg.sender], 'BetterDeposit: INCORRECT_DEPOSIT');
        uint256 approvedAllowance = linkedToken.allowance(
            msg.sender,
            address(this)
        );
        require(approvedAllowance >= amount, 'BetterDeposit: INSUFFICIENT_APPROVAL');

        balances[msg.sender] = balances[msg.sender].add(amount);

        require(
            linkedToken.transferFrom(msg.sender, address(this), amount),
            "BetterDeposit: DEPOSIT_FAILED"
        );

        emit Deposit(msg.sender, amount);
    }

    function withdraw() external override onlyUser whenNotPaused {
        require(isPastTimelock(), "BetterDeposit: TIMELOCK_NOT_EXPIRED");
        // require();
        uint256 userDeposit = getUserDeposit(msg.sender);
        require(
            userDeposit <= linkedToken.balanceOf(address(this)),
            "BetterDeposit: INSUFFICIENT_FUNDS"
        );

        require(
            linkedToken.transfer(msg.sender, userDeposit),
            "BetterDeposit: WITHDRAW_FAILED"
        );
        emit Withdraw(msg.sender, userDeposit);
    }

    function isPastTimelock() public override returns (bool) {
        return true;
    }

    function getAgreementEnd() public override {
        uint256 temp;
    }
}
