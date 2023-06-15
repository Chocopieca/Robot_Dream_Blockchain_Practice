// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import"./Abstract.sol";
import"./animals/Dog.sol";
import"./animals/Cow.sol";
import"./animals/Horse.sol";
import"./animals/Wolf.sol";

contract Farmer {
    address owner;
    constructor() {
        owner = msg.sender;
    }

    function test() external pure returns(string memory) {
        return "test";
    }

    function getName(address animal) external view returns(string memory) {
        return Animal(animal).getName();
    }
    function Feed(address animal, string memory food) external pure returns(string memory) {
        return Animal(animal).Eat(food);
    }
    function Call(address animal) external pure returns(string memory) {
        return Animal(animal).Speak();
    }
}
