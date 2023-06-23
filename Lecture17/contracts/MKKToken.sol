pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MKKToken is ERC20Capped, Ownable {
    uint8 private decimalsVal;
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 cap_
    ) ERC20(name_, symbol_) ERC20Capped(cap_ * 10 ** decimals_) {
        decimalsVal = decimals_;
    }
    function amountWithDecimals(uint256 amount) private view returns (uint256){
        return amount * 10 ** decimals();
    }
    function decimals() public view virtual override returns (uint8) {
        return decimalsVal;
    }
    function mint(address account, uint256 amount) public onlyOwner {
        super._mint(account, amountWithDecimals(amount));
    }
    function transfer(address to, uint256 amount) public override returns (bool) {
        return super.transfer(to, amountWithDecimals(amount));
    }
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        return super.approve(spender, amountWithDecimals(amount));
    }
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(from, to, amountWithDecimals(amount));
    }
    function burn(uint256 amount) public {
        _burn(_msgSender(), amountWithDecimals(amount));
    }
    function burnFrom(address account, uint256 amount) public onlyOwner {
        _spendAllowance(account, _msgSender(), amountWithDecimals(amount));
        _burn(account, amount);
    }
}
