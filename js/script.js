window.onload = function() {
  alert('teste');

  const url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';
  fetch(url, {
      method: 'get' // opcional 
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(err) {
      console.error(err);
    });

  return url;

};