const productPanier = document.querySelector('#data_panier');
const totalPanier = document.querySelector('#total');
let hiddenBtn = document.querySelector('#ref_id_btn');
const url_api = 'http://localhost:3000/api/cameras/order';
let nbn = 1;

function convertPrice(nbD) { //Fonction permettant de mettre un nombre sous le format "XXX,XX €"
    let nbC = nbD / 100;
    let nbF = nbC.toFixed(2);
    return nbF + " €" 
}
function contentPanier(){   //Fonction permettant d'afficher le nombre d'article au panier sur la barre de navigation
    let b = 0;
    let items = localStorage.getItem('product');
    let panierContent = document.querySelector('#shop_link');
    items = JSON.parse(items);
    while(items && items[b]){
        b++;
    } 
    if(b!=0){
        panierContent.innerHTML = `Panier(${b})`
    }
}
contentPanier();
const deleteItem = () => {      //Fonction permettant de supprimer des élémants du localstorage et de recharger la page
    let items = localStorage.getItem("product");
    items = JSON.parse(items);
    items.splice(hiddenBtn.value, 1);
    localStorage.setItem('product', JSON.stringify(items));
}
function testConfirmDelete()  {
    var result = confirm("Etes-vous sûr de vouloir supprimer cette camera de votre panier ?");
    if(result)  {
        deleteItem()
    }
    history.go(0);
}
//createNode
//Créer un noeud, le supprimer, le modifier, l'insérer dans le dom
//.append

function displayProduct(){      //Fonction permettant de récupérer les données des articles ajoutés au localstorage et de les afficher sur la page du panier
    let items = [];
    if(localStorage.getItem('product') != null){
        items = JSON.parse(localStorage.getItem('product'));
    }
    let totalVar = 0;
    items = items.map((item) => item.n ? item : ({...item, n: 1}));
    let str = "";
    for(let i = 0; i < items.length; i++){
        str += `
            <tr>
                <td>${items[i].name}</td>
                <td><select name="quantity" id="select_${i}">
                        <option value="1" ${items[i].n === "1" ? "selected" : ""} >1</option>
                        <option value="2" ${items[i].n === "2" ? "selected" : ""} >2</option>
                        <option value="3" ${items[i].n === "3" ? "selected" : ""} >3</option>
                        <option value="4" ${items[i].n === "4" ? "selected" : ""} >4</option>
                        <option value="5" ${items[i].n === "5" ? "selected" : ""} >5</option>
                    </select>
                </td>
                <td>${convertPrice(items[i].price)}</td>
                <td>${convertPrice(items[i].price * Number(items[i].n))}</td>
                <td><button name='${i}' onclick="document.getElementById('ref_id_btn').value=this.name; testConfirmDelete();"><i class="far fa-trash-alt"></i></button></td>
            </tr>`;   
        totalVar += items[i].price * Number(items[i].n);
    }
    productPanier.innerHTML = str;
    localStorage.setItem('totalOrder', convertPrice(totalVar));
    totalPanier.innerHTML = convertPrice(totalVar);
}
const validInput = (abc) => {   //Fonction permettant de si un Input est vide ou non
    if(abc.value == ""){
        abc.style.borderColor = "red";
        abc.style.borderWidth = "2px"
        return false;
    }else{
        abc.style.borderColor = "black";
        abc.style.borderWidth = "1px"
        return true;
    }
}

const validEmail = (mail) => {  //Fonction permettant de vérifier si l'input mail entré par le user possède une syntax valide
    return /\S+@\S+\.\S+/.test(mail);
}
const validPhone = (num) => {
    if(num.indexOf('+33') != -1){
        num = num.replace('+33', '0');
    }
    var re = /^0[1-7]\d{8}$/;
    return re.test(num);
}
const validZipCode = (num) => {
    var re = /\d{5}$/;
    return re.test(num);
}
const validChamps = (order) => {
    let champs = [order.contact.lastName, order.contact.firstName, order.contact.address, order.contact.city];
    let phone = document.querySelector('#phone');
    let zipCode = document.querySelector('#zipCode');
    let i = 0;
    let bool = true;
    while(i < 4){
        if(validInput(champs[i]) == true){
            console.log(i + " " + champs[i]);
            i++
        }else{
            i++;
            bool = false;
        }
    }
    if(validPhone(phone.value) == true){
        phone.style.borderColor = "black";
        phone.style.borderWidth = "1px";
    }else{
        bool = false;
        phone.style.borderColor = "red";
        phone.style.borderWidth = "2px";
    }
    if(validZipCode(zipCode.value) == true){
        zipCode.style.borderColor = "black";
        zipCode.style.borderWidth = "1px";
    }else{
        bool = false;
        zipCode.style.borderColor = "red";
        zipCode.style.borderWidth = "2px";
    }
    if(validEmail(order.contact.email.value) == false){
        bool = false;
        order.contact.email.style.borderColor = "red";
        order.contact.email.style.borderWidth = "2px";

    }else{
        order.contact.email.style.borderColor = "black";
        order.contact.email.style.borderWidth = "1px";
    }
    return bool;
}

const productIdFetch = () =>{
    let items = [];
    if(localStorage.getItem('product') != null){
        items = JSON.parse(localStorage.getItem('product'));
    }
    const productTab = [];
    let newProduct;
    for (let i = 0; i < items.length; i++){
        newProduct = productTab.push(items[i]._id);
    }
    return productTab;
}
let inputError = document.querySelector('#error_input');

const sendApi = () => {     //Fonction permettant d'envoyer les informations de commande au serveur.
    let orderTest = {    //Création d'un objet "orderTest" avec les informations rempli par le client pour les valider.
        contact:{
            firstName: document.querySelector('#firstName'),
            lastName: document.querySelector('#lastName'),
            address: document.querySelector('#address'),
            city: document.querySelector('#city'),
            email: document.querySelector('#mail')
        },
    };
    let order = {    //Création d'un objet "order" avec les informations rempli par le client ainsi que les id des produits de son panier.
        contact:{
            firstName: orderTest.contact.firstName.value,
            lastName: orderTest.contact.lastName.value,
            address: orderTest.contact.address.value,
            city: orderTest.contact.city.value,
            email: orderTest.contact.email.value
        },
        products: productIdFetch()
    };
    
    let totalOrder = localStorage.getItem('totalOrder');
    if(order.products.length != 0){ //Vérification du panier, si il est vide => alert pour en informer le client
        
        if(validChamps(orderTest) == true){ //Vérification des information remplie par le client, si une erreur est présente => apparition d'un message pour en informer le client
            inputError.style.display = 'none';
            const options = {   //Création d'un objet avec les options de l'api
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
              };
              fetch("http://localhost:3000/api/cameras/order", options) // Appel de l'api avec les options précédament créer.
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem('idOrder', data.orderId)
                localStorage.setItem('mailOrder', order.contact.email)
                document.location.href = "confirm_page.html"
              })
              .catch((err) => {
                alert("Il y a eu une erreur : " + err);
              });
        }else{
            inputError.style.display = 'block';
        }
    }else{
        alert("Votre panier est vide");
    };
}
const changeNumber = (n, _id) => {      // Fonction permettant de créer une valeur de quantité et l'id d'un produit contenu dans le localstorage
    let items = JSON.parse(localStorage.getItem("product"));
    items = items.map((item) => item._id === _id ? ({...item, n}) : item);  // ...item => recup content obj item
    localStorage.setItem("product", JSON.stringify(items));
    displayProduct();
}
displayProduct();


const selectValueModif = () => {        // Fonction permettant de récupérer la valeur de l'option "select" et de l'appliquer à la fonction "changeNumber" à chaque event "change" d'un "select"
    let items = JSON.parse(localStorage.getItem('product')); 
    let selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener("change", (e) => {
            let number = e.target.value
            changeNumber(number, items[i]._id);
            selectValueModif();
        });
    }
}
selectValueModif();