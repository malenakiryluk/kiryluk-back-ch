const socket = io()
const productConteiner = document.getElementById('productConteiner')

socket.on('productosActualizados', productsAct=>{
   productsAct.products= productsAct.docs
   delete productsAct.docs
   delete productsAct.totalDocs
 //  console.log(productsAct);
   for (let i = 0; i < productsAct.products.length; i++) {
        let liProduct= document.createElement('li')
            liProduct.className=`li`
            liProduct.innerHTML=`<h3> titulo: ${productsAct.products[i].title}</h3>
                            <h3>descripcion: ${productsAct.products[i].description}</h3>
                            <h3>precio: ${productsAct.products[i].price}</h3>
                            <h3>stock: ${productsAct.products[i].stock}</h3>
                            <h3>categoria: ${productsAct.products[i].category}</h3>
                           <button onclick="addToCart(${productsAct.products[i]._id})">agregar al carrito</button>`

            productConteiner.append(liProduct)
    
   } 
})

const addToCart= async(prodID)=>{
   console.log({prodID});
   let respuesta = await fetch(`/api/carts/66dfa0f34c7548ba9c91733a/product/${prodID}`,{
      method:"put"
   })
   //disclaimer: al no tener un sistema de login dejo hardcodeado el carrito para que 
   //siempre se agregue a ese. Sigo las indicaciones del profe.
   console.log(respuesta.status);
}



