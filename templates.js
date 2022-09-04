function renderProductsHTML(element,i){
    return  /*html*/ `
    <tr>
            <td>${i}</td>
            <td>${element.title}</td>
            <td>${element.price} €</td>
            <td>${element.taxes} €</td>
            <td>${element.ads} €</td>
            <td>${element.discount}</td>
            <td>${element.total}</td>
            <td>${element.category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
          </tr>

    `;
}