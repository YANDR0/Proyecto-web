const express = require("express");
const router = express.Router();

//  ###GET products 
router.get("/", (req, res) => {
    return res.status(200).send("Probando ando");
})

module.exports = router;