// @ts-ignore
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const MKKToken = await ethers.deployContract("MKKToken", [
    "MKKToken", "MKK", 18, 8100000
  ], owner);

  await MKKToken.waitForDeployment();

  console.log(
    `MKKToken deployed to ${MKKToken.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
