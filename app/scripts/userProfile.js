
let xhr = new XMLHttpRequest();
var usersList = [];
var inventory = [];
var url;
var crud;

function getUsersXHR () {
    url = 'http://localhost:3000/users';
    crud = 'GET';
    xhr.open(crud, url);
    xhr.send();
}

function getProductsXHR(){
    url = 'http://localhost:3000/products';
    crud = 'GET';
    xhr.open(crud, url);
    xhr.send();
}

function crudProductXHR(json, op){
    url = 'http://localhost:3000/products';
    crud = op;
    xhr.open(crud, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
    window.location.reload();
}

function crudUserXHR(json, op){
    url = 'http://localhost:3000/users';
    crud = op;
    xhr.open(crud, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
    window.location.reload();
}


getUsersXHR();

xhr.onload = function () {
    if (xhr.status === 200){
        if(url == 'http://localhost:3000/users' && crud == 'GET'){
            usersList = JSON.parse(xhr.responseText);
            getProductsXHR();
        }
        if(url == 'http://localhost:3000/products' && crud == 'GET'){
            inventory = JSON.parse(xhr.responseText);
            showInterface();
        }
    }
};


function showInterface (){
    let user = JSON.parse(sessionStorage.getItem('currUser'));

    if(user.role != 'admin')
        document.getElementById('productEditor').style.visibility = "hidden";
    
    document.getElementById("profile").innerHTML = `
            <div
                class="bg-slate-400 h-2/6 flex flex-col items-center justify-center rounded-sm overflow-hidden pt-4">
                <div class="bg-gray-200 rounded-full overflow-hidden mb-5 items-center justify-center">
                    <img src="${user.image}"
                        alt="Descripción de la imagen" class="h-auto max-h-full rounded-full">
                </div>
            </div>
            <div class="bg-slate-600 h-4/6 flex flex-col items-center mt-5 pt-10 rounded">
                <h1 class="text-3xl text-gray-200"><b>${user.name}</b></h1> <br>
                <p class="text-lg text-gray-200"><b>Correo: </b>${user.mail}</p>
                <p class="text-lg text-gray-200"><b>Teléfono: </b>${user.phone}</p> <br>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-0"
                onclick="document.getElementById('modifyUser').showModal()">
                    Actualizar datos
                </button>
                <p class="p-2"></p>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded bottom-0"
                onclick="document.getElementById('closeSession').showModal()">
                    Cerrar sesión
                </button>
            </div>`;

    html = `<div class="flex flex-col rounded-lg md:flex-row text-3xl justify-center font-semibold pb-2 pt-2">
                <h1>Inventario de productos disponibles</h1>
            </div>`;

    for (const e of inventory) {
        html += `
        <div class="flex flex-col rounded-lg bg-slate-700 md:flex-row h-fit">
                    <img class="w-1/4 h-auto flex-1 rounded-t-lg object-cover md:!rounded-none md:!rounded-l-lg"
                        src="${e.image}">
                    <div class="flex flex-col w-3/4 p-6 text-slate-300">
                        <h5 class="mb-2 text-xl font-medium text-neutral-50">
                            ${e.name}
                        </h5>
                        <div class="flex justify-around items-center rounded-lg shadow-sm pt-2">
                            <button type="button"
                                class="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onclick="updateProducts('${e._id}','${"modifyProducts"}')">
                                Actualizar
                            </button>
                            <button type="button"
                                class="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onclick="updateProducts('${e._id}','${"deleteProducts"}')">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
        `;
    }

    html += `
        <div class="flex flex-col justify-around items-center rounded-lg shadow-sm pt-2 md:flex-row pb-6">
            <button type="button"
                class="py-2 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-green-600 text-white hover:bg-green-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onclick="updateProducts('${0}', '${"modifyProducts"}')">
                Agregar producto
            </button>
        </div>`;

    document.getElementById('productEditor').innerHTML = html;

}

function updateProducts(id, modal){
    sessionStorage.setItem('uuid', id);
    document.getElementById(modal).showModal();
}

function updateUser(id){
    sessionStorage, id('uuid', id);
    document.getElementById('modifyUser').showModal();
}



function inicializarProducto() {
    if (sessionStorage.getItem('currProducto') === null) {
        const start = [];
        sessionStorage.setItem('currProducto', JSON.stringify(start));
    }
}

function inicializarUsuario() {
    if (sessionStorage.getItem('currUser') === null) {
        const start = [];
        sessionStorage.setItem('currUser', JSON.stringify(start));
    }
}

inicializarProducto()
inicializarUsuario();
  
// Función para leer el contenido del Usuario
function obtenerUsuario() {
    return JSON.parse(sessionStorage.getItem('currUser'));
}
  
// Función para borrar el carrito
function vaciarUsuario() {
    sessionStorage.removeItem('currUser');
}

document.getElementById('modifyP').addEventListener('click', () => {

    let producto = {
        "id": sessionStorage.getItem('uuid'),
        "name": document.querySelector("#ModifiedName").value,
        "description": document.querySelector("#ModifiedDesc").value,
        "image": document.querySelector("#ModifiedImg").value,
        "price": document.querySelector("#ModifiedPrice").value,
        "stock": document.querySelector("#ModifiedStock").value
    };

    if(sessionStorage.getItem('uuid') == 0)
        crudProductXHR(JSON.stringify(producto), 'POST');
    else
        crudProductXHR(JSON.stringify(producto), 'PUT');
});

document.getElementById('deleteP').addEventListener('click', () => {

    let producto = {
        "id": sessionStorage.getItem('uuid')
    }

    crudProductXHR(JSON.stringify(producto), 'DELETE')
});

document.getElementById('closeS').addEventListener('click',() => {
    window.location.replace("http://localhost:3000/home");
    vaciarUsuario();
});

document.getElementById('modifyU').addEventListener('click',() => {

    let user = obtenerUsuario();

    let userJ = {
        "id": user._id,
        "name": document.querySelector("#ModifiedUsername").value,
        "mail": document.querySelector("#ModifiedEmail").value,
        "phone": document.querySelector("#ModifiedPhoneNum").value,
        "image": user.image,
        "pass": document.querySelector("#ModifiedPass").value,
        "role": user.role,
        "xd": user
    };

    crudUserXHR(JSON.stringify(userJ), 'PUT');

});
