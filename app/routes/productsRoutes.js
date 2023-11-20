
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
    /*
    const product = req.body;
    const id = req.params;
    functionsAdmin.updateProduct(product, id);*/
    console.log("Actualizar producto");
})

router.get("/", (req, res) => {
    console.log("Obtener producto");
    schems.Product.find({}).then((docs) => res.send(docs)).catch((err) => console.log(err));
})

router.delete("/", (req, res) => {
    /*
    const id = req.params;
    functionsAdmin.deleteProduct(id);*/
    console.log("Borrar producto");
})

module.exports = router;