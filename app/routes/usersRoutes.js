const express = require("express");
const router = express.Router();
const functionsUser = require("../controllers/users")
const schems = require("../../server");

//  ### POST users              LISTO
router.post("/", (req, res) => {
    console.log("Crear usuario");
    const product = req.body;
    let a = functionsUser.createUser(product);
    res.send(a);
});

//  ### PUT users
router.put("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.updateUser(product, product.id);*/
    console.log("Actualizar usuario");
})

//  ### GET users               LISTO
router.get("/", (req, res) => {
    console.log("Obtener usuarios");
    schems.User.find({}).then((docs) => res.send(docs)).catch((err) => console.log(err));
})

//  ### DELETE users
router.delete("/", (req, res) => {
    /*
    const product = req.body;
    functionsUser.deleteUser(product.id);*/
    console.log("Borrar usuario");
})

module.exports = router;