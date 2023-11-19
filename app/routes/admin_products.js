const express = require("express");
const router = express.Router();
const dataHandler = require("../controllers/data_handler");

//  ### POST admin/products
router.post("/", (req, res) => {
    /*
    let json = req.body;

    let list = Object.keys(json);
    let keys = ["title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category"];
    let miss = [];
    for(const key of keys)
        if(!list.includes(key))
            miss.push(key);

    if(miss.length > 0) 
        return res.status(400).send("Atributos faltantes: " + miss.join(", "));

    dataHandler.createProduct(json);
    res.status(201).send("El animal " + json.title + " ha sido spawneado de la nada con éxito");
    */
});


module.exports = router;