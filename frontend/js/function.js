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
    
/* function lenses_option(){
    fetch(url_api_id)
        .then(res => res.json())
        .then(data => lenses.innerHTML += data.lenses.reduce((str, lense) => `${str}<option value="">${lense}</option>`, ""));    
}
lenses_option(); */
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
/* ---------------3rd Part------------------- */
function convertPrice(nbD) { //Fonction permettant de mettre un nombre sous le format "XXX,XX €"
    let nbC = nbD / 100;
    let nbF = nbC.toFixed(2);
    return nbF + " €" 
}
class camera {
    constructor(data){
        this.nom = data.name;
        this.prix = convertPrice(data.price);
        this.description = data.description;
        this.image = data.imageUrl;
    }
}
class test {
    constructor(x, y){
        this.abs = x;
        this.ord = y;
    }
}
var myCam;
let myCamera;
const getElementApi = async function () {
    let response = await fetch(url_api_id)
    let data = await response.json()
    myCam = data.name
}
function btnTest(){
    let btnHidden = document.getElementById('ref_id_bouton');
    console.log("coucou c'est LE MILLON YOSHAAAAA");
    console.log(btnHidden.value);
}

/* console.log(myCam);
getElementApi();
console.log(myCam);

// Full request
fetch(url_api_id)
  .then(response => response.json())
  .then(data => {
      myCamera = data;
      return myCamera;
});
  console.log(myCamera); */





function fctInFct(){
    function testTest(bait){
        let maj = bait;
        return maj
    }
    let nomu = 45;
    let tt = testTest(55) + nomu;
    console.log(tt);
}
// Function that returns response
/* myFunction().then(data => {
  	console.log(data);
}); */




/* function sendLocalStorage(){
    function productCreate(data){
        let cam = new Object;
        cam.nom= data.name;
        cam.prix= data.price;
        let myCam = JSON.stringify(cam)
        localStorage.setItem('product', myCam);
        console.log("la cam à été ajouter !!! ");
    }
    fetch(url_api_id)
        .then(res => res.json())
        .then(data => productCreate(data))
        .catch((err) => alert("Désolé il y a eu une erreur, la voici: " + err))
} */