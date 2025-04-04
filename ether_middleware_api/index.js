require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const aeroRoutes = require("./src/routes/aero");
const { listenToEvents } = require("./src/services/listener");
const { runFlow } = require("./src/services/try_flow");
const {asssignDummyRoles} = require("./src/services/blockchain")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/aero", aeroRoutes);

(async function name(params) {
  await asssignDummyRoles()
})();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  listenToEvents(); // start blockchain listener
});
