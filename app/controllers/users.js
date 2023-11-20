const schems = require("../../server");

function checkUser(json){
    let keys = ["name", "mail", "phone", "image", "pass"];
    let newUser = {};

    for(let i in keys){
        if(json[i] != undefined)
            return false;
        newUser[i] = json[i]; 
    }

    return newUser;
}

function createUser(json){
    let newUser = checkUser(json);
    if(!newUser)
        return false;

    console.log(newUser);
    /*
    let user = schems.User(newUser);
    user.save().then((doc) => console.log(("Usuario creado: " + doc)));*/
}

function getUsers(){
    return schems.User.find({}).then((docs) => {return docs}).catch((err) => console.log(err));
}

function updateUser(json, id){
    let newUser = checkUser(json);
    if(!newUser)
        return false;
    console.log(newUser);
    /*
    schems.User.findByIdAndUpdate(id, newUser, {new: true}).then((doc => 
        console.log("Usuario actualizado"))).catch((err) => console.log(err));*/
}

function deleteUser(id){
    schems.User.findByIdAndDelete(id).then((doc) => console.log("Usuario eliminado")).catch((err) => console.log(err));

}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

/*
module.exports = createUser;
module.exports = getUsers;
module.exports = updateUser;
module.exports = deleteUser;*/
