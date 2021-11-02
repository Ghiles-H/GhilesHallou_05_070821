const productAll = document.getElementById('product_all');
const url_api = 'http://localhost:3000/api/cameras/';


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
function createProduct(number, data){ // Fonction qui crée un bloc produit, "number" est la variable permettant de localiser le produit dans l'api     
    productAll.innerHTML += `
    <!-- Produit n°${number + 1} -->
    <div class="col-12 col-lg-6" class="Vcam">
        <div class="card mb-4 mb-lg-4 border-light shadow-sm">
            <a href="/frontend/html/produit_page.html?_id=${data[number]._id}">
                <img src="${data[number].imageUrl}" alt="Caméra vintage " class="card-img-top" id="Vcam_${number + 1}_img">
            </a>
            <div class="card-body">
                <div class="card-title">
                    <h5>
                        ${data[number].name}
                    </h5>
                </div>
                <div class="card-description">
                    <p class="text-truncate">
                        ${data[number].description}
                    </p>
                </div>
                <div class="card-foot">
                    <p class="price" id="Vcam_${number + 1}" >
                        ${convertPrice(data[number].price)}
                    </p>
                    <a href="/frontend/html/produit_page.html?_id=${data[number]._id}" class="btn btn-secondary">Voir produit</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Produit n°${number + 1} - END -->
        `;
}

function createProductAll(data){    //Fonction permettant de d'appeler un nombre de fois "data.length" la fonction "createProduct"
    var i = 0;
    console.log("data taille= ", data.length);
    while(i < data.length) {
        createProduct(i, data);
        i++;
    }
}
fetch(url_api)
    .catch((err) => alert("Désolé il y a eu une erreur, la voici: " + err))
    .then(res => res.json())
    .then(data => createProductAll(data))
