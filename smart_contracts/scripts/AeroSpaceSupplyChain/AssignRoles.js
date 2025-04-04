/**
 * 🛡️ Assign roles to addresses using the contract owner's wallet
 * 
 * Run:
 * node scripts/AssignRoles.js --pk=<OWNER_PRIVATE_KEY>
 * 
 node scripts/AeroSpaceSupplyChain/AssignRoles.js --pk=0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e


 OUTPUT
🔑 Using owner wallet: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
🎯 Assigning roles...
✅ Assigned role 'manufacturer' to 0x90F79bf6EB2c4f870365E785982E1f101E93b906
✅ Assigned role 'lab' to 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
✅ Assigned role 'installer' to 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
🎉 All roles assigned.

 */

const { ethers } = require("ethers");
const args = require("minimist")(process.argv.slice(2), { string: ["pk"] });
const abi = require("../../artifacts/contracts/AerospaceSupplyChain.sol/AerospaceSupplyChain.json").abi;

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const RPC_URL = "http://127.0.0.1:8545";

// 📦 These are from Hardhat default accounts
const ROLES = [
  { role: "manufacturer", address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906" },
  { role: "lab", address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" },
  { role: "installer", address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc" }
];

const main = async () => {
  const pk = args.pk;
  if (!pk) {
    console.error("❌ Usage: node scripts/AssignRoles.js --pk=<OWNER_PRIVATE_KEY>");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const formattedPK = pk.startsWith("0x") ? pk : "0x" + pk;
  const signer = new ethers.Wallet(formattedPK, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  console.log(`🔑 Using owner wallet: ${signer.address}`);
  console.log("🎯 Assigning roles...");

  for (const r of ROLES) {
    const tx = await contract.assignRole(r.address, r.role);
    await tx.wait();
    console.log(`✅ Assigned role '${r.role}' to ${r.address}`);
  }

  console.log("🎉 All roles assigned.");
};

main().catch(console.error);
