const { ethers } = require("ethers");
const abi = require("../abi/AerospaceSupplyChain.json").abi;

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const RPC_WS_URL = process.env.RPC_WS_URL || "ws://127.0.0.1:8545"; // if websocket

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;


const provider = new ethers.JsonRpcProvider(RPC_URL);
// const provider = new ethers.WebSocketProvider(RPC_WS_URL);

const owner = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, owner);

async function asssignDummyRoles(params) {
  await assignRole("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "manufacturer");  
  await assignRole("0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", "lab");  
  await assignRole("0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", "installer");  
  await fundWallet(CONTRACT_ADDRESS)
}
async function assignRole(address, role) {
  const tx = await contract.assignRole(address, role);
  await tx.wait();
  return tx.hash;
}

function getUserContract(pk) {
  const signer = new ethers.Wallet(pk, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}


async function showRoleAssignedTOWallet(wallet){
  const role = await contract.roles(wallet);
  console.log(`${wallet} → Role on chain: "${role}"`);
}


async function fundWallet(address) {
  const tx = await owner.sendTransaction({
    to: address,
    value: ethers.parseEther("1.0")
  });
  await tx.wait();
}

module.exports = {
  assignRole,
  asssignDummyRoles,
  showRoleAssignedTOWallet,
  getUserContract,
  fundWallet,
  provider,
  abi
};
