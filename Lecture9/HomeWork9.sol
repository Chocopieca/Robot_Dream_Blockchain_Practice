// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

library StringComparer {
    function compare(string memory string1, string memory string2) public pure returns(bool) {
        return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
    }
}

interface Living {
    function Eat(string memory _string) external returns(string memory);
    function Speak() external returns(string memory);
    function Sleep() external returns(string memory);
    function getName() external returns(string memory);
}

abstract contract HasName {
    string internal _name;

    constructor(string memory name) {
        _name = name;
    }
}

abstract contract Animal is Living, HasName {

    function getName() public view virtual returns(string memory) {
        return _name;
    }

    function Speak() public pure virtual returns(string memory)  {
        return "...";
    }

    function Eat(string memory _string) public pure virtual returns(string memory) {
        return string.concat("Eat ", _string);
    }

    function Sleep() public pure virtual returns(string memory) {
        return "Z-z-z-z-z";
    }
}

abstract contract Herbivore is Animal {
    string constant PLANT = "plant";

    modifier eatOnlyPlant(string memory _string) {
        require(StringComparer.compare(_string, PLANT), "Can only eat plant food");
        _;
    }

    function Eat(string memory _string) public pure virtual override eatOnlyPlant(_string) returns(string memory) {
        return super.Eat(_string);
    }
}

abstract contract Carnivores is Animal {
    string constant MEAT = "meat";

    modifier eatOnlyPlant(string memory _string) {
        require(StringComparer.compare(_string, MEAT), "Can only eat meat food");
        _;
    }

    function Eat(string memory _string) public pure virtual override eatOnlyPlant(_string) returns(string memory) {
        return super.Eat(_string);
    }
}

abstract contract Omnivores is Animal {
    string constant MEAT = "meat";
    string constant PLANT = "plant";

    modifier eatOnlyPlant(string memory _string) {
        require(StringComparer.compare(_string, MEAT) || StringComparer.compare(_string, PLANT), "Can only eat meat or plant food");
        _;
    }

    function Eat(string memory _string) public pure virtual override eatOnlyPlant(_string) returns(string memory) {
        return super.Eat(_string);
    }
}

contract Cow is Herbivore {

    constructor(string memory name) HasName(name) {}

    function Speak() public pure override returns(string memory) {
        return "Mowww";
    }
}

contract Horse is Herbivore {

    constructor(string memory name) HasName(name) {}

    function Speak() public pure override returns(string memory) {
        return "Igogo";
    }
}

contract Wolf is Carnivores {

    constructor(string memory name) HasName(name) {}

    function Speak() public pure override returns(string memory) {
        return "Auf";
    }
}

contract Dog is Omnivores {

    constructor(string memory name) HasName(name) {}

    function Speak() public pure override returns(string memory) {
        return "Woof";
    }
}

contract Farmer {
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
