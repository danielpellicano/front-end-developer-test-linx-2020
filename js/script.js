/* Validate Form */
function validateForm() {
  event.preventDefault();
  /* name validate */
  let nameval = document.getElementById('name').value;
  if (nameval == '') {
    let error = document.createElement('span');
    let name = document.getElementById('name');
    let errorname = document.createTextNode('Por favor preencha seu nome');
    error.appendChild(errorname);
    name.classList.add('error');
    name.after(error);
    document.addEventListener('keydown', function(event) {
      error.remove();
      name.classList.remove('error');
    });
  }
  /* CPF Validate */
  let cpf = document.getElementById('cpf').value;
  if (cpf == '') {
    let cpfInput = document.getElementById('cpf');
    let errorCpf = document.createElement('span');
    let errorCpfText = document.createTextNode('Por favor preencha seu CPF');
    errorCpf.appendChild(errorCpfText);
    cpfInput.classList.add('error');
    cpfInput.after(errorCpf);
  } else {
    document.addEventListener('keydown', function(event) {
      errorCpf.remove();
      cpf.classList.remove('error');
    });
  }


  /* email validate */
  let email = document.getElementById('email').value;
  let errorElement = document.createElement('span');
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  } else {
    let emailInput = document.getElementById('email');
    let erroremail = document.createTextNode('Por favor preencha seu email corretamente');
    errorElement.appendChild(erroremail);
    emailInput.classList.add('error');
    emailInput.after(errorElement);
    document.addEventListener('keydown', function(event) {
      errorElement.remove();
      email.classList.remove('error');
    });
    return (false);
  }
}

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

/* Validate Form Newsletter */

function validateFormNews() {
  event.preventDefault();
  /* name validate */
  let namevalnews = document.getElementById('name-news').value;
  let error = document.createElement('span');
  if (namevalnews == '') {
    let name = document.getElementById('name-news');
    let errorname = document.createTextNode('Por favor preencha seu nome');
    error.appendChild(errorname);
    name.classList.add('error');
    name.after(error);
    document.addEventListener('keydown', function(event) {
      error.remove();
      name.classList.remove('error');
    });
  }

  /* email validate */
  let email = document.getElementById('email-news').value;
  let errorElement = document.createElement('span');
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  } else {
    let emailInput = document.getElementById('email-news');
    let erroremail = document.createTextNode('Por favor preencha seu email corretamente');
    errorElement.appendChild(erroremail);
    emailInput.classList.add('error');
    emailInput.after(errorElement);
    document.addEventListener('keydown', function(event) {
      errorElement.remove();
      emailInput.classList.remove('error');
    });
    return (false);

  }

}


/* Api Function */
window.onload = function() {
  const url =
    'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var loader = document.getElementById('loader');
      loader.style.display = 'none';
      appendData(data);
    })
    .catch(function(err) {
      console.log('error: ' + err);
    });

  function appendData(data) {
    var produtos = data.products;
    var listProductsRow = document.getElementById('list-products');
    /* Products Loop */
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
      parcel.innerHTML =
        'ou' +
        produtos[i].installments.count +
        'x de R$' +
        produtos[i].installments.value +
        ',00';
      boxPrice.appendChild(parcel);
      /* Buy Button */
      var button = document.createElement('div');
      button.classList.add('btn-comprar');
      var link = document.createElement('a');
      link.setAttribute('href', '#');
      link.innerHTML = 'Comprar';
      button.appendChild(link);
      /* Load More Button */
      var divLoadMore = document.createElement('div');
      divLoadMore.classList.add('load-more');
      var buttonLoadMore = document.createElement('button');
      buttonLoadMore.setAttribute('id', 'load-more-products');
      buttonLoadMore.innerHTML = 'Ainda mais produtos aqui!';
      divLoadMore.appendChild(buttonLoadMore);
      /* Insert Itens */
      imageProduct.appendChild(image);
      product.appendChild(imageProduct);
      product.appendChild(title);
      product.appendChild(description);
      product.appendChild(boxPrice);
      product.appendChild(button);
      listProductsRow.appendChild(product);
    }
    /* End Products Loop */
    listProductsRow.after(divLoadMore);

    /* Fetch Load More Products */
    function pagination() {
      var pagination = 'https://' + data.nextPage;
      fetch(pagination)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          divLoadMore.remove();
          appendData(data);
        })
        .catch(function(err) {
          console.log('error: ' + err);
        });
    }

    var loadMoreProducts = document.getElementById('load-more-products');
    loadMoreProducts.addEventListener('click', pagination);
  }
};