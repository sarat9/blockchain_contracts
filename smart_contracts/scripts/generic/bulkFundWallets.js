/**
 * 💸 Bulk fund dev wallets from owner
 * 
 * Run:
 * npx hardhat run scripts/bulkFundWallets.js --network localhost
 */

const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const recipients = [
    { label: "Manufacturer", address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" },
    { label: "Lab", address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" },
    { label: "Installer", address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906" },
    { label: "Manufacturer 2", address: "0x092b8237c8f950668AA42713022B632e5953C210" }, // from your test
  ];

  for (const recipient of recipients) {
    const tx = await owner.sendTransaction({
      to: recipient.address,
      value: ethers.parseEther("1.0"), // 💰 1 ETH per wallet
    });
    await tx.wait();
    console.log(`✅ Sent 1 ETH to ${recipient.label} (${recipient.address})`);
  }

  console.log("🎉 All wallets funded.");
}

main().catch(console.error);
