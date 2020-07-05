// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.10 <0.7.0;

import {ReleaseManager} from "../ReleaseManager.sol";

contract ReleaseManagerTest is ReleaseManager {
    function approveDepositRelease() external {
        internalApproveDepositRelease();
    }
}
