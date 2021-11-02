/* Variables */
var urlApi = document.location.search;
console.log(urlApi);
const url_api_id = 'http://localhost:3000/api/cameras/' + urlApi.replace('?_id=','');
/* Variables - END */

/* Fonctions */

function convertPrice(nbD) { //Fonction permettant de mettre un nombre sous le format "XXX,XX €"
    let nbC = nbD / 100;
    let nbF = nbC.toFixed(2);
    return nbF + " €" 
}
function contentPanier(){
    let i = 0;
    let items = localStorage.getItem('product');
    let panierContent = document.querySelector('#shop_link');
    items = JSON.parse(items);
    while(items && items[i]){
        i++;
    } 
    if(i!=0){
        panierContent.innerHTML = `Panier(${i})`
    }
}
contentPanier();
function testConfirmDialog()  {
    var result = confirm("Cette caméra a été ajouter au panier. Avez vous terminer vos achats ? (OK: Vous serez redirigé vers votre panier. Cancel: Vous serez redirigé vers la page d'accueil.)");

    if(result)  {
        document.location.href="../html/panier.html";
    } else {
        document.location.href="../../index.html";
    }
}



function createProductPage(data) {
    //Création des variables de la fct
    let productImg = document.querySelector('#product_img');
    let productInfo = document.querySelector('#product_info');
    let descripLenses = document.querySelector('#descrip_lenses');
    let productFooter = document.querySelector('#product_foot');
    let newName = document.createElement('h1');
    let newDescription = document.createElement('p');
    let newPrice = document.createElement('p');
    let newImage = document.createElement('img');
    const lenses = document.getElementById('lenses_select');
    
    
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
    lenses.innerHTML += data.lenses.reduce((str, lense) => `${str}<option value="">${lense}</option>`, "");

    //Intégration des éléments dans la page HTML
    productImg.prepend(newImage);
    descripLenses.prepend(newDescription);
    productInfo.prepend(newName);
    productFooter.prepend(newPrice);

};
// Fonction permettant d'enregitrer le produit dans le localStorage.
const addItem = (data) => {
    let items = localStorage.getItem("product");
    if (items) {
        items = JSON.parse(items)
        if (items.find((item) => item._id === data._id)) {
            throw new Error("Camera déjà enregistrée");
        }
        items.push(data);
        testConfirmDialog();
    } else {
        items = [data]
        testConfirmDialog();
    }
    localStorage.setItem('product', JSON.stringify(items));
}

// Fonction appelée au click du bouton "Ajouter au panier" qui appel l'api et ajoute les données de celle-ci à la fonction "addItem"
function sendLocalStorage(){
    fetch(url_api_id)
        .then(res => res.json())
        .then(data => addItem(data))
        .catch((err) => alert("Désolé il y a eu une erreur, la voici: " + err))
    
}

//Appel de l'api pour ajouter les données de celle-ci à la fonction "createProductPage"
fetch(url_api_id)
    .then(res => res.json())
    .then(data => createProductPage(data))
    .catch((err) => alert("Désolé il y a eu une erreur, la voici: " + err))

/* Fonction - END */


