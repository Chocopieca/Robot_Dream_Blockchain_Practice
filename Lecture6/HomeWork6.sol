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
        string contactName;
    }
    Contact _contact;
    Contact[] private _contactList;
    mapping(address => string) private _contacts;
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
        _contact.contactAddress = _contactAddress;
        _contact.contactName = _contactName;
        _contacts[_contactAddress] = _contactName;
        _contactList.push(_contact);
    }

    function getContactByAddress(address _address) external view returns (string memory) {
        return string(_contacts[_address]);
    }

    function getContactByIndex(uint _index) external view returns (string memory) {
        return _contactList[_index].contactName;
    }
}
