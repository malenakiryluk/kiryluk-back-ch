const listConteinerCart = document.getElementById('listConteinerCart')
const CartManager = require('../../dao/CartMongoManager')

let cart = await CartManager.getCart()
console.log(cart.products[0]);
for (let i = 0; i < cart.products.length; i++) {
    let liProduct= document.createElement('li')
        liProduct.className=`li`
        liProduct.innerHTML=`<h3>${cart.products[i].title}</h3>
                        <h3>${cart.products[i].description}</h3>
                        <h3>${cart.products[i].price}</h3>
                        <h3>${cart.products[i].stock}</h3>
                        <h3>${cart.products[i].category}</h3>`

        listConteinerCart.append(liProduct)

}
