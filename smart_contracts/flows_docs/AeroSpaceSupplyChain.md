## Start Contract

AeroSpaceSupplyChain

```
npx hardhat clean
npx hardhat compile

npx hardhat build
npx hardhat node

```

Creates few wallets and lists their primary keys


##
##
```
npx hardhat ignition deploy ./ignition/modules/AeroSpaceSupplyChain.js --network localhost
```

Replace abi files if you have updated the contract
Validate if you are using right abi file


##
##
##
##
##

saratcha.ejjapureddi@MACFXCYMFVXQW reality-solid % npx hardhat ignition deploy ./ignition/modules/AeroSpaceSupplyChain.js --network localhost

Hardhat Ignition 🚀

Deploying [ AeroSpaceSupplyChain ]

Batch #1
  Executed AeroSpaceSupplyChain#AerospaceSupplyChain

[ AeroSpaceSupplyChain ] successfully deployed 🚀

Deployed Addresses

AeroSpaceSupplyChain#AerospaceSupplyChain - 0x5FbDB2315678afecb367f032d93F642f64180aa3
jenv: version `17.0.12' is not installed                                                                                                                                                                                                             
saratcha.ejjapureddi@MACFXCYMFVXQW reality-solid % npx hardhat run scripts/TestAeroSpaceSupplyFlow.js --network localhost                    

✅ Connected to deployed contract at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
👑 Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
🏭 WingMan (Manufacturer): 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
🔬 DQ Labs (Lab): 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
🛠 Installer: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
🔐 Assigning roles...
✅ Roles assigned successfully
🏗 WingMan creating component...
✅ Component created with ID 0
🔬 DQ Labs adding test report...
✅ Test report added to component 0
🧾 WingMan approving component...
✅ Component 0 approved
🛠 Installer installing component...
✅ Component 0 installed

📦 Final Component Data:
{
  partName: 'Boeing Wing A',
  manufacturer: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  lab: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  status: 3n,
  testReportHash: 'QmTestReportIPFSHash',
  createdAt: 2025-03-29T05:49:32.000Z
}

📦 Historic Data:
🪪 1. Status: 0, By: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, At: 3/29/2025, 11:19:32 AM
🪪 2. Status: 1, By: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, At: 3/29/2025, 11:19:33 AM
🪪 3. Status: 2, By: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, At: 3/29/2025, 11:19:34 AM
🪪 4. Status: 3, By: 0x90F79bf6EB2c4f870365E785982E1f101E93b906, At: 3/29/2025, 11:19:35 AM

##
##
##

API


🚀 Backend running at http://localhost:4000
👂 Listening to smart contract events...
🆕 Component Created → ID: 4, Manufacturer: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, Lab: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc, Time: 3/31/2025, 8:13:58 PM
📦 Status Updated → Component #4 set to status 0 by 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 at 3/31/2025, 8:13:58 PM
🔬 Test Report Added → Component ID: 4, IPFS Hash: QmTestFromLab
📦 Status Updated → Component #4 set to status 1 by 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc at 3/31/2025, 8:14:05 PM
✅ Component Approved → ID: 4, Approved by: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
📦 Status Updated → Component #4 set to status 2 by 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 at 3/31/2025, 8:14:13 PM
🚀 Component Installed → ID: 4, Installed by: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
📦 Status Updated → Component #4 set to status 3 by 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 at 3/31/2025, 8:14:18 PM
💸 Payment Made → 0.01 ETH to 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 at 3/31/2025, 8:14:18 PM

##

EVENT FLOW

Boeing (Owner)
   └── ordersComponent() 🔁 emits Ordered
        └── manufacturer.createComponent() 🔁 emits Created
            └── assignLab() 🔁 emits LabAssigned
                └── lab.addTestReport() 🔁 emits Tested
                    └── manufacturer.approveComponent() 🔁 emits Approved
                        └── installer.installComponent() 🔁 emits Installed, Payment
                            └── manufacturer.markReady() 🔁 emits ReadyForDelivery
                                └── owner.markDeliveredComponent() 🔁 emits Delivered, Payment

##
##
##
##
##





First: What Are Smart Contracts (for people)
Smart contracts are self-executing pieces of code on the blockchain. They follow "if this, then that" rules, and no one can change them once deployed.
They remove middlemen, ensure transparency, and can handle logic like:

🧾 Agreements (e.g. payments when conditions are met)

🔐 Access control (e.g. roles & permissions)

📦 Tracking assets (e.g. supply chain, real estate)

🗳 Voting (e.g. decentralized governance)

💰 DeFi (e.g. staking, swaps, loans)




##

NEXT FEATURES
- 1. 🔐 Multi-Lab Testing with Consensus
based on voting logic
-2 - 2. 🔐 Escrow with Time Lock
After installation, payment is locked for 24 hours. If no complaint is raised, it’s auto-released.

4. 🧰 Maintenance & Repair History
Add another feature:

After install, allow technician role to log repairs or inspections.