const express = require("express");
const router = express.Router();

const Versions = require("../../../controllers/Versions");

router.get("/all", Versions.GetAll);
router.get("/find", Versions.GetFind);

router.delete("/delete", Versions.Delete);

router.put("/update", Versions.Update);

module.exports = router;
