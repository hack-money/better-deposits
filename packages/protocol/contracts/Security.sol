pragma solidity >=0.6.10 <0.7.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";


/**
 * @title Security
 * @author Tom Waite, Tom French
 
 * Copyright 2020 Tom Waite, Tom French
 */
contract Security is Ownable, Pausable {
    event WithdrawAll(address indexed from, address indexed to, address indexed assetAddress, uint256 amount);

    function emergencyStop() external onlyOwner {
        _pause();
    }

    function releaseEmergencyStop() external onlyOwner {
        _unpause();
    }

    function withdrawAll(address linkedToken) external onlyOwner whenPaused {
        uint256 allLinkedTokenFunds = IERC20(linkedToken).balanceOf(address(this));
        IERC20(linkedToken).transfer(msg.sender, allLinkedTokenFunds);
        emit WithdrawAll(address(this), msg.sender, linkedToken, allLinkedTokenFunds);
    }
}
