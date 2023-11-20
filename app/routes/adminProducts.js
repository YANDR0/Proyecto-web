
const express = require("express");
const router = express.Router();
const functionsAdmin = require("../controllers/products")
const functionsUser = require("../controllers/users")

//  ### POST admin/products
router.post("/user_profile", (req, res) => {
    const product = req.body;
    functionsAdmin.createProduct(product);
});

router.put("/user_profile", (req, res) => {
    const product = req.body;
    const id = req.params;
    functionsAdmin.updateProduct(product, id);
})

router.get("/user_profile", (req, res) => {
    functionsAdmin.getProducts();
})

router.delete("/user_profile", (req, res) => {
    const id = req.params;
    functionsAdmin.deleteProduct(id);
})

module.exports = router;