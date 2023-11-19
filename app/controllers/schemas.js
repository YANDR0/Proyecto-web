const mongoose = require("mongoose");

//SCHEMAS
function sUser (){
    let userSchema = mongoose.Schema({
        nombre: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        }
    });
    return mongoose.model("users", userSchema);
}

function sProduct (){
    let productSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        stock: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    });
    return mongoose.model("products", productSchema);
}

function coso (){
    return 10;
}

exports.sUser = sUser;
exports.sProduct = sProduct; 
exports.coso = coso;