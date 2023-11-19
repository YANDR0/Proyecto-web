
//TODO ESTO ES CODIGO DE RELLENO, NO TIENE USO

/*
let xhr = new XMLHttpRequest;
let inventory;
var iden = 0;

xhr.open('GET', 'http://localhost:3000/products');
xhr.send();


xhr.onload = function(){
    if(xhr.status != 401){
        inventory = JSON.parse(xhr.responseText);
        showProducts(inventory);
        startStorage();
    }
};

var page = 0;

function showProducts(inventory){
    let index = page * 4;
    let html = "";
    for (let i = index; i < index + 4 && inventory.length; i++) 
        html += `
            <div class="col-lg-3 col-md-6 col-6 d-flex">
                <div class="card">
                    <img class="card-img-top" style="height: 200px;" src="${inventory[i].imageUrl}" alt="Title" >
                    <div class="card-body">
                        <h4 class="card-title">${inventory[i].title}</h4>
                        <p class="card-text">${inventory[i].description}</p>
                        <p class="card-text"><b>Precio: </b> ${inventory[i].pricePerUnit}</p>
                    </div>
                    <div class=" card-footer text-center">
                            <button id = "${inventory[i].uuid}" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal_3" onclick="saveProduct('${inventory[i].uuid}')">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `; 
    document.getElementById("productList").innerHTML = html;
}

const pp = document.getElementById("pagprev");
const p1 = document.getElementById("pag1");
const p2 = document.getElementById("pag2");
const p3 = document.getElementById("pag3");
const pn = document.getElementById("pagnext");
var curr = p1;

function changePag(p) {
    curr.setAttribute("class", "page-item");
    if(p == pp) page = page>0? page-1: 0;
    if(p == p1) page = 0;
    if(p == p2) page = 1;
    if(p == p3) page = 2;
    if(p == pn) page = page<2? page+1: 2;

    showProducts(inventory);
    curr = page == 0? p1: page == 1? p2: p3;
    curr.setAttribute("class", "page-item active");
};

pp.addEventListener("click", () => {a = pp; changePag(a)});
p1.addEventListener("click", () => {a = p1; changePag(a)});
p2.addEventListener("click", () => {a = p2; changePag(a)});
p3.addEventListener("click", () => {a = p3; changePag(a)});
pn.addEventListener("click", () => {a = pn; changePag(a)});


function startStorage(){
    if(sessionStorage.getItem("car") === null){
        const car = [];
        sessionStorage.setItem("car",JSON.stringify(car));
    }
}

function clearStorage(){
    sessionStorage.removeItem("car");
    startStorage();
}

function saveProduct(id){
    iden = id;
}

let num = document.getElementById("amountProduct");
document.getElementById("addToCart").addEventListener("click", () => {
    let cart = JSON.parse(sessionStorage.getItem("car"));
    let quantity = num.value;
    if(quantity <= 0){
        num.value = 1;
        alert("No se aceptan negativos o 0");
        return;
    }
    let order = {uuid: iden, q: quantity};

    let index = cart.findIndex(e => e.uuid == iden);
    if(index > -1)
        cart[index] = order;
    else cart.push(order);
    sessionStorage.setItem("car",JSON.stringify(cart));
    num.value = 1;
});

document.getElementById("cancelCart").addEventListener("click", () => {
    num.value = 1;
});
*/










