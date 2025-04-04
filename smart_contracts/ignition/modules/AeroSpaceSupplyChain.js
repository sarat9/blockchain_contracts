const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AeroSpaceSupplyChain", (m) => {
  const contract = m.contract("AerospaceSupplyChain");
  return { contract };
});