// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import"../Abstract.sol";

contract Dog is Animal {
    constructor(string memory name) HasName(name) {}

    modifier eatPlantAndMeat(string memory _string) {
        require(StringComparer.compare(_string, MEAT) || StringComparer.compare(_string, PLANT), "Can only eat meat or plant food");
        _;
    }

    function Speak() public pure override returns(string memory) {
        return "Woof";
    }

    function Eat(string memory _string) public pure override eatPlantAndMeat(_string) returns(string memory) {
        return super.Eat(_string);
    }
}
