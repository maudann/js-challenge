const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const options = {
  offset: 5,
  limit: 10
};

localStorage.clear();

const getData = api => {

  console.log(localStorage.getItem('pagination'));
  localStorage.setItem('pagination',localStorage.getItem('pagination') ? Number(localStorage.getItem('pagination'))+10 : options.offset );
  console.log(localStorage.getItem('pagination'));

  fetch(api+ `/?limit=${options.limit}&offset=${localStorage.getItem('pagination')}`)
    .then(response => response.json())
    .then(response => {
      //Paginacion Post-peticion API fetch
      //let products = response.splice(localStorage.getItem('pagination'),limit);
      
      let products = response;
      console.log(products);
      let output = products.map(product => {
        // template
        return htmlArticleCard(
          product.images[0] ? product.images[0] :  product.category.image,
          product.title,
          product.price
        );
      });
      console.log(output[0]);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const htmlArticleCard = (image, title, price) => {
  return `<article class="Card">
    <img src="${image}"/>
    <h2>
    ${title}
    <small>$ ${price}</small>
    </h2>
  </article>`;
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (entries[0].isIntersecting) loadData();
  
  //Valida igualmente Dejar de observar el elemento "observe".
  //if (entry.intersectionRatio > 0) loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
