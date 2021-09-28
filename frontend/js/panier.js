const productPanier = document.querySelector('#data_panier');
const totalPanier = document.querySelector('#total');
let hiddenBtn = document.querySelector('#ref_id_btn');
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
function displayProduct(){      //Fonction permettant de récupérer les données des articles ajoutés au localstorage et de les afficher sur la page du panier
    let items = localStorage.getItem('product');
    let totalVar = 0;
    items = JSON.parse(items);
    items = items.map((item) => item.n ? item : ({...item, n: 1}));
    let str = "";
    for(let i = 0; i < items.length; i++){
        str += `
            <tr>
                <td>${items[i].name}</td>
                <td><select name="quantity" id="select_${i}">
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" ${items[i].n === 3 ? "selected" : ""} >3</option>
                    </select>
                </td>
                <td>${convertPrice(items[i].price)}</td>
                <td>${convertPrice(items[i].price * items[i].n)}</td>
                <td><button name='${i}' onclick="document.getElementById('ref_id_btn').value=this.name; testConfirmDelete();"><i class="far fa-trash-alt"></i></button></td>
            </tr>`;   
        totalVar += items[i].price;
    }
    productPanier.innerHTML = str;
    totalPanier.innerHTML = convertPrice(totalVar);
}
const validInput = (abc) => {
    if(abc.value == ""){
        abc.style.borderColor = 'red';
        abc.style.borderWidth = '3px';
        return false;
    }else{
        abc.style.borderColor = 'black';
        abc.style.borderWidth = '1px';
        return true;
    }
}
const validEmail = (mail) => {
    let bool = false;
    if(validInput(mail)){
        if(mail.value.includes("@") && mail.value.includes(".")){
            bool = true;
        }else{
            mail.style.borderColor = 'red';
            mail.style.borderWidth = '3px';
        }
    }
    return bool;
}
const inputFetch = () => {
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let address = document.querySelector('#address');
    let city = document.querySelector('#city');
    let mail = document.querySelector('#mail');
    const validFirstName = validInput(firstName);
    const validLastName = validInput(lastName);
    const validAddress = validInput(address);
    const validCity = validInput(city);
    const validMail = validEmail(mail);
    if(validFirstName && validLastName && validAddress && validCity && validMail){
        const client_info = [firstName.value, lastName.value, address.value, city.value, mail.value];
        return client_info;
    }
    
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
function strRandom(o) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = ''+b;
    if (o) {
      if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  }
const generateOrderId = () =>{
    let orderId;
    let a = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 8,
        startsWithLowerCase: true
    });

    let b = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 4
    });

    let c = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 4
    });

    let d = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 4
    });

    let e = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 12
    });

    orderId = a + "-" + b + "-" + c + "-" + d + "-" + e;
    return orderId;
}
const displayFinal = () => {
    const client_info = inputFetch();
    const product = productIdFetch();
    const orderId = generateOrderId();
    const contact = {
        firstName: client_info[0],
        lastName: client_info[1],
        address: client_info[2],
        city: client_info[3],
        email: client_info[4]
    }
    const command = {
        contact: contact,
        product: product,
        orderId: orderId
    }
    console.log(command);
    return command;
}
const changeNumber = (n, _id) => {
    let items = JSON.parse(localStorage.getItem("product"));
    items = items.map((item) => item._id === _id ? ({...item, n}) : item);
    localStorage.setItem("product", JSON.stringify(items));
    displayProduct();
}
displayProduct();
changeNumber(3, "5be9c4c71c9d440000a730e9");
