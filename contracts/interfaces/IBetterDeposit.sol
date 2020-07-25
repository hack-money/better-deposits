// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.10 <0.7.0;

interface IBetterDeposit {
    function create(
        address _userA,
        address _userB,
        address _adjudicator,
        uint256 _userARequiredDeposit,
        uint256 _userBRequiredDeposit
    ) external returns (uint256);

    function deposit(uint256 amount, uint256 escrowId) external;

    function withdraw(uint256 escrowId) external;

    function getTotalDeposit(uint256 escrowId) external view returns (uint256);

    function getUserDeposit(address user, uint256 escrowId)
        external
        view
        returns (uint256);

    function getAgreementEnd() external;

    function getTotalRequiredDeposit(uint256 escrowId)
        external
        view
        returns (uint256);

    function settleAgreement(uint256 escrowId) external;

    function getRequiredUserDeposit(address user, uint256 escrowId)
        external
        view
        returns (uint256);

    function dispute(uint256 escrowId) external;

    function approveDepositRelease(uint256 escrowId) external;
}
