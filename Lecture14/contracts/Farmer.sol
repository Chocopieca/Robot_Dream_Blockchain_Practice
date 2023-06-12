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
        return string.concat("Eat ", _string);
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

contract Farmer {
    address owner;
    constructor() {
        owner = msg.sender;
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
    receive() external payable {
        owner = msg.sender;
    }
}
