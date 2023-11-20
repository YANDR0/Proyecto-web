
const express = require("express");
const router = express.Router();
const functionsAdmin = require("../controllers/products")
const functionsUser = require("../controllers/users")

//  ### POST admin/products
router.post("/", (req, res) => {
    /*
    const product = req.body;
    functionsAdmin.createProduct(product);*/
    console.log("Crear producto");
});

router.put("/", (req, res) => {
    /*
    const product = req.body;
    const id = req.params;
    functionsAdmin.updateProduct(product, id);*/
    console.log("Actualizar producto");
})

router.get("/", (req, res) => {
    /*
    functionsAdmin.getProducts();*/
    console.log("Obtener producto");
})

router.delete("/", (req, res) => {
    /*
    const id = req.params;
    functionsAdmin.deleteProduct(id);*/
    console.log("Borrar producto");
})

module.exports = router;