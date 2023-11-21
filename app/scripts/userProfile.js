
let xhr = new XMLHttpRequest();
let usersList = [];
xhr.open('GET', 'http://localhost:3000/users');
xhr.send();

//CREANDO UN USUARIO POR MIENTRAS
sessionStorage.setItem('currUser', JSON.stringify([{
    name: "Juan el admin",
    mail: "juan_elAdmin.@gmail.com",
    phone: "330897812",
    image: "https://raw.githubusercontent.com/YANDR0/Proyecto-web/main/assets/xd/pruwufilePic.png",
    pass: "1234567890",
    role: "admin"
}]));

xhr.onload = function () {
    if (xhr.status === 200) {
        usersList = JSON.parse(xhr.responseText);
        showInterface(inventory);
    }
};

function showInterface (){

}



function inicializarCarrito() {
    if (sessionStorage.getItem('currUser') === null) {
        const start = [];
        sessionStorage.setItem('currUser', JSON.stringify(start));
    }
}

inicializarCarrito();


