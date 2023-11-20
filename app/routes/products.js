
const express = require("express");
const router = express.Router();
const schems = require("../../server");

//  ###GET products 
router.get("/", (req, res) => {
    console.log(schems.User);
    return res.status(200).send("Vamos viendo");
})

//  ### POST users
router.post("/user_profile", (req, res) => {
    const product = req.body;
    functionsUser.createUser(product);
});

router.put("/user_profile", (req, res) => {
    const product = req.body;
    functionsUser.updateUser(product, product.id);
})

router.get("/user_profile", (req, res) => {
    functionsUser.getUsers();
})

router.delete("/user_profile", (req, res) => {
    const product = req.body;
    functionsUser.deleteUser(product.id);
})

module.exports = router;