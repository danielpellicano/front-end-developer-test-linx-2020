/* Validate Form */
function validateForm() {
  event.preventDefault();
  /* name validate */
  let nameval = document.getElementById('name').value;
  let error = document.createElement('span');
  if (nameval == '') {
    let name = document.getElementById('name');
    let errorname = document.createTextNode('Por favor preencha seu nome');
    error.appendChild(errorname);
    name.classList.add('error');
    name.after(error);
    document.addEventListener('keydown', function(event) {
      error.remove();
      name.classList.remove('error');
    });
  } else {}
  /* email validate */
  let email = document.getElementById('email').value;

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert('You have entered an invalid email address!');
    return false;
  }
}

/* cpf validate */
document.addEventListener('keydown', function(event) {
  //pega o evento de precionar uma tecla
  if (event.keyCode != 46 && event.keyCode != 8) {
    //verifica se a tecla precionada nao e um backspace e delete
    var i = document.getElementById('cpf').value.length; //aqui pega o tamanho do input
    if (i === 3 || i === 7)
    //aqui faz a divisoes colocando um ponto no terceiro e setimo indice
      document.getElementById('cpf').value =
      document.getElementById('cpf').value + '.';
    else if (i === 11)
    //aqui faz a divisao colocando o tracinho no decimo primeiro indice
      document.getElementById('cpf').value =
      document.getElementById('cpf').value + '-';
  }
});

/* Api Function */
window.onload = function() {
  const url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.products);
      appendData(data);
    })
    .catch(function(err) {
      console.log('error: ' + err);
    });

  function appendData(data) {
    var produtos = data.products;
    var listProductsRow = document.getElementById('list-products');
    for (var i = 0; i < produtos.length; i++) {
      /* box product */
      var product = document.createElement('div');
      product.classList.add('product');
      /* title */
      var title = document.createElement('h4');
      title.innerHTML = produtos[i].name;
      /* image */
      var imageProduct = document.createElement('div');
      imageProduct.classList.add('img-product');
      var image = document.createElement('img');
      image.src = 'http:' + produtos[i].image;
      /* description */
      var description = document.createElement('p');
      description.innerHTML = produtos[i].description;
      /* box price */
      var boxPrice = document.createElement('div');
      boxPrice.classList.add('preco');
      /* oldprice */
      var oldprice = document.createElement('p');
      oldprice.innerHTML = 'De: R$ ' + produtos[i].oldPrice + ',00';
      boxPrice.appendChild(oldprice);
      /* price */
      var price = document.createElement('strong');
      price.innerHTML = 'Por: R$ ' + produtos[i].price + ',00';
      boxPrice.appendChild(price);
      /* parcel */
      var parcel = document.createElement('span');
      parcel.innerHTML = 'ou' + produtos[i].installments.count + 'x de R$' + produtos[i].installments.value + ',00';
      boxPrice.appendChild(parcel);

      /* Insert Itens */
      imageProduct.appendChild(image);
      product.appendChild(imageProduct);
      product.appendChild(title);
      product.appendChild(description);
      product.appendChild(boxPrice);
      listProductsRow.appendChild(product);
    }
  }
};