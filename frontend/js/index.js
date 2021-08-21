const productAll = document.getElementById('product_all');
const url_api = 'http://localhost:3000/api/cameras/';
var urlApi = document.location.search;
const idApi_url = urlApi.replace('?_id=','');

function convertPrice(numD) { //Fonction permettant de mettre un nombre sous le format "XXX,XX €"
    let numC = numD / 100;
    let numF = numC.toFixed(2);
    return numF + " €" 
}

function createProduct(number){ // Fonction qui crée un bloc produit, "number" est la variable permettant de localiser le produit dans l'api     
    fetch(url_api)
    .then(res => res.json())
    .then(data => productAll.innerHTML += `
    <!-- Produit n°${number + 1} -->
    <div class="col-12 col-lg-6" class="Vcam">
        <div class="card mb-4 mb-lg-4 border-light shadow-sm">
            <a href="/frontend/html/produit_page.html">
                <img src="${data[number].imageUrl}" alt="Caméra vintage " class="card-img-top" id="Vcam_">
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
                    <p class="price" id="Vcam_" >
                        ${convertPrice(data[number].price)}
                    </p>
                    <a href="test_page.html?_id=${data[number]._id}" class="btn btn-secondary" >Voir test</a>
                    <a href="/frontend/html/produit_page.html" class="btn btn-secondary">Voir produit</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Produit n°${number + 1} - END -->
        `);
}

function createProductAll(loop){    //Fonction permettant de d'appeler un nombre de fois "loop" la fonction "createProduct"
    var i = 0;
    while(i < loop) {
        createProduct(i);
        i++;
    }
}
createProductAll(5);