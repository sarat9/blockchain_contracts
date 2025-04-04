/***
 * 
 * 
 * 
 * node scripts/SimulateAeroSpaceSupplyPKs.js \
  --pk=0x8b3a350cf5c34c9194ca1505eea8c7e5df34f48f1de0f8abf650fab6b8b6cbe7 \
  --role=manufacturer \
  --action=create
 */

const hre = require("hardhat");

async function main() {
  const [owner, wingman, dqLabs, installer] = await hre.ethers.getSigners();

  // Replace this with the address you got from Ignition
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //"YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const contract = await hre.ethers.getContractAt("AerospaceSupplyChain", contractAddress);

  console.log("✅ Connected to deployed contract at:", contractAddress);

  console.log("👑 Owner:", owner.address);
  console.log("🏭 WingMan (Manufacturer):", wingman.address);
  console.log("🔬 DQ Labs (Lab):", dqLabs.address);
  console.log("🛠 Installer:", installer.address);

  // Assign roles
  console.log("🔐 Assigning roles...");
  await contract.connect(owner).assignRole(wingman.address, "manufacturer");
  await contract.connect(owner).assignRole(dqLabs.address, "lab");
  await contract.connect(owner).assignRole(installer.address, "installer");
  console.log("✅ Roles assigned successfully");

  // Manufacturer creates component
  console.log("🏗 WingMan creating component...");
  await contract.connect(wingman).createComponent("Boeing Wing A", dqLabs.address);
  console.log("✅ Component created with ID 0");

  // Lab adds test report
  console.log("🔬 DQ Labs adding test report...");
  await contract.connect(dqLabs).addTestReport(0, "QmTestReportIPFSHash");
  console.log("✅ Test report added to component 0");

  // Manufacturer approves component
  console.log("🧾 WingMan approving component...");
  await contract.connect(wingman).approveComponent(0);
  console.log("✅ Component 0 approved");

  // Installer installs the part
  console.log("🛠 Installer installing component...");
  await contract.connect(installer).installComponent(0);
  console.log("✅ Component 0 installed");

  // View final component state
  const c = await contract.getComponent(0);
  console.log("\n📦 Final Component Data:");
  const createdAtUnix = c[5].toString();
    console.log({
    partName: c[0],
    manufacturer: c[1],
    lab: c[2],
    status: c[3],
    testReportHash: c[4],
    createdAt: new Date(Number(createdAtUnix) * 1000),
   });

   console.log("\n📦 Historic Data:");
   const history = await contract.getHistory(0);

   for (let i = 0; i < history.length; i++) {
    const h = history[i];
    const date = new Date(Number(h.timestamp.toString()) * 1000);
    console.log(`🪪 ${i + 1}. Status: ${h.status}, By: ${h.updatedBy}, At: ${date.toLocaleString()}`);
   }


    console.log("\n📦 Historic Data From Events:");
//    const contract = new ethers.Contract(contractAddress, abi, provider);
    // Build a filter
    const filter = contract.filters.StatusUpdated(0); // for component ID 0
    // Get past logs (from block 0 to latest)
    const events = await contract.queryFilter(filter, 0, "latest");

    events.forEach((e, i) => {
        const { id, status, by, timestamp } = e.args;
        console.log(`🕓 ${i + 1}. Status: ${status}, By: ${by}, At: ${new Date(Number(timestamp) * 1000)}`);
    });
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
