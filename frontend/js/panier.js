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
    console.log(items[hiddenBtn.value]);
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
    let items = JSON.parse(localStorage.getItem('product'));
    let totalVar = 0;
    items = items.map((item) => item.n ? item : ({...item, n: 1}));
    let str = "";
    for(let i = 0; i < items.length; i++){
        console.log(typeof items[i].n)
        str += `
            <tr>
                <td>${items[i].name}</td>
                <td><select name="quantity" id="select_${i}">
                        <option value="1" ${items[i].n === "1" ? "selected" : ""} >1</option>
                        <option value="2" ${items[i].n === "2" ? "selected" : ""} >2</option>
                        <option value="3" ${items[i].n === "3" ? "selected" : ""} >3</option>
                    </select>
                </td>
                <td>${convertPrice(items[i].price)}</td>
                <td>${convertPrice(items[i].price * Number(items[i].n))}</td>
                <td><button name='${i}' onclick="document.getElementById('ref_id_btn').value=this.name; testConfirmDelete();"><i class="far fa-trash-alt"></i></button></td>
            </tr>`;   
        totalVar += items[i].price * Number(items[i].n);
    }
    productPanier.innerHTML = str;

    totalPanier.innerHTML = convertPrice(totalVar);
}
const validInput = (abc) => {   //Fonction permettant de si un Input est vide ou non
    if(abc == ""){
        return false;
    }else{
        return true;
    }
}

const validEmailA = (mail) => {
    console.log("log validEmail= ",/\S+@\S+\. \S+/.test(mail));
    return /\S+@\S+\.\S+/.test(mail);
}
const validEmail = (mail) => {  //Fonction permettant de vérifier si l'input mail entré par le user contient un "@" et un "."
    if(validInput(mail)){
        if(mail.includes("@") && mail.includes(".")){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
const validChamps = (order) => {
    let champs = [order.contact.lastName, order.contact.firstName, order.contact.address, order.contact.city];
    let i = 0;
    let bool = true;
    while(i < 4 && bool == true){
        if(validInput(champs[i]) == true){
            console.log(i + " " + champs[i]);
            i++
        }else{
            bool = false;
        }
    }
    console.log("boolNoMail= ",bool);
    console.log("mailInput= ", order.contact.email);
    console.log("mail= ", validEmail(order.contact.email));
    if(bool == true && validEmail(order.contact.email) == false){
        bool = false;
    }
    console.log("boolFinal= ",bool);
    return bool;
}

const productIdFetch = () =>{
    let items = localStorage.getItem('product');
    items = JSON.parse(items);
    const productTab = [];
    let newProduct;
    for (let i = 0; i < items.length; i++){
        newProduct = productTab.push(items[i]._id);
    }
    return productTab;
}

const sendApi = () => {
    let order = {
        contact:{
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            email: document.querySelector('#mail').value
        },
        products: productIdFetch()
    };
    if(validChamps(order) == true){
        console.log("taille ", order.products.length);
        if(order.products.length != 0){
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
              };
              fetch("http://localhost:3000/api/cameras/order", options)
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
              })
              .catch((err) => {
                alert("Il y a eu une erreur : " + err);
              });
        }else{
            alert("Votre panier est vide")
        }
    }else{
        alert("Veuillez remplir tous les champs");
    };
}
const changeNumber = (n, _id) => {
    let items = JSON.parse(localStorage.getItem("product"));
    items = items.map((item) => item._id === _id ? ({...item, n}) : item);  // ...item => recup content obj item
    localStorage.setItem("product", JSON.stringify(items));
    displayProduct();
}
displayProduct();


const selectValueModif = () => {
    let items = JSON.parse(localStorage.getItem('product')); 
    let selects = document.getElementsByTagName("select");
    console.log("FirstLog SelectValue ", selects);
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener("change", (e) => {
            console.log(e.target.value)
            console.log(items[i]._id)
            let number = e.target.value
            changeNumber(number, items[i]._id);
            selectValueModif();
        });
    }
}
selectValueModif();