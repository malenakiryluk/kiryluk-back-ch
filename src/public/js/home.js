const ProductManager = require("../../dao/ProductMongoManager");
const productConteiner = document.getElementById('productConteiner')

let products = await ProductManager.getProduct()
products.products= products.docs
delete products.docs
delete products.totalDocs

for (let i = 0; i < products.products.length; i++) {
    let liProduct= document.createElement('li')
        liProduct.className=`li`
        liProduct.innerHTML=`<h3> titulo: ${products.products[i].title}</h3>
                        <h3> descripcion: ${products.products[i].description}</h3>
                        <h3> precio: ${products.products[i].price}</h3>
                        <h3> stock: ${products.products[i].stock}</h3>
                        <h3> categoria: ${products.products[i].category}</h3>`

    productConteiner.append(liProduct)

}
