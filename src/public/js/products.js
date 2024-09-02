const socket = io()
const productConteiner = document.getElementById('productConteiner')
console.log(socket)
socket.on("productsAct", products=>{
    console.log("los productos modificados son:")
    let liProduct= document.createElement('li')
    liProduct.innerHTML=`<h3>${products.title}</h3>
                        <h3>${products.description}</h3>
                        <h3>${products.price}</h3>
                        <h3>${products.stock}</h3>
                        <h3>${products.category}</h3>`

    productConteiner.appendChild(liProduct)
})

