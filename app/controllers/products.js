const schems = require("../../server");

function checkProducts(json){
    let keys = ["name", "mail", "phone", "image", "pass"];
    let newUser = {};

    for(let i in keys){
        if(json[i] != undefined)
            return false;
        newUser[i] = json[i]; 
    }

    return newUser;
}

function createProducts(json){
    let newUser = checkUser(json);
    if(!newUser)
        return false;

    let user = schems.Product(newUser);
    user.save().then((doc) => console.log(("Usuario creado: " + doc)));
}

function getProducts(){
    return schems.Product.find({}).then((docs) => {return docs}).catch((err) => console.log(err));
}

function updateProducts(json, id){
    let newUser = checkUser(json);
    if(!newUser)
        return false;
    schems.Product.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc => 
        console.log("Usuario actualizado"))).catch((err) => console.log(err));
}

function deleteProducts(id){
    schems.Product.findByIdAndDelete(id).then((doc) => console.log("Usuario eliminado")).catch((err) => console.log(err));

}

