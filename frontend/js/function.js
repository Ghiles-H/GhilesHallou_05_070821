const nom = document.getElementById('name');
const prix = document.getElementById('price');
const description = document.getElementById('descript');
const img_link = document.getElementById('img');
const lenses = document.getElementById('lenses_select');
var urlApi = document.location.search;
const url_api_id = 'http://localhost:3000/api/cameras/' + urlApi.replace('?_id=','');
const url_api = 'http://localhost:3000/api/cameras/';

function toto(){
    const newWord = urlApi.replace('?_id=','');
    alert("l'url du produit est " + urlApi);
}
fetch(url_api_id)
    .then(res => res.json())
    .then(data => prix.innerHTML = "Cette caméra est au prix de " + data.price/100 + ",00€")

fetch(url_api_id)
    .then(res => res.json())
    .then(data => nom.innerHTML = data.name);
    
fetch(url_api_id)
    .then(res => res.json())
    .then(data => description.innerHTML = "Description de la caméra " + data.name + " : " + data.description);

fetch(url_api_id)
    .then(res => res.json())
    .then(data => img_link.src = data.imageUrl);
    
function lenses_option(){
    fetch(url_api_id)
        .then(res => res.json())
        .then(data => lenses.innerHTML += data.lenses.reduce((str, lense) => `${str}<option value="">${lense}</option>`, ""));    
}
lenses_option();
/* ---------------------- 2nd Partie JS-------------------------------------------- */

fetch(url_api_id)
    .then(res => res.json())
    .then(data => createProduct(data))
    .catch

function createProduct(data) {
    let part = document.getElementById('partTwo');
    let newTitle = document.createElement('h1');
    newTitle.className = "title";
    let newDescript = document.createElement('p');
    newDescript.className = "description";
    let newImg = document.createElement('img');
    newImg.className = "image";
    let newPrice = document.createElement('p');
    newPrice.className = "price";
    newTitle.textContent = data.name;
    newDescript.textContent = data.description;
    newImg.src = data.imageUrl;
    newImg.width = '500';
    newPrice.textContent = data.price/100 + ' €';
    part.appendChild(newTitle);
    part.appendChild(newDescript);
    part.appendChild(newImg);
    part.appendChild(newPrice);
};