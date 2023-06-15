import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Homework tests", async function () {

  async function deployHorse() {
    const StringComparer = await ethers.deployContract("contracts/Abstract.sol:StringComparer");
    const [owner, otherAccount] = await ethers.getSigners();

    const options = {
      signer: owner,
      libraries: {
        StringComparer: StringComparer.target
      }
    };
    const Farmer = await ethers.deployContract("Farmer");
    const Horse = await ethers.deployContract("Horse", ["Horse"], options);
    await Farmer.waitForDeployment;
    await Horse.waitForDeployment;

    return { Farmer, Horse, owner, otherAccount };
  }

  async function deployDog() {
    const StringComparer = await ethers.deployContract("contracts/Abstract.sol:StringComparer");
    const [owner, otherAccount] = await ethers.getSigners();

    const options = {
      signer: owner,
      libraries: {
        StringComparer: StringComparer.target
      }
    };
    const Farmer = await ethers.deployContract("Farmer");
    const Dog = await ethers.deployContract("Dog", ["Dog"], options);
    await Farmer.waitForDeployment;
    await Dog.waitForDeployment;

    return { Farmer, Dog };
  }

  describe("Horse and Farmer", function () {
    it("Horse has the correct name.", async function () {
      const { Horse } = await loadFixture(deployHorse);

      expect(await Horse.getName()).to.equal("Horse");
    });
    it("Horse can sleep.", async function () {
      const { Horse } = await loadFixture(deployHorse);

      expect(await Horse.Sleep()).to.equal("Z-z-z-z-z");
    });
    it("Horse can eat “plant”", async function () {
      const { Horse } = await loadFixture(deployHorse);

      expect(await Horse.Eat("plant")).to.equal("plant");
    });
    it("Horse cannot eat ”meat”, ”not-food”, ”plastic”.", async function () {
      const { Horse } = await loadFixture(deployHorse);

      await expect(Horse.Eat("meat")).to.be.revertedWith("Can only eat plant food");
      await expect(Horse.Eat("not-food")).to.be.revertedWith("Can only eat plant food");
      await expect(Horse.Eat("plastic")).to.be.revertedWith("Can only eat plant food");
    });
    it("Farmer can call Horse, Horse responds correctly", async function () {
      const { Farmer, Horse } = await loadFixture(deployHorse);

      expect(await Farmer.Call(Horse.target)).to.equal("Igogo");
    });
    it("Farmer can feed Horse with plant", async function () {
      const { Farmer, Horse } = await loadFixture(deployHorse);

      expect(await Farmer.Feed(Horse.target, "plant")).to.equal("plant");
    });
    it("Farmer cannot feed Horse with anything else(”meat”,”plastic”,”fingers”,etc).", async function () {
      const { Farmer, Horse } = await loadFixture(deployHorse);

      await expect(Farmer.Feed(Horse.target, "meat")).to.be.revertedWith("Can only eat plant food");
      await expect(Farmer.Feed(Horse.target, "plastic")).to.be.revertedWith("Can only eat plant food");
      await expect(Farmer.Feed(Horse.target, "fingers")).to.be.revertedWith("Can only eat plant food");
    });
  });

  describe("Dog and Farmer", function () {
    it("Dog has the correct name.", async function () {
      const { Dog } = await loadFixture(deployDog);

      expect(await Dog.getName()).to.equal("Dog");
    });
    it("Dog can sleep.", async function () {
      const { Dog } = await loadFixture(deployDog);

      expect(await Dog.Sleep()).to.equal("Z-z-z-z-z");
    });
    it("Dog can eat “plant”", async function () {
      const { Dog } = await loadFixture(deployDog);

      expect(await Dog.Eat("plant")).to.equal("plant");
    });
    it("Dog can eat “meat”", async function () {
      const { Dog } = await loadFixture(deployDog);

      expect(await Dog.Eat("meat")).to.equal("meat");
    });
    it("Dog cannot eat ”not-food”, ”plastic”, ”chocolate”.", async function () {
      const { Dog } = await loadFixture(deployDog);

      await expect(Dog.Eat("not-food")).to.be.revertedWith("Can only eat meat or plant food");
      await expect(Dog.Eat("plastic")).to.be.revertedWith("Can only eat meat or plant food");
      await expect(Dog.Eat("chocolate")).to.be.revertedWith("Can only eat meat or plant food");
    });
    it("Farmer can call Dog, Dog responds correctly", async function () {
      const { Farmer, Dog } = await loadFixture(deployDog);

      expect(await Farmer.Call(Dog.target)).to.equal("Woof");
    });
    it("Farmer can feed Dog with ”meat”,”plant”.", async function () {
      const { Farmer, Dog } = await loadFixture(deployDog);

      expect(await Farmer.Feed(Dog.target, "plant")).to.equal("plant");
      expect(await Farmer.Feed(Dog.target, "meat")).to.equal("meat");
    });
    it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else.", async function () {
      const { Farmer, Dog } = await loadFixture(deployDog);

      await expect(Farmer.Feed(Dog.target, "not-food")).to.be.revertedWith("Can only eat meat or plant food");
      await expect(Farmer.Feed(Dog.target, "plastic")).to.be.revertedWith("Can only eat meat or plant food");
      await expect(Farmer.Feed(Dog.target, "fingers")).to.be.revertedWith("Can only eat meat or plant food");
    });
  });
});
