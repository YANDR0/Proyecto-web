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
    let user = schems.Product(newUser);
    user.save().then((doc) => console.log(("Usuario creado: " + doc)));
    return newUser;
}

function updateProduct(json, id){
    let newUser = checkProducts(json);
    if(!newUser)
        return false;
    schems.Product.findByIdAndUpdate(id, newUser, {new: true}).then((doc => 
        console.log("Usuario actualizado"))).catch((err) => console.log(err));
    return newUser;
}

function deleteProduct(id){
    schems.Product.findByIdAndDelete(id).then((doc) => console.log("Producto eliminado")).catch((err) => console.log(err));
}

exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

