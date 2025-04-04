const hre = require("hardhat");
const { formatEther } = require("ethers"); 

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const lockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.attach(lockAddress);

  const balanceBefore = await hre.ethers.provider.getBalance(lockAddress);
  const senderBalanceBefore = await hre.ethers.provider.getBalance(deployer.address);

  console.log("🔓 withdraw() called...");
  console.log("👤 Sender:", deployer.address);
  console.log("📦 Contract balance before:", formatEther(balanceBefore), "ETH");
  console.log("👛 Sender balance before:", formatEther(senderBalanceBefore), "ETH");

  const tx = await lock.withdraw();
  await tx.wait();

  const balanceAfter = await hre.ethers.provider.getBalance(lockAddress);
  const senderBalanceAfter = await hre.ethers.provider.getBalance(deployer.address);

  console.log("Contract balance after:", formatEther(balanceAfter), "ETH");
  console.log("Sender balance after:", formatEther(senderBalanceAfter), "ETH");

}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exitCode = 1;
});

