/* Variables */
var urlApi = document.location.search;
const url_api_id = 'http://localhost:3000/api/cameras/' + urlApi.replace('?_id=','');
/* Variables - END */

/* Fonctions */

function convertPrice(nbD) { //Fonction permettant de mettre un nombre sous le format "XXX,XX €"
    let nbC = nbD / 100;
    let nbF = nbC.toFixed(2);
    return nbF + " €" 
}

function lenses_option(){
    const lenses = document.getElementById('lenses_select');
    fetch(url_api_id)
        .then(res => res.json())
        .then(data => lenses.innerHTML += data.lenses.reduce((str, lense) => `${str}<option value="">${lense}</option>`, ""));    
}

function createProductPage(data) {
    //Création des variables de la fct
    let productImg = document.querySelector('#product_img');
    let productInfo = document.querySelector('#product_info');
    let productFooter = document.querySelector('#product_foot');
    let newName = document.createElement('h1');
    let newDescription = document.createElement('p');
    let newPrice = document.createElement('p');
    let newImage = document.createElement('img');
    
    
    //Attribution des id aux variables
    newName.setAttribute("id", "nameProduct");
    newDescription.setAttribute("id", "descriptionProduct");
    newPrice.setAttribute("id", "priceProduct");
    newImage.setAttribute("id", "imageProduct");

    //Modification des éléments HTML lié aux variables
    newName.textContent = data.name;
    newDescription.textContent = data.description;
    newPrice.textContent = convertPrice(data.price);
    newImage.src = data.imageUrl;
    newImage.width = '500'

    //Intégration des éléments dans la page HTML
    productImg.prepend(newImage);
    productInfo.prepend(newDescription);
    productInfo.prepend(newName);
    productFooter.prepend(newPrice);

    //Appel de fct
    lenses_option();
};

//Appel de l'api
fetch(url_api_id)
    .then(res => res.json())
    .then(data => createProductPage(data))

/* Fonction - END */