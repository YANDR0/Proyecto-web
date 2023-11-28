
const express = require("express");
const router = express.Router();
const functionsAdmin = require("../controllers/products")
const schems = require("../../server");


//  ### POST admin/products
router.post("/", (req, res) => {
    console.log("Crear producto");
    const product = req.body;
    let a = functionsAdmin.createProduct(product);
    res.send(a);
});

router.put("/", (req, res) => {
    console.log("Actualizar producto");
    const product = req.body;
    let a = functionsAdmin.updateProduct(product, product.id);
    res.send(a);
})

router.get("/", (req, res) => {
    schems.Product.find({}).then((docs) => res.send(docs)).catch((err) => console.log(err));
})

router.delete("/", (req, res) => {
    console.log("Borrar producto");
    const product = req.body;
    functionsAdmin.deleteProduct(product.id);
})

module.exports = router;