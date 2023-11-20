const express = require("express");
const router = express.Router();
const functionsUser = require("../controllers/users")

//  ### POST users
router.post("/", (req, res) => {
    console.log("Crear usuario");
    const product = req.body;
    let a = functionsUser.createUser(product);
    console.log(a);
});

//  ### PUT users
router.put("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.updateUser(product, product.id);*/
    console.log("Actualizar usuario");
})

//  ### GET users
router.get("/", (req, res) => {
    /*
    functionsUser.getUsers();*/
    console.log("Obtener usuarios");
})

//  ### DELETE users
router.delete("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.deleteUser(product.id);*/
    console.log("Borrar usuario");
})

module.exports = router;