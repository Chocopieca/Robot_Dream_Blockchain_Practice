pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MKKToken is ERC20 {
    uint8 private decimalsVal;
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint totalSupply_
    ) ERC20(name_, symbol_) {
        decimalsVal = decimals_;
        _mint(msg.sender, totalSupply_ * 10 ** decimals_);
    }
    function decimals() public view virtual override returns (uint8) {
        return decimalsVal;
    }
}
