const express = require('express');
const path = require('path');
const usersRouter = require('../routes/usersRoutes')
const productRouter = require('../routes/productsRoutes')
const router = express.Router();

router.use('/products', productRouter);
router.use('/users', usersRouter); //router.use('/users', validateAdmin, usersRouter);

function validateAdmin(req, res, next){
    const header = req.get("x-auth");
    if (!header || header !== "admin")
        return res.status(403).send("Le falta autentificación");
    next();
}

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/shoppingCart.html")));
router.get('/user_profile', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/userProfile.html")));


module.exports = router;