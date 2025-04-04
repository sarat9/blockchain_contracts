const { ethers } = require("ethers");
const { provider, abi, contractAddress } = require("./blockchain");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || contractAddress;

function listenToEvents() {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  contract.on("ComponentCreated", (id, creator, lab, timestamp) => {
    console.log(`🆕 Component Created → ID: ${id}, Manufacturer: ${creator}, Lab: ${lab}, Time: ${new Date(Number(timestamp) * 1000).toLocaleString()}`);
  });

  contract.on("TestReportAdded", (id, hash) => {
    console.log(`🔬 Test Report Added → Component ID: ${id}, IPFS Hash: ${hash}`);
  });

  contract.on("ComponentApproved", (id, by) => {
    console.log(`✅ Component Approved → ID: ${id}, Approved by: ${by}`);
  });

  contract.on("ComponentInstalled", (id, by) => {
    console.log(`🚀 Component Installed → ID: ${id}, Installed by: ${by}`);
  });

  contract.on("StatusUpdated", (id, status, by, timestamp) => {
    console.log(`📦 Status Updated → Component #${id} set to status ${status} by ${by} at ${new Date(Number(timestamp) * 1000).toLocaleString()}`);
  });

  contract.on("PaymentMade", (to, amount, timestamp) => {  
    const eth = ethers.formatEther(BigInt(amount));
    const time = new Date(Number(timestamp) * 1000).toLocaleString();
    console.log(`💸 Payment Made → ${eth} ETH to ${to} at ${time}`);
  });

  console.log("👂 Listening to smart contract events...");
}

module.exports = { listenToEvents };
