const express = require("express");
const router = express.Router();

const versions = require("./v1/versions.routes");
const variants = require("./v1/variants.routes");

router.use("/versions", versions);
router.use("/variants", variants);

module.exports = router;
