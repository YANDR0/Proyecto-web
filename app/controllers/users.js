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

    let user = schems.User(newUser);
    user.save().then((doc) => console.log(("Usuario creado: " + doc)));
}

function getUsers(){
    return schems.User.find({}).then((docs) => {return docs}).catch((err) => console.log(err));
}

function updateUser(json, id){
    let newUser = checkUser(json);
    if(!newUser)
        return false;
    schems.User.findByIdAndUpdate(id, object_to_update, {new: true}).then((doc => 
        console.log("Usuario actualizado"))).catch((err) => console.log(err));
}

function deleteUser(id){
    schems.User.findByIdAndDelete(id).then((doc) => console.log("Usuario eliminado")).catch((err) => console.log(err));

}

