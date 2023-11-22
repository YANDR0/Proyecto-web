
let xhr = new XMLHttpRequest();
var usersList = [];
var inventory = [];

let url = 'http://localhost:3000/users'
xhr.open('GET', url);
xhr.send();

function aver(){
    url = 'http://localhost:3000/products'
    xhr.open('GET', url);
    xhr.send();
}

xhr.onload = function () {
    if (xhr.status === 200){
        if(url == 'http://localhost:3000/users'){
            usersList = JSON.parse(xhr.responseText);
            aver();
        }
        if(url == 'http://localhost:3000/products'){
            inventory = JSON.parse(xhr.responseText);
            showInterface();
        }
    }
};


function showInterface (){
    sessionStorage.setItem('user',JSON.stringify(usersList[2]));
    let user = JSON.parse(sessionStorage.getItem('user'));
    
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
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-0">
                    Actualizar datos
                </button>
                <p class="p-2"></p>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded bottom-0">
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
                                onclick="document.getElementById('modifyProducts').showModal()">
                                Actualizar
                            </button>
                            <button type="button"
                                class="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onclick="document.getElementById('modifyProducts').showModal()">
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
                onclick="document.getElementById('modifyProducts').showModal()">
                Agregar producto
            </button>
        </div>`;

    document.getElementById('productEditor').innerHTML = html;

}



function inicializarCarrito() {
    if (sessionStorage.getItem('currUser') === null) {
        const start = [];
        sessionStorage.setItem('currUser', JSON.stringify(start));
    }
}

inicializarCarrito();

