
const express = require("express");
const router = express.Router();
const schems = require("../controllers/schemas");

//  ###GET products 
router.get("/", (req, res) => {
    console.log(schems.sUser());
    return res.status(200).send("Vamos viendo");
})

module.exports = router;