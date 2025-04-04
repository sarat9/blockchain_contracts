# smart_contracts

Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npm i
npx hardhat help
npx hardhat clean
npx hardhat compile

npx hardhat build
npx hardhat node
```
Creates few wallets and lists their primary keys


```
npx hardhat ignition deploy ./ignition/modules/AeroSpaceSupplyChain.js --network localhost
```
Replace abi files if you have updated the contract
Validate if you are using right abi file

##
##
##

What Is a “Smart Contract,” Really?
A smart contract is code that runs on the blockchain and automatically enforces rules, without relying on trust, humans, or centralized servers.



### Real-Life Use Case Examples
1. Walmart + IBM Food Trust (Already Using This!)
They use blockchain to trace lettuce or mangoes to stop food poisoning outbreaks
From farm to store in 2.2 seconds (vs days using manual systems)

2. Medical Supply Chains
Blockchain tracks blood bags, vaccines, or organs to make sure they’re:
Stored at right temp
Not tampered
Received by correct hospital

3. Luxury Goods / Electronics
Prevent counterfeit products
Shows “This Rolex went from 🇨🇭 to 🇺🇸 via this route”

### Questions
#### “Okay, I’m just saving, creating and fetching data. I could’ve done this in MongoDB or Firebase. Where’s the smart in smart contract?”

And you’re right to question it.
So here’s what makes a contract “smart,” and why this one is powerful even if it looks like just data storage.

In traditional systems, if you say:
- “Only the farmer can update this”
- “The lab must submit a test report”
- “A retailer can't modify shipping data”

You're relying on: Admin access rules, Manual approval,Server-side logic and blind trust on some enterprises
But on-chain?
The contract guarantees these rules — they’re enforced by the blockchain itself.

✅ Now Let’s See What Makes Your Contract Smart
Here’s what you built — and how it's smart:

1. 🔒 Access Control within Contract (Only Owner Can Update)
2. 🔁 Immutable, Verifiable Logs
Timestamped
Linked to msg.sender
Stored forever
Logged as events
Once data is written, nobody can change or delete it — not even the creator. This makes it legally verifiable and perfect for audits or certifications.

3. 🧾 Built-In Proof System
Even if someone prints a fake lab report, a buyer or regulator can hash it and compare it to the blockchain record to verify it’s fake.
No centralized server needed.

4. 💡 Event-Driven Architecture
These events are readable by any frontend, letting websites, dashboards, mobile apps, and logistics tools react live to blockchain changes.

5. 🌐 Public, Trustless, and Interoperable
Anyone in the supply chain (farmers, labs, transporters, retailers, consumers) can:
✅ View product info
❌ But NOT modify it

No one has to trust a single company’s database.
No centralized "API" required.
No downtime. No fake edits. Everything is transparent.

#### Where is all this data saved?
That data is saved on the blockchain itself. More specifically:
📦 It’s stored in the contract's internal storage
🧱 And that storage is part of the block that miners (or validators) confirm
🌍 Then it becomes part of the public ledger forever

Each contract has its own little section (like its own folder)
- You write variables (name, origin, history, etc.) into that space
Once written, the data is:
 - Immutable (can’t be changed later unless allowed by the contract)
 - Publicly accessible (anyone can read it)
 - Replicated across thousands of nodes

#### But What About PDFs or Real Lab Reports?
This is where IPFS or Arweave come in.
Lab report hash	Cheap, tamper-proof, small data
Actual file (PDF, etc.)	Too expensive for blockchain (~$100+/MB)
So we store the hash on-chain and upload the actual file to IPFS:
This gives you:
✅ Blockchain security + 💾 File storage without high cost


#### Who will do all these handovers and manage to put it in blockchain? Does the farmer even knows it exists? How does this whole cycle come to place?

#### ✅ What Do Companies Actually Put on Public Blockchains?
They don’t put everything.
Companies make choice on what data that can go public and private and alos based on costs.

For the times when not to go public, They have private chains as well.

Chain Type - Who Can See It - Example
Public (Ethereum) - Everyone - Open audits, B2C trust
Consortium - Only selected orgs - IBM Food Trust, pharma chains
Private (local) - Only you - Internal blockchain ledger

💼 Example: Walmart’s food tracking runs on Hyperledger Fabric, not Ethereum.


#### What is Hyperledger Fabric or Private Chain?
A permissioned blockchain framework created by IBM, Linux Foundation, and others
Used by enterprises like Walmart, Maersk, Nestlé, FedEx, etc.
It’s modular and private — you control who can join, who can read, and who can write

Why Enterprises Prefer Hyperledger Fabric
They want:

Privacy 🔐: Not all suppliers should see each other’s data
Control ⚙️: They want to define who validates transactions
Compliance ✅: Legal frameworks, KYC, business SLAs
No need for public gas fees 🚫


#### Why Miners maintain this? Why Would Anyone Run a Node or Be a Validator?
Because they get rewarded 💰

Depending on the blockchain:
-  Ethereum (Proof of Stake)
Validators lock up some ETH ("stake")
They’re chosen randomly to propose the next block
If they do it honestly → they get rewarded with ETH
If they cheat → they get punished (lose ETH)

- Bitcoin (Proof of Work)
Miners use electricity to solve math problems
The first to solve it gets to add the block
They get a Bitcoin reward + transaction fees

#### Why Miners or Validators Cheating Doesn’t Work
Fake a transaction	- Everyone else rechecks and rejects it
Approve an invalid product	- Contract logic stops it, chain rejects it
Sign 2 different versions -	Your wallet gets caught and penalized
Rewrite history	- You’d need to hack thousands of nodes 

#### What if Miners & Validators they give up?
🧱 1. What If Miners Give Up? (Proof of Work Chains like Bitcoin)
🔄 What Happens:
- Block times get slower
- Fewer transactions are processed
- Security drops (easier to 51% attack)

💪 But Then…
The network auto-adjusts difficulty

- Mining gets easier
- It becomes profitable again
- New miners join back in

🛠️ This is called Difficulty Adjustment — Bitcoin does it every ~2 weeks.

🔐 2. What If Validators Quit? (Proof of Stake Chains like Ethereum)
🔄 What Happens:
- Blocks are delayed or missed
- Finality becomes slower

Throughput decreases
💪 But Then...
- The protocol incentivizes more validators
- They earn rewards (ETH)
- Less competition means more profit per validator

The network might even auto-unpause or lower validator requirements

Validators are attracted like bees to honey 🍯 (because rewards go up when fewer validators are active)


#### Can the same wallet be used across all contracts
YES — and that’s a core strength of blockchain systems.

A wallet is like your passport.
You can use it to interact with any smart contract, on the same network.


### LATER
Add role-based access (e.g., only a lab can upload test results)
Let transporters sign a "handover" on-chain
Use token-based payments between parties


