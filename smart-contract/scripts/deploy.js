import { ethers } from "hardhat";


const main = async () => {
  const dogeFactory = await ethers.getContracyFactory("Dogecoin");
  const dogeContract = await dogeFactory.deploy();
  console.log(`Dogecoin deployed to: ${dogeContract.address}`);

  const bitcoinFactory = await ethers.getContracyFactory("Dogecoin");
  const bitcoinContract = await bitcoinFactory.deploy();
  console.log(`Bitcoin deployed to: ${bitcoinContract.address}`);

  const solanaFactory = await ethers.getContracyFactory("Dogecoin");
  const solanaContract = await solanaFactory.deploy();
  console.log(`Solana deployed to: ${solanaContract.address}`);

  const usdcFactory = await ethers.getContracyFactory("Dogecoin");
  const usdcContract = await usdcFactory.deploy();
  console.log(`USDC deployed to: ${usdcContract.address}`);
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
