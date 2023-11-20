const schems = require("../../server");

function checkProducts(json){
    let keys = ["name", "description", "price", "stock", "image"];
    let newUser = {};

    for(let i of keys){
        if(json[i] == undefined)
            return false;
        newUser[i] = json[i]; 
    }

    return newUser;
}

function createProduct(json){
    let newUser = checkProducts(json);
    if(!newUser)
        return false;

        /*
    let user = schems.Product(newUser);
    user.save().then((doc) => console.log(("Usuario creado: " + doc)));*/
}

function getProducts(){
    return schems.Product.find({}).then((docs) => {return docs}).catch((err) => console.log(err));
}

function updateProduct(json, id){
    let newUser = checkProducts(json);
    if(!newUser)
        return false;
    /*
    schems.Product.findByIdAndUpdate(id, newUser, {new: true}).then((doc => 
        console.log("Usuario actualizado"))).catch((err) => console.log(err));*/
}

function deleteProduct(id){
    schems.Product.findByIdAndDelete(id).then((doc) => console.log("Usuario eliminado")).catch((err) => console.log(err));

}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

/*
module.exports = createProduct;
module.exports = getProducts;
module.exports = updateProduct;
module.exports = deleteProduct;*/
