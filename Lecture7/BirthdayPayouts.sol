//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./BokkyPooBahsDateTimeLibrary.sol";

contract BirthdayPayout {
    string _name;
    address public _owner;
    uint256 public _createDate;
    Teammate[] private _teammates;

    struct Teammate {
        string name;
        address account;
        uint256 salary;
        uint256 birthday;
        uint256 dateLastGift;
    }

    constructor() payable {
        _name="max";
        _owner = msg.sender;
        _createDate = block.timestamp;
    }

    function addTeammate(address account,string memory name, uint256 salary,uint256 birthday) public onlyOwner {
        require(msg.sender != account,"Cannot add oneself");
        Teammate memory newTeammate = Teammate(name,account,salary, birthday, 0);
        _teammates.push(newTeammate);
        emit NewTeammate(account,name);
    }

    function findBirthday() public onlyOwner{
        require(getTeammatesNumber()>0,"No teammates in the database");
        for(uint256 i=0;i<getTeammatesNumber();i++){
            if(checkGift(i)){
                uint256 today = block.timestamp;
                birthdayPayout(i);
                _teammates[i].dateLastGift = today;
            }
        }
    }

    function birthdayPayout(uint256 index) private onlyOwner {
        sendToTeammate(index);
        emit HappyBirthday(_teammates[index].name,_teammates[index].account);
    }

    function sendToTeammate(uint256 index) public onlyOwner {
        payable(_teammates[index].account).transfer(_teammates[index].salary);
    }

    function checkGift(uint256 index) private view returns (bool) {
        uint256 birthday = getTeammate(index).birthday;
        uint256 lastGift = getTeammate(index).dateLastGift;

        return isDateInPast(birthday) && !isDateInThisYear(lastGift);
    }

    function isDateInPast(uint256 date) view private returns(bool) {
        uint256 today = block.timestamp;
        return today > date;
    }

    function isDateInThisYear(uint256 date) view private returns(bool) {
        uint256 today = block.timestamp;
        (uint256 date_year,,) = getDate(date);
        (uint256 today_year,,) = getDate(today);
        return date_year == today_year;
    }

    function getDate(uint256 timestamp) pure private returns(uint256 year, uint256 month, uint256 day){
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(timestamp);
    }

    function getTeammate(uint256 index) view public returns(Teammate memory){
        return _teammates[index];
    }

    function getTeam() view public returns(Teammate[] memory){
        return  _teammates;
    }

    function getTeammatesNumber() view private returns(uint256){
        return _teammates.length;
    }

    function getTimestamp() view public returns(uint256){
        return  block.timestamp;
    }

    modifier onlyOwner{
        require(msg.sender == _owner,"Sender should be the owner of contract");
        _;
    }

    event NewTeammate(address account, string name);

    event HappyBirthday(string name, address account);
}
