/**
 * 🔧 Simulates user calls with their own private keys.
 * Run it like:
 * 
 * node scripts/SimulateAeroSpaceSupplyPKs.js --pk=YOUR_PRIVATE_KEY --role=manufacturer --action=create
 * node scripts/SimulateAeroSpaceSupplyPKs.js --pk=YOUR_PRIVATE_KEY --role=lab --action=test --id=0 --hash=QmHash
 * 
 * 
 * Example:
 
 node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk="0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6" --role=manufacturer --action=create
 
 
 node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk="0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a" --role=lab --action=test

 node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk="0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba" --role=installer --action=install



 -> OUTPUT:
node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk=0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6  --role=manufacturer  --action=create
🔑 Wallet: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
🎭 Role: manufacturer, Action: create
✅ Component created.

node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk="0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a" --role=lab --action=test

🔑 Wallet: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
🎭 Role: lab, Action: test
✅ Test report added.

node scripts/AeroSpaceSupplyChain/SimulateAeroSpaceSupplyPKs.js --pk="0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba" --role=installer --action=install

🔑 Wallet: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
🎭 Role: installer, Action: install
✅ Component installed.


 * 
 */

const { ethers } = require("ethers");
const args = require("minimist")(process.argv.slice(2), {
  string: ["pk", "role", "action", "id", "hash"]
});
const abi = require("../../artifacts/contracts/AerospaceSupplyChain.sol/AerospaceSupplyChain.json").abi;

// 🏗️ Define your contract address and RPC here
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // replace with your deployed address
const RPC_URL = "http://127.0.0.1:8545"; // Hardhat node

const role = args.role;
const action = args.action;
const componentId = args.id || 0;
const reportHash = args.hash || "QmFakeHash";
const userPK = args.pk;

if (!userPK || !role || !action) {
  console.error("❌ Usage: --pk=<privateKey> --role=<role> --action=<action>");
  process.exit(1);
}

if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS.length !== 42) {
  console.error("❌ CONTRACT_ADDRESS is missing or invalid.");
  process.exit(1);
}

const main = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const rawPK = String(userPK).trim();
  const formattedPK = rawPK.startsWith("0x") ? rawPK : "0x" + rawPK;
  const signer = new ethers.Wallet(formattedPK, provider); 
  // const formattedPK = userPK.startsWith("0x") ? userPK : "0x" + userPK;
  // const signer = new ethers.Wallet(formattedPK, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  console.log(`🔑 Wallet: ${signer.address}`);
  console.log(`🎭 Role: ${role}, Action: ${action}`);

  if (role === "manufacturer") {
    if (action === "create") {
      const tx = await contract.createComponent("Component A", signer.address);
      await tx.wait();
      console.log("✅ Component created.");
    } else if (action === "approve") {
      const tx = await contract.approveComponent(componentId);
      await tx.wait();
      console.log("✅ Component approved.");
    }
  } else if (role === "lab" && action === "test") {
    const tx = await contract.addTestReport(componentId, reportHash);
    await tx.wait();
    console.log("✅ Test report added.");
  } else if (role === "installer" && action === "install") {
    const tx = await contract.installComponent(componentId);
    await tx.wait();
    console.log("✅ Component installed.");
  } else {
    console.log("❌ Unknown role or action.");
  }
};

main().catch((err) => {
  console.error("❌ Error:", err.message || err);
});
