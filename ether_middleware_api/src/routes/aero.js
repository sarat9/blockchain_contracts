// const express = require("express");
// const { Wallet } = require("ethers");
// const { users } = require("../data/store");
// const { assignRole, getUserContract, fundWallet, showRoleAssignedTOWallet } = require("../services/blockchain");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json(users);
// });

// router.post("/onboard", async (req, res) => {
//   const { name, role } = req.body;

//   const existing = users.find(u => u.name === name && u.role === role);
//   if (existing) return res.json({ message: "User exists", user: existing });

//   const wallet = Wallet.createRandom();
//   await fundWallet(wallet.address);

//   const user = {
//     id: users.length + 1,
//     name,
//     role,
//     wallet: wallet.address,
//     privateKey: wallet.privateKey
//   };

//   try {
//     await assignRole(user.wallet, user.role);
//     users.push(user);
//     res.json({ message: "User onboarded", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// function getUserFromBody(req) {
//   const { wallet, privateKey, lab } = req.body;
//   if (!wallet || !privateKey) return null;
//   return { wallet, privateKey, lab };
// }


// router.post("/create", async (req, res) => {
//   const user = getUserFromBody(req);
//   if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

//   try {
//     const contract = getUserContract(user.privateKey);
//     // const tx = await contract.createComponent("Component A", user.wallet);
//     const tx = await contract.createComponent("Component A", user.lab);
//     const receipt = await tx.wait();
//     const componentIdBigInt = await contract.nextId() - 1n;
//     const componentId = componentIdBigInt.toString();

//     res.json({
//       message: "Component created",
//       componentId: componentId,
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/test", async (req, res) => {
//   const user = getUserFromBody(req);
//   const { componentId, reportHash } = req.body;
//   if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

//   try {
//     const contract = getUserContract(user.privateKey);
//     const tx = await contract.addTestReport(componentId, reportHash || "QmTestDemo");
//     const receipt = await tx.wait();
//     res.json({
//       message: "Test report added",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/approve", async (req, res) => {
//   const user = getUserFromBody(req);
//   const { componentId } = req.body;
//   if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

//   try {
//     const contract = getUserContract(user.privateKey);
//     const tx = await contract.approveComponent(componentId);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Component approved",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/install", async (req, res) => {
//   const user = getUserFromBody(req);
//   const { componentId } = req.body;
//   if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

//   try {
//     const contract = getUserContract(user.privateKey);
//     const tx = await contract.installComponent(componentId);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Component installed",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.post("/history", async (req, res) => {
//   const { privateKey, componentId } = req.body;
//   if (!privateKey || componentId === undefined) {
//     return res.status(400).json({ error: "privateKey and componentId required" });
//   }

//   try {
//     const contract = getUserContract(privateKey);
//     const rawHistory = await contract.getHistory(componentId);

//     const statusMap = ["Created", "Tested", "Approved", "Installed"];
//     const history = rawHistory.map(entry => ({
//       status: statusMap[Number(entry.status)],
//       updatedBy: entry.updatedBy,
//       timestamp: new Date(Number(entry.timestamp) * 1000).toLocaleString()
//     }));

//     res.json({ componentId, history });
//   } catch (err) {
//     console.error("❌ Error in /history:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// router.post("/order", async (req, res) => {
//   const { privateKey, name, manufacturer } = req.body;

//   try {
//     const contract = getUserContract(privateKey);
//     const tx = await contract.orderedComponent(name, manufacturer);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Component ordered",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/assign-lab", async (req, res) => {
//   const { privateKey, componentId, lab } = req.body;

//   try {
//     const contract = getUserContract(privateKey);
//     const tx = await contract.assignLab(componentId, lab);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Lab assigned",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.post("/mark-ready", async (req, res) => {
//   const { privateKey, componentId } = req.body;

//   try {
//     const contract = getUserContract(privateKey);
//     const tx = await contract.markReady(componentId);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Component marked Ready for Delivery",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Owner confirms delivery
// router.post("/mark-delivered", async (req, res) => {
//   const { privateKey, componentId } = req.body;

//   try {
//     const contract = getUserContract(privateKey);
//     const tx = await contract.markDeliveredComponent(componentId);
//     const receipt = await tx.wait();
//     res.json({
//       message: "Component marked Delivered and payment sent",
//       txHash: receipt.hash,
//       gasUsed: receipt.gasUsed.toString()
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const { Wallet } = require("ethers");
const { users } = require("../data/store");
const {
  assignRole,
  getUserContract,
  fundWallet,
  showRoleAssignedTOWallet
} = require("../services/blockchain");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/onboard", async (req, res) => {
  const { name, role } = req.body;

  const existing = users.find(u => u.name === name && u.role === role);
  if (existing) return res.json({ message: "User exists", user: existing });

  const wallet = Wallet.createRandom();
  await fundWallet(wallet.address);

  const user = {
    id: users.length + 1,
    name,
    role,
    wallet: wallet.address,
    privateKey: wallet.privateKey
  };


  try {
    await assignRole(user.wallet, user.role);
    users.push(user);
    res.json({ message: "User onboarded", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function getUserFromBody(req) {
  const { wallet, privateKey, lab } = req.body;
  if (!wallet || !privateKey) return null;
  return { wallet, privateKey, lab };
}

router.post("/create", async (req, res) => {
  const { wallet, privateKey, componentId } = req.body;
  if (!wallet || !privateKey || componentId === undefined) {
    return res.status(400).json({ error: "wallet, privateKey, and componentId are required" });
  }

  try {
    const contract = getUserContract(privateKey);
    const tx = await contract.createComponent(componentId); // ✅ Fix here
    const receipt = await tx.wait();

    res.json({
      message: "Component marked as Created",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/test", async (req, res) => {
  const user = getUserFromBody(req);
  const { componentId, reportHash } = req.body;
  if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

  try {
    const contract = getUserContract(user.privateKey);
    const tx = await contract.addTestReport(componentId, reportHash || "QmTestDemo");
    const receipt = await tx.wait();
    res.json({
      message: "Test report added",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/approve", async (req, res) => {
  const user = getUserFromBody(req);
  const { componentId } = req.body;
  if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

  try {
    const contract = getUserContract(user.privateKey);
    const tx = await contract.approveComponent(componentId);
    const receipt = await tx.wait();
    res.json({
      message: "Component approved",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/install", async (req, res) => {
  const user = getUserFromBody(req);
  const { componentId } = req.body;
  if (!user) return res.status(400).json({ error: "wallet and privateKey required" });

  try {
    const contract = getUserContract(user.privateKey);
    const tx = await contract.installComponent(componentId);
    const receipt = await tx.wait();
    res.json({
      message: "Component installed",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/mark-ready", async (req, res) => {
  const { privateKey, componentId } = req.body;

  try {
    const contract = getUserContract(privateKey);
    const tx = await contract.markReady(componentId);
    const receipt = await tx.wait();
    res.json({
      message: "Component marked Ready for Delivery",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/mark-delivered", async (req, res) => {
  const { privateKey, componentId } = req.body;

  try {
    const contract = getUserContract(privateKey);
    const tx = await contract.markDeliveredComponent(componentId);
    const receipt = await tx.wait();
    res.json({
      message: "Component marked Delivered and payment sent",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/order", async (req, res) => {
  const { privateKey, partName, manufacturer } = req.body;

  try {
    const contract = getUserContract(privateKey);
    const tx = await contract.orderedComponent(partName, manufacturer);
    const receipt = await tx.wait();
    const componentIdBigInt = await contract.nextId() - 1n;
    const componentId = componentIdBigInt.toString();

    res.json({
      message: "Component ordered",
      componentId,
      partName,
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

router.post("/assign-lab", async (req, res) => {
  const { privateKey, componentId, lab } = req.body;

  try {
    const contract = getUserContract(privateKey);
    const tx = await contract.assignLab(componentId, lab);
    const receipt = await tx.wait();
    res.json({
      message: "Lab assigned",
      txHash: receipt.hash,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/history", async (req, res) => {
  const { privateKey, componentId } = req.body;
  if (!privateKey || componentId === undefined) {
    return res.status(400).json({ error: "privateKey and componentId required" });
  }

  try {
    const contract = getUserContract(privateKey);
    const rawHistory = await contract.getHistory(componentId);

    // const statusMap = ["Created", "Tested", "Approved", "Installed"];
    const statusMap = ["Ordered", "Created", "Tested", "Approved", "Installed", "ReadyForDelivery", "Delivered"];
    const history = rawHistory.map(entry => ({
      status: statusMap[Number(entry.status)],
      updatedBy: entry.updatedBy,
      timestamp: new Date(Number(entry.timestamp) * 1000).toLocaleString()
    }));

    res.json({ componentId, history });
  } catch (err) {
    console.error("❌ Error in /history:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
