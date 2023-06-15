// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

library StringComparer {
    function compare(string memory string1, string memory string2) public pure returns(bool) {
        return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
    }
}

interface Living {
    function Eat(string memory _string) external returns(string memory);
    function Speak() external returns(string memory);
    function Sleep() external returns(string memory);
}

abstract contract HasName {
    string internal _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() public view virtual returns(string memory) {
        return _name;
    }
}

abstract contract Animal is Living, HasName {
    string constant PLANT = "plant";
    string constant MEAT = "meat";

    function Speak() public pure virtual returns(string memory)  {
        return "...";
    }

    function Eat(string memory _string) public pure virtual returns(string memory) {
        return _string;
    }

    function Sleep() public pure virtual returns(string memory) {
        return "Z-z-z-z-z";
    }
}

abstract contract Herbivore is Animal {
    modifier eatOnlyPlant(string memory _string) {
        require(StringComparer.compare(_string, PLANT), "Can only eat plant food");
        _;
    }

    function Eat(string memory _string) public pure virtual override eatOnlyPlant(_string) returns(string memory) {
        return super.Eat(_string);
    }
}

abstract contract Carnivores is Animal {
    modifier eatOnlyMeat(string memory _string) {
        require(StringComparer.compare(_string, MEAT), "Can only eat meat food");
        _;
    }

    function Eat(string memory _string) public pure virtual override eatOnlyMeat(_string) returns(string memory) {
        return super.Eat(_string);
    }
}
