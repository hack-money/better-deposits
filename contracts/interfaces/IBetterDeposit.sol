pragma solidity >=0.6.10 <0.7.0;

interface IBetterDeposit {
    function deposit(uint256 amount) external;

    function approveWithdraw() external;

    function withdraw() external;

    function getTotalDeposit() external returns (uint256);

    function getUserDeposit(address user) external returns (uint256);

    function getAgreementEnd() external;

    function isPastTimelock() external returns (bool);
}