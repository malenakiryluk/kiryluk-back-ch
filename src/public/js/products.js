const socket = io()
const productConteiner = document.getElementById('productConteiner')

socket.on('productosActualizados', products=>{
    products.forEach(product => {
        let liProduct= document.createElement('li')
        liProduct.innerHTML=`<h3>${product.title}</h3>
                        <h3>${product.description}</h3>
                        <h3>${product.price}</h3>
                        <h3>${product.stock}</h3>
                        <h3>${product.category}</h3>`

    productConteiner.appendChild(liProduct)
   })
    
})

