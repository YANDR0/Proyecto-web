
const express = require("express");
const router = express.Router();
const schems = require("../../server");

//  ###GET products 
router.get("/", (req, res) => {
    console.log(schems.User);
    return res.status(200).send("Vamos viendo");
})

module.exports = router;