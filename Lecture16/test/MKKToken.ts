import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MKKToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMKKToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const MKKToken = await ethers.deployContract("MKKToken", [
      "MKKToken", "MKK", 18, 8100000
    ], owner);

    return { MKKToken, owner };
  }

  describe("MKKToken", function () {
    it("Should have the right name", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.name()).to.equal("MKKToken");
    });
    it("Should have the right symbol", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.symbol()).to.equal("MKK");
    });
    it("Should have the right decimals", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.decimals()).to.equal(18);
    });
    it("Should have the right totalSupply", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.totalSupply()).to.equal(8100000n * 10n ** 18n);
    });
    it("Should have the right totalSupply", async function () {
      const { MKKToken, owner } = await loadFixture(deployMKKToken);

      expect(await MKKToken.balanceOf(owner)).to.equal(8100000n * 10n ** 18n);
    });
  });
});
