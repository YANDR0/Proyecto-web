showProductsToCart()
function showProductsToCart() {
    const carrito = JSON.parse(sessionStorage.getItem('carrito'));
    console.log("carrito: " + carrito)

    let html = "";
    let summary2pt = "<h3 class='card-title'>Total de compra</h3><br>";
    let total = 0

    for (const e of carrito) {
        html += `
                    <div class="bg-slate-300 rounded p-4 shadow-md mb-4 flex justify-between items-center" >
                        <div class="flex items-center">
                            <img src="${e.image}"
                            alt="Producto" class="mr-4 w-14 h-14 rounded">
                            <div>
                                <h2 class="text-lg font-semibold">${e.name}</h2>
                                <p class="text-gray-900 w-2/3">
                                    ${e.description}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <p class="text-gray-600 mr-4">$${e.price}</p>
                            <button class="text-white bg-red-600 py-2 px-4 rounded-md">Eliminar</button>
                        </div>
                    </div>
                `

        summary2pt += ` <div class="flex justify-between mb-2">
                            <p class="text-gray-200">${e.name}<b> x ${e.quantity}</b></p>
                            <p class="text-lg font-semibold">$${e.price}</p>
                        </div>
                    `
        total += (e.price * e.quantity)
    }

    let summary = `
                        <div class=" bg-slate-700 rounded p-4 shadow-md">
                            <h2 class="text-xl font-semibold mb-4">Resumen de Compra</h2>
                    `

    let summary3pt = `
                                <br>
                                <div class="flex justify-between mb-2 text-xl">
                                    <p class="text-gray-200">Total:</p>
                                    <p class="text-lg font-semibold">$${total}</p>
                                </div>
                                <div class=" flex items-center justify-center">
                                    <button class="bg-green-500 text-black py-2 px-4 rounded-md">Realizar Compra</button>
                                </div>
                            </div>
                    `
    document.getElementById("mainCart").innerHTML = html;
    document.getElementById("summaryCard").innerHTML = (summary + summary2pt + summary3pt)
}

function deleteFromCart(id) {
    const carrito = JSON.parse(sessionStorage.getItem('carrito'));
    console.log("antes: " + carrito);
    console.log("id: " + id);

    const deleteIndex = carrito.findIndex(producto => producto.id === id);

    if (deleteIndex !== -1) {
        // Borramos el elemento del carrito usando splice
        carrito.splice(deleteIndex, 1);

        console.log("despues: " + carrito);

        // Guardamos el carrito actualizado en el sessionStorage
        sessionStorage.setItem("carrito", JSON.stringify(carrito));

        // Llamamos a la función que muestra el carrito de nuevo
        showProductsToCart();
    } else {
        console.log("Elemento no encontrado en el carrito");
    }
};