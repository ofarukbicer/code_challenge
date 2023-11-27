const express = require("express");
const router = express.Router();

const Variants = require("../../../controllers/Variants");

router.get("/find", Variants.GetFind);

router.delete("/delete", Variants.Delete);

router.put("/update", Variants.Update);

module.exports = router;
