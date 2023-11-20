
const express = require("express");
const router = express.Router();
const schems = require("../../server");

//  ### POST users
router.post("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.createUser(product);*/
    console.log("Crear usuario");
});

router.put("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.updateUser(product, product.id);*/
    console.log("Actualizar usuario");
})

router.get("/", (req, res) => {
    /*
    functionsUser.getUsers();*/
    console.log("Obtener usuarios");
})

router.delete("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.deleteUser(product.id);*/
    console.log("Borrar usuario");
})

module.exports = router;