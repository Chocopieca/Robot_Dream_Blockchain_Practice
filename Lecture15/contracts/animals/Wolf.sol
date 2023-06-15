// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import"../Abstract.sol";

contract Wolf is Carnivores {

    constructor(string memory name) HasName(name) {}

    function Speak() public pure override returns(string memory) {
        return "Auf";
    }
}
