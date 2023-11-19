const express = require('express');
const path = require('path');
//const productRouter = require('../routes/products')
//const adminProductRouter = require('../routes/admin_products')
const router = express.Router();

//router.use('/products', productRouter);
//router.use('/admin/products', validateAdmin, adminProductRouter);

function validateAdmin(req, res, next){
    const header = req.get("x-auth");
    if (!header || header !== "admin")
        return res.status(403).send("Le falta autentificación");
    next();
}

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/shoppingKart.html")));

module.exports = router;