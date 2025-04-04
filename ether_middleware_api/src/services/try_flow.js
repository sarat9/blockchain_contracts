const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config();
const { users } = require("../data/store");
const { assignRole, getUserContract } = require("./blockchain");

const PORT = 4000;

async function runFlow() {
  const roles = [
    { name: "WingMan", role: "manufacturero" },
    { name: "DQ Labs", role: "labo" },
    { name: "AeroInstallers", role: "installero" }
  ];

  // Step 1: Onboard users
  console.log("\n🧑‍🏭 Onboarding Users...");
  const onboardedUsers = [];
  for (const { name, role } of roles) {
    const res = await fetch(`http://localhost:${PORT}/api/users/onboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role })
    });
    const data = await res.json();
    console.log(`✅ ${role} onboarded → ${data.user.wallet}`);
    onboardedUsers.push(data.user);
  }

  const manufacturer = onboardedUsers.find(u => u.role === "manufacturer");
  const lab = onboardedUsers.find(u => u.role === "lab");
  const installer = onboardedUsers.find(u => u.role === "installer");

  // Step 2: Create component by manufacturer
  console.log("\n🏗️  Manufacturer creating component...");
  let contract = getUserContract(manufacturer.privateKey);
  const tx1 = await contract.createComponent("Boeing Wing A", manufacturer.wallet);
  await tx1.wait();
  console.log("Component created.");

  // Step 3: Lab adds test report
  console.log("\n🔬 Lab adding test report...");
  contract = getUserContract(lab.privateKey);
  const tx2 = await contract.addTestReport(0, "QmTestIPFSHash123");
  await tx2.wait();
  console.log("Test report added.");

  // Step 4: Manufacturer approves component
  console.log("\nManufacturer approving component...");
  contract = getUserContract(manufacturer.privateKey);
  const tx3 = await contract.approveComponent(0);
  await tx3.wait();
  console.log("Component approved.");

  // Step 5: Installer installs component
  console.log("\n🛠 Installer installing component...");
  contract = getUserContract(installer.privateKey);
  const tx4 = await contract.installComponent(0);
  await tx4.wait();
  console.log("Component installed.");

  console.log("\n🎉 Full flow executed successfully.");
}

module.exports = { runFlow };
