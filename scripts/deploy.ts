import { ethers } from '@nomiclabs/buidler';

// config
const userADeposit = 50;
const userBDeposit = 50;

async function main() {
  const ERC20Mintable = await ethers.getContractFactory('ERC20Mintable');
  const erc20Mintable = await ERC20Mintable.deploy();
  await erc20Mintable.deployed();
  console.log('ER20Mintable deployed to: ', erc20Mintable.address);

  const [userA, userB] = await ethers.getSigners();
  const userAAdress = await userA.getAddress();
  const userBAdress = await userB.getAddress();

  const BetterDeposit = await ethers.getContractFactory('BetterDeposit');
  const betterDeposit = await BetterDeposit.deploy(
    erc20Mintable.address,
    userAAdress,
    userBAdress,
    userADeposit,
    userBDeposit
  );
  await betterDeposit.deployed();

  console.log('Better deposits deployed to:', betterDeposit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
