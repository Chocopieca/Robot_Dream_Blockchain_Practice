import {ethers} from "hardhat";

async function main() {
  const contactBook = await ethers.getContractAt("ContactBook", "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690");

  const firstAddress = await contactBook.getContactAddress(0);
  console.log('firstAddress', firstAddress);
  const addressName = await contactBook.getContactName(firstAddress);
  console.log('addressName', addressName);
  const transaction = await (await contactBook.addContact("test3")).wait();
  console.log("transaction", transaction.hash);
  const lastIndex = Number(await contactBook.getLastIndex()) - 1;
  console.log('lastIndex', lastIndex);
  const content = await contactBook.callContact(lastIndex);
  console.log("content", content);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
