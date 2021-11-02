const displayInfoOrder = () => {    //Fonction permettant d'afficher le prix total et l'id de la commande ainsi que l'email du client. 
    const orderTotal = document.querySelector('.prix');
    const orderId = document.querySelector('.orderId_number');
    const orderMail = document.querySelector('.mailCharge');

    orderId.innerHTML = localStorage.getItem('idOrder');
    orderTotal.innerHTML = localStorage.getItem('totalOrder');
    orderMail.innerHTML = localStorage.getItem('mailOrder');
    localStorage.clear(); //La fonction vide aussi le localStorage pour une futur commande.
}

displayInfoOrder();