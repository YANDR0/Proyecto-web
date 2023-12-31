
var inventory = [];
var carrito = [];
var usersList = [];
var curr;
var url;
let xhr = new XMLHttpRequest();

function getUsersXHR () {
    url = 'http://localhost:3000/users';
    xhr.open('GET', url);
    xhr.send();
}

function getProductsXHR(){
    url = 'http://localhost:3000/products';
    xhr.open('GET', url);
    xhr.send();
}

getUsersXHR();

xhr.onload = function () {
    if (xhr.status === 200){
        if(url == 'http://localhost:3000/users'){
            usersList = JSON.parse(xhr.responseText);
            getProductsXHR();
        }
        if(url == 'http://localhost:3000/products'){
            inventory = JSON.parse(xhr.responseText);
            productsToDisplay(inventory);
        }
    }
};

function productsToDisplay(itemsToDisplay) {
    carrito = obtenerCarrito();

    if(sessionStorage.getItem('currUser')){
        document.getElementById("dibujito").firstElementChild.innerHTML = "Perfil de usuario";
        document.getElementById("dibujito").firstElementChild.nextElementSibling.firstElementChild.src = "https://raw.githubusercontent.com/YANDR0/Proyecto-web/main/assets/sidebar/user.png";
    }

    let html = "";
    for (const e of itemsToDisplay) {
        html += `
            <div class="flex flex-col rounded-lg bg-slate-700 md:flex-row chistoso cursor-pointer" uuid="${e._id}" onclick="focusProduct('${e._id}')" id="${e._id}">
                <img class="w-1/4 h-auto flex-1 rounded-t-lg object-cover md:!rounded-none md:!rounded-l-lg"
                src="${e.image}">
                <div class="w-3/4 justify-start p-6 text-slate-300">
                    <h5 class="mb-2 text-xl font-medium text-neutral-50">
                        ${e.name}
                    </h5>
                    <p class="flex mb-4 text-base text-neutral-200 justify-between">
                        <p> Precio: ${e.price} </p>
                        <p> Stock: ${e.stock} </p>
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
                                class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                        class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onclick="focusProductsFunctions('${p._id}')">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `;

    let cosos = document.getElementsByClassName("border-white-400 border-4");
    for (let i of cosos) {
        i.classList.remove('border-white-400');
        i.classList.remove('border-4');
    }
    
    let a = document.getElementById(uuid);
    a.classList.add('border-white-400');
    a.classList.add('border-4');
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

    quantityToAdd = parseInt(quantityToAdd);

    let original = inventory.find((p) => p._id == curr._id);

    let s = parseInt(original.stock);
    if(s < quantityToAdd){
        alert("La cantidad excede al stock actual");
        return;
    }

    
    curr["quantity"] = quantityToAdd;
    let index = carritoArr.findIndex((p) => p._id == curr._id);
    if(index == -1)
        carritoArr.push(curr);  
    else
        carritoArr[index] = curr;
    sessionStorage.setItem('carrito', JSON.stringify(carritoArr));

});

function focusProductsFunctions(uuid){
    setSessionData(uuid);
    document.getElementById('buyProduct').showModal();
}

document.getElementById('loginbutton').addEventListener('click', () => {

    var email = document.querySelector("#loginMail").value;
    var pass = document.querySelector("#loginPass").value;

    let num = usersList.findIndex(e => e.mail == email && e.pass == pass);
    if(num < 0){
        alert("Correo o contraseña incorrectos")
        return;
    } 
    
    loginData = {
        mail: email,
        pass: pass
    }

    console.log(loginData);
    sessionStorage.setItem('currUser', JSON.stringify(usersList[num]));
    
    if(sessionStorage.getItem('currUser')){
        document.getElementById("dibujito").firstElementChild.innerHTML = "Perfil de usuario";
        document.getElementById("dibujito").firstElementChild.nextElementSibling.firstElementChild.src = "https://raw.githubusercontent.com/YANDR0/Proyecto-web/main/assets/sidebar/user.png";
    }
    
});

function verifyAccount(xd){

    let user = sessionStorage.getItem('currUser');
    if(user){
        if(xd == 1)
            window.location.replace("http://localhost:3000/user_profile");
        if(xd == 2)
            window.location.replace("http://localhost:3000/shopping_cart");
    }else{
        document.getElementById('logInModal').showModal();
    }

}

document.registrationForm.ageInputId.oninput = function(){
    document.registrationForm.ageOutputId.value = document.registrationForm.ageInputId.value;
 }
