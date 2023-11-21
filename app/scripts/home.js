sessionStorage.clear();

let inventory
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
            <button class="flex flex-col rounded-lg bg-slate-700 md:flex-row chistoso" uuid="${e._id}" onclick="focusProduct('${e._id}','${e.name}', '${e.description}', '${e.price}', '${e.stock}', '${e.image}')">
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
            </button>
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
                                onclick="focusProductsFunctions('${itemsToDisplay[0].id}', '${itemsToDisplay[0].name}', '${itemsToDisplay[0].description}', '${itemsToDisplay[0].price}', '${itemsToDisplay[0].stock}', '${itemsToDisplay[0].image}')">
                                Comprar
                            </button>
                        </div>
                </div>
        </div>
    `
}

function focusProduct(id, name, description, price, stock, image) {
    document.getElementById('focusedProduct').innerHTML = `
        <div class="rounded overflow-hidden bg-slate-600">
            <img class="w-full"
            src="${image}"
            alt="Sunset in the mountains">
            <div class="px-6 py-4 flex flex-col text-slate-300">
                <div class="font-bold text-xl mb-2">${name}</div>
                    <p class=" text-base">
                        ${description}
                    </p>
                    <p class=" text-base">
                        Precio: ${price}
                    </p>
                    <br>
                    <div class="flex justify-center items-center rounded-lg shadow-sm">
                    <button
                        class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onclick="focusProductsFunctions('${id}', '${name}', '${description}', '${price}', '${stock}', '${image}')">
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
        const carrito = [];
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
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

function setSessionData(id, name, description, price, stock, imageUrl) {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('description', description);
    sessionStorage.setItem('price', price);
    sessionStorage.setItem('stock', stock);
    sessionStorage.setItem('image', imageUrl);
}

document.getElementById('addToCart').addEventListener('click', () => {
    let carritoArr = obtenerCarrito(); // Obtener el carrito actual

    var quantityToAdd = document.querySelector("#addToCartInput").value;
    console.log("quantity: " + quantityToAdd);

    let id = sessionStorage.getItem('id');
    let name = sessionStorage.getItem('name');
    let description = sessionStorage.getItem('description');
    let price = sessionStorage.getItem('price');
    let stock = sessionStorage.getItem('stock');
    let image = sessionStorage.getItem('image');

    console.log("id: " + id);
    console.log("name: " + name);
    console.log("description: " + description);
    console.log("price: " + price);
    console.log("stock: " + stock);
    console.log("image: " + image);

    // Crear un nuevo objeto JSON para el producto actual
    let producto = {
        "id": id,
        "name": name,
        "description": description,
        "price": price,
        "stock": stock,
        "image": image,
        "quantity": quantityToAdd
    };

    // Agregar el nuevo producto al carrito
    carritoArr.push(producto);

    // Almacenar el carrito actualizado en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carritoArr));

});

function focusProductsFunctions(id, name, description, price, stock, image){
    setSessionData(id, name, description, price, stock, image);
    document.getElementById('buyProduct').showModal();
}

