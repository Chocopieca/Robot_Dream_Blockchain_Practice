// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

abstract contract Owner {
    string internal _name;
    address internal _address;

    constructor(string memory name){
        _name = name;
        _address = msg.sender;
    }

    function setName(string memory name) public onlyOwner{
        _name = name;
    }

    function getName() view public returns(string memory){
        return _name;
    }

    function setAddress(address account) public onlyOwner{
        _address = account;
    }

    function getAddress() view public returns(address){
        return _address;
    }

    modifier onlyOwner(){
        require(msg.sender == getAddress(),"Only owner can call this function");
        _;
    }
}

contract Contact {
    string _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() public view returns (string memory) {
        return _name;
    }

    function reply() external  view returns (string memory) {
        return string.concat(getName(), " on call!");
    }
}

contract ContactBook is Owner {
    address[] private _contacts;
    mapping(address=>string) private _contactNames;

    constructor(string memory name) Owner(name){}

    function addContact(string memory _name) public emitEvent(_name){
        Contact newContact = new Contact(_name);
        address contactAddress = address(newContact);
        _contacts.push(contactAddress);
        _contactNames[contactAddress] = _name;
    }

    function callContact(uint _index) public view returns (string memory) {
        address contactAddress = getContactAddress(_index);
        Contact newContact = Contact(contactAddress);
        return newContact.reply();
    }

    function getLastIndex() view public returns(uint256){
        return _contacts.length - 1;
    }

    function getContactAddress(uint256 number) view public returns(address){
        return _contacts[number];
    }

    function getContactName(address account) view public returns(string memory){
        return _contactNames[account];
    }

    event NewContact(string name, uint256 index);

    modifier emitEvent(string memory name){
        _;
        emit NewContact(name,getLastIndex());
    }

}
