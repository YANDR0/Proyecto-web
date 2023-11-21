
var inventory = [];
var carrito = [];
var curr;
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/products');
xhr.send();

xhr.onload = function () {
    if (xhr.status === 200) {
        inventory = JSON.parse(xhr.responseText);
        productsToDisplay(inventory);
    }
};

function productsToDisplay(itemsToDisplay) {

    let html = "";
    for (const e of itemsToDisplay) {
        html += `
            <div class="flex flex-col rounded-lg bg-slate-700 md:flex-row chistoso" uuid="${e._id}" onclick="focusProduct('${e._id}')">
                <img class="w-1/4 h-auto flex-1 rounded-t-lg object-cover md:!rounded-none md:!rounded-l-lg"
                src="${e.image}">
                <div class="w-3/4 justify-start p-6 text-slate-300">
                    <h5 class="mb-2 text-xl font-medium text-neutral-50">
                        ${e.name}
                    </h5>
                    <p class="mb-4 text-base text-neutral-200">
                        Precio: ${e.price}
                    </p>
                </div>
            </div>
        `
    }
    document.getElementById("showProducts").innerHTML = html;
    document.getElementById('focusedProduct').innerHTML = `
        <div class="rounded overflow-hidden bg-slate-600">
            <img class="w-full"
                src="${itemsToDisplay[0].image}"
                alt="Sunset in the mountains">
                <div class="px-6 py-4 flex flex-col text-slate-300">
                    <div class="font-bold text-xl mb-2">${itemsToDisplay[0].name}</div>
                    <p class=" text-base">
                        ${itemsToDisplay[0].description}
                    </p>
                    <p class=" text-base">
                        Precio: ${itemsToDisplay[0].price}
                    </p>
                    <br>
                        <div class="flex justify-center items-center rounded-lg shadow-sm">
                            <button
                                class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onclick="focusProductsFunctions('${itemsToDisplay[0]._id}')">
                                Comprar
                            </button>
                        </div>
                </div>
        </div>
    `
}

function focusProduct(uuid) {
    let p = inventory.find((p) => p._id == uuid);
    document.getElementById('focusedProduct').innerHTML = `
        <div class="rounded overflow-hidden bg-slate-600">
            <img class="w-full"
            src="${p.image}"
            alt="Sunset in the mountains">
            <div class="px-6 py-4 flex flex-col text-slate-300">
                <div class="font-bold text-xl mb-2">${p.name}</div>
                    <p class=" text-base">
                        ${p.description}
                    </p>
                    <p class=" text-base">
                        Precio: ${p.price}
                    </p>
                    <br>
                    <div class="flex justify-center items-center rounded-lg shadow-sm">
                    <button
                        class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onclick="focusProductsFunctions('${p._id}')">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `

}

// Función para inicializar el carrito
function inicializarCarrito() {
    if (sessionStorage.getItem('carrito') === null) {
        const start = [];
        sessionStorage.setItem('carrito', JSON.stringify(start));
    }
}

inicializarCarrito();

function obtenerCarrito() {
    return JSON.parse(sessionStorage.getItem('carrito'));
}

// Función para borrar el carrito
function vaciarCarrito() {
    sessionStorage.removeItem('carrito');
}

function setSessionData(uuid) {
    curr = inventory.find((p) => p._id == uuid);
}

document.getElementById('addToCart').addEventListener('click', () => {
    let carritoArr = obtenerCarrito(); // Obtener el carrito actual

    var quantityToAdd = document.querySelector("#addToCartInput").value;
    if(quantityToAdd < 1){
        alert("No se pueden ingresar negativos o 0");
        return;
    }

    let index = carritoArr.findIndex((p) => p._id == curr._id);

    // Crear un nuevo objeto JSON para el producto actual
    curr["quantity"] = quantityToAdd;

    // Agregar el nuevo producto al carrito
    if(index == -1)
        carritoArr.push(curr);  
    else
        carritoArr[index] = curr;
        

    // Almacenar el carrito actualizado en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carritoArr));

});

function focusProductsFunctions(uuid){
    setSessionData(uuid);
    document.getElementById('buyProduct').showModal();
}

