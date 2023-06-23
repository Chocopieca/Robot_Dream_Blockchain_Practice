import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers as eth } from "hardhat";
import type {Contract} from "ethers";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/src/signers";

function withDecimals(value: number) {
  return BigInt(value) * 10n ** 18n;
}

describe("MKKToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMKKToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, firstRunner, secondRunner]: HardhatEthersSigner[] = await eth.getSigners();
    const MKKToken: Contract = await eth.deployContract("MKKToken", [
      "MKKToken", "MKK", 18, 8100000
    ], owner);

    return { MKKToken, owner, firstRunner, secondRunner };
  }

  describe("MKKToken", function () {
    it("Should have the right totalSupply", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.totalSupply()).to.equal(0);
    });
    it("Should work transfer() correct", async function () {
      const { MKKToken, owner, firstRunner } = await loadFixture(deployMKKToken);
      await MKKToken.mint(owner.address, 1000);
      await MKKToken.transfer(firstRunner.address, 500);
      const sender = await MKKToken.balanceOf(owner.address);
      const recipient = await MKKToken.balanceOf(firstRunner.address);

      expect(sender).to.equal(withDecimals(500));
      expect(recipient).to.equal(withDecimals(500));
    });
    it("Should work approve() correct", async function () {
      const { MKKToken, owner, firstRunner } = await loadFixture(deployMKKToken);
      await MKKToken.approve(firstRunner.address, 500);
      const allowance = await MKKToken.allowance(owner.address, firstRunner.address);

      expect(allowance).to.equal(withDecimals(500));
    });
    it("Should work transferFrom() correct", async function () {
      const { MKKToken, firstRunner, secondRunner } = await loadFixture(deployMKKToken);
      await MKKToken.mint(firstRunner.address, 500);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;
      await firstRunnerInstance.approve(firstRunner.address, 500);

      const transformFrom = () => {
        return firstRunnerInstance.transferFrom(
          firstRunner.address, secondRunner.address, 500
        )
      }

      await expect(transformFrom()).to.changeTokenBalances(
        firstRunnerInstance,
        [firstRunner.address, secondRunner.address],
        [withDecimals(-500), withDecimals(500)]);
    });
    it("Should not work transferFrom() with low allowance", async function () {
      const { MKKToken, firstRunner, secondRunner } = await loadFixture(deployMKKToken);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      const transformFrom = () => {
        return firstRunnerInstance.transferFrom(firstRunner.address, secondRunner.address, withDecimals(500))
      }

      await expect(transformFrom()).to.be.revertedWith("ERC20: insufficient allowance");
    });
    it("Should work burn() correct", async function () {
      const { MKKToken, firstRunner } = await loadFixture(deployMKKToken);
      await MKKToken.mint(firstRunner.address, 500);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      await expect(
        firstRunnerInstance.burn(500)
      ).to.changeTokenBalance(
        firstRunnerInstance, firstRunner.address, withDecimals(-500)
      );
    });
    it("Should be correct owner", async function () {
      const { MKKToken, owner } = await loadFixture(deployMKKToken);

      expect(await MKKToken.owner()).to.equal(owner.address);
    });
    it("Only owner can use mint", async function () {
      const { MKKToken, firstRunner } = await loadFixture(deployMKKToken);

      expect(await MKKToken.mint(firstRunner.address, 500)).to.emit(MKKToken, "Transfer");
    });
    it("Common user can't use mint", async function () {
      const { MKKToken, firstRunner } = await loadFixture(deployMKKToken);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      await expect(firstRunnerInstance.mint(firstRunner.address, 500))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Cap can't be overflow", async function () {
      const { MKKToken, firstRunner } = await loadFixture(deployMKKToken);

      await expect(MKKToken.mint(firstRunner.address, 8100001))
        .to.be.revertedWith("ERC20Capped: cap exceeded");
    });
  });
});
