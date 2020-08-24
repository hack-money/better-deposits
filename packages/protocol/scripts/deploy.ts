import { ethers } from "@nomiclabs/buidler";

// config
const mintAmount = 5000;

async function main() {
  const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");
  const erc20Mintable = await ERC20Mintable.deploy();
  await erc20Mintable.deployed();

  const BetterDeposit = await ethers.getContractFactory("BetterDeposit");
  const betterDeposit = await BetterDeposit.deploy(erc20Mintable.address);
  await betterDeposit.deployed();

  // mint tokens to test address
  const [userA, userB] = await ethers.getSigners();
  const userAAddress = await userA.getAddress();
  const userBAddress = await userB.getAddress();

  await erc20Mintable.mint(userAAddress, mintAmount);
  await erc20Mintable.mint(userBAddress, mintAmount);

  console.log("userAAddress: ", userAAddress);
  console.log("userBAddress: ", userBAddress);
  console.log("Better deposits deployed to:", betterDeposit.address);
  console.log("ER20Mintable deployed to: ", erc20Mintable.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
