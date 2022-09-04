let productsData;
// If array has a Data, will be not delete.
if (localStorage.product != null) {
  productsData = JSON.parse(localStorage.product);
} else {
  productsData = [];
}



let appMood = 'create';
let index;
/**
 * To calculate price, taxes, ads, discount
 */
function getTotal() {
  if (price.value) {
    let totalPrice = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `${totalPrice} €`;
    total.style.backgroundColor = '#040';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = '#B85252FF';
  }
}

function createProduct() {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (appMood === 'create') {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        productsData.push(newProduct);
      }
    } else {
      productsData.push(newProduct);
    }
  } else {
    productsData[index] = newProduct;
    appMood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = '';
  }

  //Save in localStorage
  localStorage.setItem('product', JSON.stringify(productsData));
  clearInputFields();
  renderProducts();
}

function clearInputFields() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
  total.style.backgroundColor = '#B85252FF';
}

function renderProducts() {
  let table = document.getElementById('tbody');
  table.innerHTML = '';
  for (let i = 0; i < productsData.length; i++) {
    const element = productsData[i];
    table.innerHTML += renderProductsHTML(element, i);
  }
  renderDeleteAll();
}

function deleteProduct(i, element) {
  productsData.splice(i, 1);
  localStorage.product = JSON.stringify(productsData); // update the array after delete
  renderProducts(element, i);
}

function renderDeleteAll() {
  let deleteAllContainer = document.getElementById('deleteAllContainer');
  if (productsData.length > 0) {
    deleteAllContainer.innerHTML = /*html*/ `
    <button onclick= "deleteAll()">Delete All (${productsData.length} Item/s)</button>
    `;
  } else {
    deleteAllContainer.innerHTML = '';
  }
}

function deleteAll() {
  localStorage.clear();
  productsData.splice(0);
  renderProducts();
}

function updateProduct(i) {
  title.value = productsData[i].title;
  price.value = productsData[i].price;
  taxes.value = productsData[i].taxes;
  ads.value = productsData[i].ads;
  discount.value = productsData[i].discount;
  getTotal();
  category.value = productsData[i].category;
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  appMood = 'update';
  index = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}

renderProducts();
