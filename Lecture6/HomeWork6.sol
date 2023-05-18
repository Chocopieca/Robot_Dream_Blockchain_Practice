// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

abstract contract Owned {
    address payable owner;
    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function getAdderess() external view returns (address) {
        return owner;
    }

    function setAdderess(address payable _address) external onlyOwner {
        owner = _address;
    }
}

contract HomeWork2 is Owned {
    bytes private _name;
    uint private _numberOfContact;
    struct Contact {
        address contactAddress;
        bytes contactName;
    }
    Contact contact;
    mapping(uint => Contact) private _contacts;
    event newContact(string contactName, address contactAddress, uint index);

    constructor(string memory name) {
        _name = bytes(name);
        _numberOfContact = 0;
    }

    function getName() external view returns (string memory) {
        return string(_name);
    }

    function getNumberOfContact() external view returns (uint) {
        return _numberOfContact;
    }

    function setContact(address _contactAddress, string memory _contactName) external onlyOwner {
        emit newContact(_contactName, _contactAddress, _numberOfContact);
        contact.contactAddress = _contactAddress;
        contact.contactName = bytes(_contactName);
        _contacts[_numberOfContact] = contact;
        _numberOfContact += 1;
    }

    function getContact(uint contactNumber) external view returns (address, string memory) {
        return (_contacts[contactNumber].contactAddress, string(_contacts[contactNumber].contactName));
    }
}
