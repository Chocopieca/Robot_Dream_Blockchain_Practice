const hre = require("hardhat");

async function main() {
  console.log('start')
  const StringComparer = await hre.ethers.deployContract("contracts/Abstract.sol:StringComparer");
  await StringComparer.waitForDeployment();

  const [deployer] = await hre.ethers.getSigners();
  const options = {
    signer: deployer,
    libraries: {
      StringComparer: StringComparer.target
    }
  };
  const Farmer = await hre.ethers.deployContract("Farmer");
  const Cow = await hre.ethers.deployContract("Cow", ["Cow"], options);
  const Horse = await hre.ethers.deployContract("Horse", ["Horse"], options);
  const Wolf = await hre.ethers.deployContract("Wolf", ["Wolf"], options);

  await Farmer.waitForDeployment();
  await Cow.waitForDeployment();
  await Horse.waitForDeployment();
  await Wolf.waitForDeployment();

  async function farmerCall(address: string) {
    try {
      const call = await Farmer.Call(address);
      console.log("Farmer call: ", call);
    } catch (e) {
      console.error(e.message);
    }
  }

  async function farmerFeed(address: string, food: string) {
    try {
      const feedWolf = await Farmer.Feed(address, food);
      console.log("Farmer feed wolf: ", feedWolf);
    } catch (e) {
      console.error(e.message);
    }
  }

  await farmerCall(String(Cow.target));
  await farmerCall(String(Horse.target));
  await farmerFeed(String(Wolf.target), "plant");
  await farmerFeed(String(Wolf.target), "meat");
  console.log('end')
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
