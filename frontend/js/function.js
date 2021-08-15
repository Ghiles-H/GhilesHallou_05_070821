const nom = document.getElementById('name');
const prix = document.getElementById('price');
const description = document.getElementById('descript');
const img_link = document.getElementById('img');
var urlApi = document.location.search;
const idApi_url = urlApi.replace('?_id=','');
const url_api = 'http://localhost:3000/api/cameras/' + idApi_url;


function toto(){
    const newWorld = urlApi.replace('?_id=','');
    alert("l'url de la page est " + newWorld);
}
fetch(url_api)
    .then(res => res.json())
    .then(data => prix.innerHTML = "Cette caméra est au prix de " + data.price/100 + ",00€");
    

fetch(url_api)
    .then(res => res.json())
    .then(data => nom.innerHTML = data.name);

fetch(url_api)
    .then(res => res.json())
    .then(data => description.innerHTML = "Description de la caméra " + data.name + " : " + data.description);

fetch(url_api)
    .then(res => res.json())
    .then(data => img_link.src = data.imageUrl);

//console.log("nbCam = " + nbCam);