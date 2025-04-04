// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;
const ONE_HUNDREDTH_ETH = 10n ** 16n; // 0.01 ETH
const NOW_PLUS_60_SECONDS = Math.floor(Date.now() / 1000) + 60;


module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", NOW_PLUS_60_SECONDS);
  const lockedAmount = m.getParameter("lockedAmount", ONE_HUNDREDTH_ETH);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});
