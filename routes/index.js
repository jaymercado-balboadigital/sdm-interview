const express = require("express");
const router = express.Router();
const { getUsersByProgramID } = require("../controllers/getUsersByProgramID");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/users/:programID", getUsersByProgramID);

module.exports = router;
