const socket = io()
const productConteiner = document.getElementById('productConteiner')

socket.on('productsAct', productsAct=>{
    let liProduct= document.createElement('li')
    liProduct.innerHTML=`<h3>${productsAct.title}</h3>
                        <h3>${productsAct.description}</h3>
                        <h3>${productsAct.price}</h3>
                        <h3>${productsAct.stock}</h3>
                        <h3>${productsAct.category}</h3>`

    productConteiner.append(liProducto)
})

