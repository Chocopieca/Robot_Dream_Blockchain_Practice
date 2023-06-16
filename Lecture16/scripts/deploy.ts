import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const MKKToken = await ethers.deployContract("MKKToken", [
    "MKKToken", "MKK", 18, 8100000
  ], owner);

  await MKKToken.waitForDeployment();

  const name = await MKKToken.name();
  console.log("name", name);
  const symbol = await MKKToken.symbol();
  console.log("symbol", symbol);
  const decimals = await MKKToken.decimals();
  console.log("decimals", decimals);
  const totalSupply = await MKKToken.totalSupply();
  console.log("decimals", totalSupply);

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
