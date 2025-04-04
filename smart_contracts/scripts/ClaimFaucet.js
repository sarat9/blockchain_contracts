const hre = require("hardhat");
const { formatEther, parseEther } = require("ethers");

const faucetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //"PASTE_YOUR_FAUCET_ADDRESS_HERE";

async function sendMoneyToFaucet(params) {
  const [sender] = await ethers.getSigners();
  await sender.sendTransaction({
    to: faucetAddress, // paste your faucet address
    value: parseEther("5.0") // send 5 ETH
  });
}


async function main() {
  await sendMoneyToFaucet();
  const [user] = await hre.ethers.getSigners();

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.attach(faucetAddress);

  const faucetBalanceBefore = await hre.ethers.provider.getBalance(faucetAddress);
  const userBalBefore = await hre.ethers.provider.getBalance(user.address);
  console.log("💰 User balance before:", formatEther(userBalBefore), "ETH");
  console.log("💰 Faucet balance before:", formatEther(faucetBalanceBefore), "ETH");

  const tx = await faucet.claim();
  await tx.wait();

  const userBalAfter = await hre.ethers.provider.getBalance(user.address);
  const faucetBalanceAfter = await hre.ethers.provider.getBalance(faucetAddress);
  console.log("💰 User balance after:", formatEther(userBalAfter), "ETH");
  console.log("💰 Faucet balance after:", formatEther(faucetBalanceAfter), "ETH");

}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});